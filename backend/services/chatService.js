import WebSocket from 'ws'
import { ChatRoom } from '../models/ChatRoom.js'

class ChatService {
  constructor() {
    this.clients = new Map() // userId -> WebSocket
    this.rooms = new Map() // roomId -> Set<WebSocket>
  }

  handleConnection(ws, req) {
    console.log('新的 WebSocket 連接已建立')

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString())
        await this.handleMessage(ws, data)
      } catch (error) {
        console.error('處理訊息錯誤:', error)
        ws.send(
          JSON.stringify({
            type: 'error',
            message: '處理訊息時發生錯誤',
          })
        )
      }
    })

    ws.on('close', () => {
      this.handleDisconnect(ws)
    })

    ws.on('error', (error) => {
      console.error('WebSocket 客戶端錯誤:', error)
    })
  }

  async handleMessage(ws, data) {
    console.log('收到訊息:', data)

    switch (data.type) {
      case 'register':
        await this.handleRegister(ws, data)
        break
      case 'message':
        await this.handleChatMessage(ws, data)
        break
      case 'joinRoom':
        await this.handleJoinRoom(ws, data)
        break
      case 'leaveRoom':
        await this.handleLeaveRoom(ws, data)
        break
      default:
        console.warn('未知的訊息類型:', data.type)
    }
  }

  async handleRegister(ws, data) {
    const { userID } = data

    // 儲存客戶端連接
    this.clients.set(userID, ws)
    ws.userID = userID

    try {
      // 獲取房間列表
      const rooms = await ChatRoom.getAll()

      // 發送註冊成功和房間列表
      ws.send(
        JSON.stringify({
          type: 'registered',
          success: true,
          rooms: rooms.map((room) => ({
            id: room.id,
            name: room.name,
            memberCount: room.memberCount,
          })),
        })
      )

      // 廣播用戶上線通知
      this.broadcast(
        {
          type: 'userConnected',
          userID,
        },
        [ws]
      )
    } catch (error) {
      console.error('處理註冊錯誤:', error)
      ws.send(
        JSON.stringify({
          type: 'error',
          message: '註冊處理失敗',
        })
      )
    }
  }

  async handleChatMessage(ws, data) {
    const { fromID, message, roomID, targetUserID } = data

    try {
      // 儲存訊息到資料庫
      await ChatRoom.saveMessage({
        roomId: roomID,
        senderId: fromID,
        message,
        isPrivate: !!targetUserID,
        recipientId: targetUserID,
      })

      const messageData = {
        type: 'message',
        fromID,
        message,
        timestamp: new Date().toISOString(),
        roomID,
      }

      if (targetUserID) {
        // 私人訊息
        const targetWs = this.clients.get(targetUserID)
        if (targetWs?.readyState === WebSocket.OPEN) {
          messageData.private = true
          targetWs.send(JSON.stringify(messageData))
          ws.send(JSON.stringify(messageData)) // 發送者也收到訊息
        }
      } else {
        // 群組訊息
        this.broadcastToRoom(roomID, messageData, ws)
      }
    } catch (error) {
      console.error('處理聊天訊息錯誤:', error)
      ws.send(
        JSON.stringify({
          type: 'error',
          message: '發送訊息失敗',
        })
      )
    }
  }

  async handleJoinRoom(ws, data) {
    const { roomID, fromID } = data

    try {
      await ChatRoom.addMember(roomID, fromID)

      if (!this.rooms.has(roomID)) {
        this.rooms.set(roomID, new Set())
      }
      this.rooms.get(roomID).add(ws)

      const members = await ChatRoom.getMembers(roomID)

      // 通知房間內所有成員
      this.broadcastToRoom(roomID, {
        type: 'memberJoined',
        roomID,
        userID: fromID,
        members: members.map((m) => m.user_id),
      })

      // 發送加入成功確認
      ws.send(
        JSON.stringify({
          type: 'roomJoined',
          roomID,
          success: true,
        })
      )
    } catch (error) {
      console.error('處理加入房間錯誤:', error)
      ws.send(
        JSON.stringify({
          type: 'error',
          message: '加入房間失敗',
        })
      )
    }
  }

  async handleLeaveRoom(ws, data) {
    const { roomID, userID } = data

    try {
      await ChatRoom.removeMember(roomID, userID)
      const roomClients = this.rooms.get(roomID)
      if (roomClients) {
        roomClients.delete(ws)
      }

      // 通知房間其他成員
      this.broadcastToRoom(
        roomID,
        {
          type: 'memberLeft',
          roomID,
          userID,
        },
        ws
      )

      ws.send(
        JSON.stringify({
          type: 'roomLeft',
          roomID,
          success: true,
        })
      )
    } catch (error) {
      console.error('處理離開房間錯誤:', error)
      ws.send(
        JSON.stringify({
          type: 'error',
          message: '離開房間失敗',
        })
      )
    }
  }

  handleDisconnect(ws) {
    if (ws.userID) {
      // 移除客戶端連接
      this.clients.delete(ws.userID)

      // 從所有房間中移除
      this.rooms.forEach((clients, roomID) => {
        if (clients.has(ws)) {
          clients.delete(ws)
          // 通知房間其他成員
          this.broadcastToRoom(roomID, {
            type: 'memberDisconnected',
            userID: ws.userID,
          })
        }
      })

      // 廣播用戶離線通知
      this.broadcast({
        type: 'userDisconnected',
        userID: ws.userID,
      })
    }
  }

  broadcast(message, excludeWs = []) {
    const messageStr = JSON.stringify(message)
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && !excludeWs.includes(client)) {
        client.send(messageStr)
      }
    })
  }

  broadcastToRoom(roomID, message, excludeWs = null) {
    const messageStr = JSON.stringify(message)
    const roomClients = this.rooms.get(roomID)
    if (roomClients) {
      roomClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== excludeWs) {
          client.send(messageStr)
        }
      })
    }
  }
}

export const chatService = new ChatService()

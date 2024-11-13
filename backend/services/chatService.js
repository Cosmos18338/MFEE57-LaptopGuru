import WebSocket from 'ws'
import { ChatRoom } from '../models/ChatRoom.js'

class ChatService {
  constructor() {
    this.clients = new Map()
    this.rooms = new Map()
  }

  // 處理新的WebSocket連接
  handleConnection(ws) {
    ws.on('message', (message) => this.handleMessage(ws, message))
    ws.on('close', () => this.handleDisconnect(ws))
  }

  // 處理接收到的訊息
  handleMessage(ws, message) {
    try {
      const data = JSON.parse(message)

      switch (data.type) {
        case 'register':
          this.registerClient(ws, data)
          break
        case 'message':
          this.broadcastMessage(data)
          break
        case 'joinRoom':
          this.handleJoinRoom(ws, data)
          break
        case 'leaveRoom':
          this.handleLeaveRoom(ws, data)
          break
      }
    } catch (error) {
      console.error('處理訊息時發生錯誤:', error)
    }
  }

  // 註冊客戶端
  registerClient(ws, data) {
    const { userID } = data
    this.clients.set(userID, ws)
    ws.userID = userID

    // 使用 ChatRoom 來獲取房間列表
    ChatRoom.getAll().then((rooms) => {
      const roomAry = rooms.map((room) => ({
        id: room.id,
        name: room.name,
      }))

      ws.send(
        JSON.stringify({
          type: 'registered',
          roomAry,
        })
      )
    })
  }

  // 廣播訊息
  async broadcastMessage(data) {
    const { fromID, message, roomID, targetUserID } = data

    if (roomID) {
      // 儲存訊息到資料庫
      await ChatRoom.saveMessage({
        roomId: roomID,
        senderId: fromID,
        message,
        isPrivate: !!targetUserID,
        recipientId: targetUserID,
      })

      // 發送訊息給目標使用者或房間成員
      if (targetUserID) {
        const targetClient = this.clients.get(targetUserID)
        if (targetClient && targetClient.readyState === WebSocket.OPEN) {
          targetClient.send(
            JSON.stringify({
              type: 'message',
              fromID,
              message,
              roomID,
              private: true,
            })
          )
        }
      } else {
        const members = await ChatRoom.getMembers(roomID)
        members.forEach((member) => {
          const client = this.clients.get(member.user_id)
          if (client && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: 'message',
                fromID,
                message,
                roomID,
              })
            )
          }
        })
      }
    }
  }

  // 處理加入房間
  async handleJoinRoom(ws, data) {
    const { roomID, fromID } = data
    await ChatRoom.addMember(roomID, fromID)

    const members = await ChatRoom.getMembers(roomID)
    members.forEach((member) => {
      const client = this.clients.get(member.user_id)
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: 'joinRoom',
            fromID,
            roomID,
            members: members.map((m) => m.user_id),
          })
        )
      }
    })
  }

  // 處理斷開連接
  handleDisconnect(ws) {
    if (ws.userID) {
      this.clients.delete(ws.userID)
      // 可以在這裡處理使用者離線的邏輯
    }
  }
}

export const chatService = new ChatService()

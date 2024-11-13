import { ChatRoom } from '../models/ChatRoom.js'
import { chatService } from '../services/chatService.js'

export const chatController = {
  // 取得所有聊天室
  getRooms: async (req, res) => {
    try {
      const rooms = await ChatRoom.getAll()
      res.json({ status: 'success', data: rooms })
    } catch (error) {
      console.error('取得聊天室列表錯誤:', error)
      res.status(500).json({
        status: 'error',
        message: '取得聊天室列表失敗',
      })
    }
  },

  // 建立聊天室
  createRoom: async (req, res) => {
    try {
      const { roomName } = req.body
      const creatorId = req.user.id // 假設經過身份驗證中間件

      const roomId = await ChatRoom.create({ roomName, creatorId })
      res.json({
        status: 'success',
        data: { roomId },
      })
    } catch (error) {
      console.error('建立聊天室錯誤:', error)
      res.status(500).json({
        status: 'error',
        message: '建立聊天室失敗',
      })
    }
  },

  // 加入聊天室
  joinRoom: async (req, res) => {
    try {
      const { roomId } = req.params
      const userId = req.user.id

      await chatService.joinRoom(roomId, userId)
      res.json({
        status: 'success',
        message: '成功加入聊天室',
      })
    } catch (error) {
      console.error('加入聊天室錯誤:', error)
      res.status(500).json({
        status: 'error',
        message: '加入聊天室失敗',
      })
    }
  },

  // 取得聊天室訊息
  getRoomMessages: async (req, res) => {
    try {
      const { roomId } = req.params
      const messages = await ChatRoom.getMessages(roomId)
      res.json({
        status: 'success',
        data: messages,
      })
    } catch (error) {
      console.error('取得聊天室訊息錯誤:', error)
      res.status(500).json({
        status: 'error',
        message: '取得聊天室訊息失敗',
      })
    }
  },
}

export default chatController

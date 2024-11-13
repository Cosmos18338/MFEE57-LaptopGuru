import pool from '../configs/db.js'

export const ChatRoom = {
  // 建立新聊天室
  create: async ({ roomName, creatorId }) => {
    try {
      const [result] = await pool.execute(
        'INSERT INTO chat_rooms (name, creator_id) VALUES (?, ?)',
        [roomName, creatorId]
      )
      return result.insertId
    } catch (error) {
      console.error('建立聊天室錯誤:', error)
      throw error
    }
  },

  // 取得所有聊天室
  getAll: async () => {
    try {
      const [rooms] = await pool.execute(
        'SELECT * FROM chat_rooms WHERE valid = 1'
      )
      return rooms
    } catch (error) {
      console.error('取得聊天室列表錯誤:', error)
      throw error
    }
  },

  // 取得特定聊天室
  getById: async (roomId) => {
    try {
      const [rooms] = await pool.execute(
        'SELECT * FROM chat_rooms WHERE id = ? AND valid = 1',
        [roomId]
      )
      return rooms[0]
    } catch (error) {
      console.error('取得聊天室資訊錯誤:', error)
      throw error
    }
  },

  // 加入聊天室成員
  addMember: async (roomId, userId) => {
    try {
      const [result] = await pool.execute(
        'INSERT INTO chat_room_members (room_id, user_id) VALUES (?, ?)',
        [roomId, userId]
      )
      return result.insertId
    } catch (error) {
      console.error('加入聊天室成員錯誤:', error)
      throw error
    }
  },

  // 取得聊天室成員
  getMembers: async (roomId) => {
    try {
      const [members] = await pool.execute(
        `SELECT u.user_id, u.name, u.image_path 
         FROM chat_room_members crm
         JOIN users u ON crm.user_id = u.user_id
         WHERE crm.room_id = ?`,
        [roomId]
      )
      return members
    } catch (error) {
      console.error('取得聊天室成員錯誤:', error)
      throw error
    }
  },

  // 儲存聊天訊息
  saveMessage: async ({
    roomId,
    senderId,
    message,
    isPrivate = false,
    recipientId = null,
  }) => {
    try {
      const [result] = await pool.execute(
        `INSERT INTO chat_messages 
         (room_id, sender_id, message, is_private, recipient_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [roomId, senderId, message, isPrivate, recipientId]
      )
      return result.insertId
    } catch (error) {
      console.error('儲存訊息錯誤:', error)
      throw error
    }
  },

  // 取得聊天訊息
  getMessages: async (roomId, limit = 50) => {
    try {
      const [messages] = await pool.execute(
        `SELECT 
          cm.*,
          u.name as sender_name,
          u.image_path as sender_image
         FROM chat_messages cm
         JOIN users u ON cm.sender_id = u.user_id
         WHERE cm.room_id = ?
         ORDER BY cm.created_at DESC
         LIMIT ?`,
        [roomId, limit]
      )
      return messages.reverse() // 返回時反轉，讓訊息按時間順序排列
    } catch (error) {
      console.error('取得聊天訊息錯誤:', error)
      throw error
    }
  },
}

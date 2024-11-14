// ChatRoom.js
import db from '../configs/mysql.js'

export const ChatRoom = {
  // 建立新聊天室
  create: async ({ roomName, creatorId }) => {
    try {
      const [result] = await db.execute(
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
      const [rooms] = await db.execute(`
       SELECT 
         cr.*,
         g.group_id,
         g.group_name,
         g.max_members,
         g.group_img,
         COUNT(DISTINCT crm.id) as member_count
       FROM chat_rooms cr
       LEFT JOIN \`group\` g ON cr.id = g.chat_room_id
       LEFT JOIN chat_room_members crm ON cr.id = crm.room_id
       WHERE cr.valid = 1
       GROUP BY cr.id
     `)

      return rooms.map((room) => ({
        id: room.id,
        name: room.group_name || room.name,
        groupId: room.group_id,
        memberCount: parseInt(room.member_count || 0),
        maxMembers: room.max_members,
        image: room.group_img,
        isGroup: !!room.group_id,
        creatorId: room.creator_id,
        createdAt: room.created_at,
      }))
    } catch (error) {
      console.error('取得聊天室列表錯誤:', error)
      throw error
    }
  },

  // 取得特定聊天室
  getById: async (roomId) => {
    try {
      const [rooms] = await db.execute(
        'SELECT * FROM chat_rooms WHERE id = ? AND valid = 1',
        [roomId]
      )
      return rooms[0]
    } catch (error) {
      console.error('取得聊天室錯誤:', error)
      throw error
    }
  },

  // 更新聊天室
  update: async (roomId, { name }) => {
    try {
      const [result] = await db.execute(
        'UPDATE chat_rooms SET name = ? WHERE id = ?',
        [name, roomId]
      )
      return result.affectedRows > 0
    } catch (error) {
      console.error('更新聊天室錯誤:', error)
      throw error
    }
  },

  // 刪除聊天室
  delete: async (roomId) => {
    try {
      const [result] = await db.execute(
        'UPDATE chat_rooms SET valid = 0 WHERE id = ?',
        [roomId]
      )
      return result.affectedRows > 0
    } catch (error) {
      console.error('刪除聊天室錯誤:', error)
      throw error
    }
  },

  // 加入成員
  addMember: async (roomId, userId) => {
    try {
      const [result] = await db.execute(
        'INSERT INTO chat_room_members (room_id, user_id) VALUES (?, ?)',
        [roomId, userId]
      )
      return result.insertId
    } catch (error) {
      console.error('加入成員錯誤:', error)
      throw error
    }
  },

  // 取得成員列表
  getMembers: async (roomId) => {
    try {
      const [members] = await db.execute(
        `SELECT u.user_id, u.name, u.image_path, crm.joined_at
        FROM chat_room_members crm
        JOIN users u ON crm.user_id = u.user_id
        WHERE crm.room_id = ?`,
        [roomId]
      )
      return members
    } catch (error) {
      console.error('取得成員列表錯誤:', error)
      throw error
    }
  },

  // 移除成員
  removeMember: async (roomId, userId) => {
    try {
      const [result] = await db.execute(
        'DELETE FROM chat_room_members WHERE room_id = ? AND user_id = ?',
        [roomId, userId]
      )
      return result.affectedRows > 0
    } catch (error) {
      console.error('移除成員錯誤:', error)
      throw error
    }
  },

  // 儲存訊息
  saveMessage: async ({
    roomId,
    senderId,
    message,
    isPrivate = false,
    recipientId = null,
  }) => {
    try {
      const [result] = await db.execute(
        `INSERT INTO chat_messages 
        (room_id, sender_id, message, is_private, recipient_id) 
        VALUES (?, ?, ?, ?, ?)`,
        [roomId, senderId, message, isPrivate ? 1 : 0, recipientId]
      )
      return result.insertId
    } catch (error) {
      console.error('儲存訊息錯誤:', error)
      throw error
    }
  },

  // 取得聊天記錄
  getMessages: async (roomId, limit = 50) => {
    try {
      const [messages] = await db.execute(
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
      return messages.reverse()
    } catch (error) {
      console.error('取得聊天記錄錯誤:', error)
      throw error
    }
  },

  // 檢查是否為聊天室成員
  isMember: async (roomId, userId) => {
    try {
      const [result] = await db.execute(
        'SELECT 1 FROM chat_room_members WHERE room_id = ? AND user_id = ? LIMIT 1',
        [roomId, userId]
      )
      return result.length > 0
    } catch (error) {
      console.error('檢查成員資格錯誤:', error)
      throw error
    }
  },

  // 獲取使用者的群組
  getUserGroups: async (userId) => {
    try {
      const [groups] = await db.execute(
        `SELECT 
         g.*,
         COUNT(DISTINCT crm.user_id) as member_count
       FROM \`group\` g
       LEFT JOIN chat_rooms cr ON g.chat_room_id = cr.id
       LEFT JOIN chat_room_members crm ON cr.id = crm.room_id
       WHERE g.creator_id = ? 
       OR cr.id IN (
         SELECT room_id 
         FROM chat_room_members 
         WHERE user_id = ?
       )
       GROUP BY g.group_id`,
        [userId, userId]
      )
      return groups
    } catch (error) {
      console.error('獲取使用者群組錯誤:', error)
      throw error
    }
  },

  // 取得群組聊天室ID
  getGroupChatRoomId: async (groupId) => {
    try {
      const [result] = await db.execute(
        'SELECT chat_room_id FROM `group` WHERE group_id = ?',
        [groupId]
      )
      return result[0]?.chat_room_id
    } catch (error) {
      console.error('取得群組聊天室ID錯誤:', error)
      throw error
    }
  },

  // 建立群組聊天室
  createGroupChatRoom: async (groupName, creatorId) => {
    const conn = await db.getConnection()
    try {
      await conn.beginTransaction()

      // 建立聊天室
      const [roomResult] = await conn.execute(
        'INSERT INTO chat_rooms (name, creator_id) VALUES (?, ?)',
        [groupName, creatorId]
      )
      const chatRoomId = roomResult.insertId

      // 建立群組
      const [groupResult] = await conn.execute(
        `INSERT INTO \`group\` (
         group_name, description, creator_id, 
         max_members, chat_room_id, creat_time
       ) VALUES (?, ?, ?, ?, ?, NOW())`,
        [groupName, '', creatorId, 50, chatRoomId]
      )

      // 加入創建者為成員
      await conn.execute(
        'INSERT INTO chat_room_members (room_id, user_id) VALUES (?, ?)',
        [chatRoomId, creatorId]
      )

      await conn.commit()
      return {
        groupId: groupResult.insertId,
        chatRoomId,
      }
    } catch (error) {
      await conn.rollback()
      console.error('建立群組聊天室錯誤:', error)
      throw error
    } finally {
      conn.release()
    }
  },

  // 檢查是否為群組成員
  isGroupMember: async (groupId, userId) => {
    try {
      const [result] = await db.execute(
        `SELECT 1 
        FROM \`group\` g
        JOIN chat_rooms cr ON g.chat_room_id = cr.id
        JOIN chat_room_members crm ON cr.id = crm.room_id
        WHERE g.group_id = ? AND crm.user_id = ?
        LIMIT 1`,
        [groupId, userId]
      )
      return result.length > 0
    } catch (error) {
      console.error('檢查群組成員錯誤:', error)
      throw error
    }
  },

  // 獲取群組詳情
  getGroupById: async (groupId) => {
    try {
      const [groups] = await db.execute(
        'SELECT * FROM `group` WHERE group_id = ?',
        [groupId]
      )
      return groups[0]
    } catch (error) {
      console.error('獲取群組詳情錯誤:', error)
      throw error
    }
  },

  // 更新群組資訊
  updateGroup: async (groupId, { groupName, description, maxMembers }) => {
    try {
      const [result] = await db.execute(
        `UPDATE \`group\` 
        SET group_name = ?, description = ?, max_members = ?
        WHERE group_id = ?`,
        [groupName, description, maxMembers, groupId]
      )
      return result.affectedRows > 0
    } catch (error) {
      console.error('更新群組錯誤:', error)
      throw error
    }
  },

  // 刪除群組
  deleteGroup: async (groupId) => {
    const conn = await db.getConnection()
    try {
      await conn.beginTransaction()

      // 獲取關聯的聊天室ID
      const [chatRoomResult] = await conn.execute(
        'SELECT chat_room_id FROM `group` WHERE group_id = ?',
        [groupId]
      )
      const chatRoomId = chatRoomResult[0]?.chat_room_id

      if (chatRoomId) {
        // 刪除群組
        await conn.execute('DELETE FROM `group` WHERE group_id = ?', [groupId])

        // 刪除相關的聊天室記錄
        await conn.execute('UPDATE chat_rooms SET valid = 0 WHERE id = ?', [
          chatRoomId,
        ])

        // 清除成員關係
        await conn.execute('DELETE FROM chat_room_members WHERE room_id = ?', [
          chatRoomId,
        ])
      }

      await conn.commit()
      return true
    } catch (error) {
      await conn.rollback()
      console.error('刪除群組錯誤:', error)
      throw error
    } finally {
      conn.release()
    }
  },

  // 獲取群組訊息
  getGroupMessages: async (groupId, limit = 50) => {
    try {
      const [messages] = await db.execute(
        `SELECT 
         cm.*,
         u.name as sender_name,
         u.image_path as sender_image,
         g.group_name,
         g.group_id
       FROM \`group\` g
       JOIN chat_rooms cr ON g.chat_room_id = cr.id
       JOIN chat_messages cm ON cr.id = cm.room_id
       JOIN users u ON cm.sender_id = u.user_id
       WHERE g.group_id = ?
       ORDER BY cm.created_at DESC
       LIMIT ?`,
        [groupId, limit]
      )
      return messages.reverse()
    } catch (error) {
      console.error('獲取群組訊息錯誤:', error)
      throw error
    }
  },

  // 獲取群組成員
  getGroupMembers: async (groupId) => {
    try {
      const [members] = await db.execute(
        `SELECT 
         u.user_id,
         u.name,
         u.image_path as image,
         u.email,
         crm.joined_at
       FROM \`group\` g
       JOIN chat_rooms cr ON g.chat_room_id = cr.id
       JOIN chat_room_members crm ON cr.id = crm.room_id
       JOIN users u ON crm.user_id = u.user_id
       WHERE g.group_id = ?
       ORDER BY crm.joined_at ASC`,
        [groupId]
      )
      return members
    } catch (error) {
      console.error('獲取群組成員錯誤:', error)
      throw error
    }
  },

  // 獲取私人訊息
  getPrivateMessages: async (userId, withUserId) => {
    try {
      const [messages] = await db.execute(
        `SELECT 
         cm.*,
         u.name as sender_name,
         u.image_path as sender_image
       FROM chat_messages cm
       JOIN users u ON cm.sender_id = u.user_id
       WHERE (cm.sender_id = ? AND cm.recipient_id = ?)
       OR (cm.sender_id = ? AND cm.recipient_id = ?)
       ORDER BY cm.created_at DESC
       LIMIT 50`,
        [userId, withUserId, withUserId, userId]
      )
      return messages.reverse()
    } catch (error) {
      console.error('獲取私人訊息錯誤:', error)
      throw error
    }
  },

  // 根據 ID 獲取使用者
  getUserById: async (userId) => {
    try {
      const [users] = await db.execute(
        'SELECT * FROM users WHERE user_id = ? AND valid = 1',
        [userId]
      )
      return users[0]
    } catch (error) {
      console.error('獲取使用者資訊錯誤:', error)
      throw error
    }
  },
}

export default ChatRoom

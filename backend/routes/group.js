import express from 'express'
const router = express.Router()
import multer from 'multer'
import path from 'path'
import db from '../configs/mysql.js'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cors from 'cors'
import { checkAuth } from './auth.js'
import 'dotenv/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 設定上傳目錄
const uploadDir = path.join(__dirname, '../public/uploads/groups')
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
} catch (error) {
  console.error('Error creating upload directory:', error)
}

// 設定 CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}
router.use(cors(corsOptions))

// 設定 multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, 'group-' + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/
    const mimetype = allowedTypes.test(file.mimetype)
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    )

    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(new Error('只允許上傳 .jpg, .jpeg, .png, .gif 格式的圖片'))
  },
})

// GET - 取得所有群組
router.get('/all', async function (req, res) {
  let connection
  try {
    connection = await db.getConnection()
    const [groups] = await connection.query(`
      SELECT g.*, u.name as creator_name, COUNT(DISTINCT gm.member_id) as member_count 
      FROM \`group\` g
      LEFT JOIN users u ON g.creator_id = u.user_id
      LEFT JOIN group_members gm ON g.group_id = gm.group_id
      GROUP BY g.group_id
      ORDER BY g.creat_time DESC
    `)

    return res.json({
      status: 'success',
      data: { groups },
    })
  } catch (error) {
    console.error('獲取群組失敗:', error)
    return res.json({
      status: 'error',
      message: '獲取群組失敗',
    })
  } finally {
    if (connection) connection.release()
  }
})

// GET - 獲取使用者參與的群組
router.get('/user', checkAuth, async function (req, res) {
  let connection
  try {
    connection = await db.getConnection()
    const [groups] = await connection.query(
      `
      SELECT g.*, 
             u.name as creator_name, 
             (SELECT COUNT(*) FROM group_members WHERE group_id = g.group_id AND status = 'accepted') as member_count
      FROM group_members gm
      JOIN \`group\` g ON gm.group_id = g.group_id
      JOIN users u ON g.creator_id = u.user_id
      WHERE gm.member_id = ? AND gm.status = 'accepted'
      GROUP BY g.group_id
      ORDER BY g.creat_time DESC
    `,
      [req.user.user_id]
    )

    return res.json({
      status: 'success',
      data: { groups },
    })
  } catch (error) {
    console.error('獲取使用者群組失敗:', error)
    return res.status(500).json({
      status: 'error',
      message: '獲取使用者群組失敗',
    })
  } finally {
    if (connection) connection.release()
  }
})

// GET - 獲取使用者創建的群組
router.get('/creator', checkAuth, async function (req, res) {
  let connection
  try {
    connection = await db.getConnection()
    const [groups] = await connection.query(
      `
      SELECT g.*, 
             u.name as creator_name, 
             (SELECT COUNT(*) FROM group_members WHERE group_id = g.group_id AND status = 'accepted') as member_count
      FROM \`group\` g
      LEFT JOIN users u ON g.creator_id = u.user_id
      WHERE g.creator_id = ?
      GROUP BY g.group_id
      ORDER BY g.creat_time DESC
    `,
      [req.user.user_id]
    )

    return res.json({
      status: 'success',
      data: { groups },
    })
  } catch (error) {
    console.error('獲取創建群組失敗:', error)
    return res.status(500).json({
      status: 'error',
      message: '獲取創建群組失敗',
    })
  } finally {
    if (connection) connection.release()
  }
})

// GET - 取得單一群組
router.get('/:id', async function (req, res) {
  let connection
  try {
    connection = await db.getConnection()
    const [groups] = await connection.query(
      `
      SELECT g.*, 
             (SELECT COUNT(*) FROM group_members WHERE group_id = g.group_id AND status = 'accepted') as member_count,
             u.name as creator_name
      FROM \`group\` g
      LEFT JOIN users u ON g.creator_id = u.user_id
      WHERE g.group_id = ?
    `,
      [req.params.id]
    )

    if (groups.length === 0) {
      return res.json({
        status: 'error',
        message: '找不到群組',
      })
    }

    // 獲取群組成員
    const [members] = await connection.query(
      `
      SELECT u.user_id, u.name, u.image_path, gm.status, gm.join_time
      FROM group_members gm
      JOIN users u ON gm.member_id = u.user_id
      WHERE gm.group_id = ?
    `,
      [req.params.id]
    )

    const group = groups[0]
    group.members = members

    return res.json({
      status: 'success',
      data: { group },
    })
  } catch (error) {
    console.error('獲取群組失敗:', error)
    return res.json({
      status: 'error',
      message: '獲取群組失敗',
    })
  } finally {
    if (connection) connection.release()
  }
})

// POST - 建立新群組
router.post('/', checkAuth, upload.single('group_img'), async (req, res) => {
  let connection
  try {
    connection = await db.getConnection()
    await connection.beginTransaction()

    // 從 token 中獲取用戶 ID
    const creator_id = req.user.user_id
    const { group_name, description, max_members, group_time } = req.body
    const group_img = req.file ? `/uploads/groups/${req.file.filename}` : ''

    // 驗證必要欄位
    if (!group_name?.trim()) {
      throw new Error('群組名稱為必填欄位')
    }
    if (!description?.trim()) {
      throw new Error('群組描述為必填欄位')
    }
    if (!max_members) {
      throw new Error('人數上限為必填欄位')
    }
    if (!group_time) {
      throw new Error('活動時間為必填欄位')
    }

    // 驗證活動時間不能早於現在
    const selectedTime = new Date(group_time)
    const now = new Date()
    if (selectedTime < now) {
      throw new Error('活動時間不能早於現在')
    }

    const maxMembersNum = parseInt(max_members, 10)
    if (isNaN(maxMembersNum) || maxMembersNum < 2) {
      throw new Error('人數上限必須大於等於 2')
    }

    // 驗證長度
    if (group_name.trim().length > 20) {
      throw new Error('群組名稱不能超過20字')
    }
    if (description.trim().length > 500) {
      throw new Error('群組描述不能超過500字')
    }

    // 新增群組
    const [groupResult] = await connection.query(
      'INSERT INTO `group` (group_name, description, creator_id, max_members, group_img, creat_time, group_time) VALUES (?, ?, ?, ?, ?, NOW(), ?)',
      [
        group_name.trim(),
        description.trim(),
        creator_id,
        maxMembersNum,
        group_img,
        group_time,
      ]
    )

    if (!groupResult.insertId) {
      throw new Error('群組建立失敗')
    }

    // 加入創建者為成員
    await connection.query(
      'INSERT INTO group_members (group_id, member_id, join_time, status) VALUES (?, ?, NOW(), ?)',
      [groupResult.insertId, creator_id, 'accepted']
    )

    await connection.commit()

    res.json({
      status: 'success',
      message: '群組建立成功',
      data: {
        group_id: groupResult.insertId,
        group_name: group_name.trim(),
        description: description.trim(),
        creator_id,
        max_members: maxMembersNum,
        group_img: group_img ? `http://localhost:3005${group_img}` : null,
        group_time,
      },
    })
  } catch (error) {
    console.error('Error in group creation:', error)

    if (connection) {
      await connection.rollback()
    }

    if (req.file) {
      try {
        fs.unlinkSync(path.join(uploadDir, req.file.filename))
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError)
      }
    }

    res.status(400).json({
      status: 'error',
      message: error.message || '建立群組失敗',
    })
  } finally {
    if (connection) {
      connection.release()
    }
  }
})

// PUT - 更新群組
router.put('/:id', checkAuth, upload.single('group_img'), async (req, res) => {
  let connection
  try {
    connection = await db.getConnection()
    await connection.beginTransaction()

    const groupId = req.params.id

    // 檢查群組是否存在及使用者權限
    const [groups] = await connection.query(
      'SELECT * FROM `group` WHERE group_id = ?',
      [groupId]
    )

    if (groups.length === 0) {
      throw new Error('找不到群組')
    }

    if (groups[0].creator_id !== req.user.user_id) {
      throw new Error('只有群組創建者可以修改群組資料')
    }

    const { group_name, description, max_members } = req.body
    const updateData = []
    const updateFields = []

    if (group_name) {
      updateFields.push('group_name = ?')
      updateData.push(group_name.trim())
    }
    if (description) {
      updateFields.push('description = ?')
      updateData.push(description.trim())
    }
    if (max_members) {
      updateFields.push('max_members = ?')
      updateData.push(parseInt(max_members))
    }
    if (req.file) {
      updateFields.push('group_img = ?')
      updateData.push(`/uploads/groups/${req.file.filename}`)

      // 刪除舊圖片
      if (groups[0].group_img) {
        const oldImagePath = path.join(
          __dirname,
          '../public',
          groups[0].group_img
        )
        fs.promises.unlink(oldImagePath).catch((err) => {
          console.error('Error deleting old image:', err)
        })
      }
    }

    if (updateFields.length > 0) {
      updateData.push(groupId)
      await connection.query(
        `UPDATE \`group\` SET ${updateFields.join(', ')} WHERE group_id = ?`,
        updateData
      )
    }

    await connection.commit()

    const [updatedGroup] = await connection.query(
      'SELECT * FROM `group` WHERE group_id = ?',
      [groupId]
    )

    return res.json({
      status: 'success',
      data: { group: updatedGroup[0] },
    })
  } catch (error) {
    if (connection) await connection.rollback()

    if (req.file) {
      try {
        fs.unlinkSync(path.join(uploadDir, req.file.filename))
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError)
      }
    }

    return res.status(400).json({
      status: 'error',
      message: error.message || '更新群組失敗',
    })
  } finally {
    if (connection) connection.release()
  }
})

// DELETE - 刪除群組
router.delete('/:id', checkAuth, async (req, res) => {
  let connection
  try {
    connection = await db.getConnection()
    await connection.beginTransaction()

    const [group] = await connection.query(
      'SELECT * FROM `group` WHERE group_id = ?',
      [req.params.id]
    )

    if (group.length === 0) {
      throw new Error('找不到群組')
    }

    if (group[0].creator_id !== req.user.user_id) {
      throw new Error('只有群組創建者可以刪除群組')
    }

    // 刪除群組圖片
    if (group[0].group_img) {
      const imagePath = path.join(__dirname, '../public', group[0].group_img)
      try {
        await fs.promises.unlink(imagePath)
      } catch (err) {
        console.error('Error deleting group image:', err)
      }
    }

    // 刪除群組成員記錄
    await connection.query('DELETE FROM group_members WHERE group_id = ?', [
      req.params.id,
    ])

    // 刪除群組
    await connection.query('DELETE FROM `group` WHERE group_id = ?', [
      req.params.id,
    ])

    await connection.commit()

    return res.json({
      status: 'success',
      message: '群組已刪除',
    })
  } catch (error) {
    if (connection) await connection.rollback()

    return res.status(400).json({
      status: 'error',
      message: error.message || '刪除群組失敗',
    })
  } finally {
    if (connection) connection.release()
  }
})

export default router

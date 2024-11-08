import express from 'express'
import multer from 'multer'
import path from 'path'
import db from '../configs/mysql.js'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = express.Router()

// CORS 設定
router.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

// 確保上傳目錄存在
const uploadDir = path.join(__dirname, '../public/uploads/groups')
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
} catch (error) {
  console.error('Error creating upload directory:', error)
}

// 設定 multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, 'group-' + uniqueSuffix + path.extname(file.originalname))
  },
})

// 設定 multer upload
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
}).single('group_img')

// 建立群組 API
router.post('/', async (req, res) => {
  const uploadMiddleware = () => {
    return new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          reject({ status: 400, message: '檔案上傳錯誤: ' + err.message })
        } else if (err) {
          reject({ status: 400, message: err.message })
        }
        resolve()
      })
    })
  }

  let connection
  try {
    connection = await db.getConnection()
    await connection.beginTransaction()

    // 處理檔案上傳
    await uploadMiddleware()

    const { group_name, description, creator_id, max_members } = req.body
    const group_img = req.file ? `/uploads/groups/${req.file.filename}` : ''

    // 驗證必要欄位
    if (
      !group_name?.trim() ||
      !description?.trim() ||
      !creator_id ||
      !max_members
    ) {
      throw new Error('所有必填欄位都必須填寫')
    }

    // 驗證資料長度
    if (group_name.length > 20) {
      throw new Error('群組名稱不能超過20字')
    }
    if (description.length > 500) {
      throw new Error('群組描述不能超過500字')
    }

    // 驗證使用者是否存在且有效
    const [userExists] = await connection.query(
      'SELECT user_id FROM users WHERE user_id = ? AND valid = 1',
      [creator_id]
    )

    if (!userExists.length) {
      throw new Error('無效的使用者ID')
    }

    // 新增群組資料
    const [result] = await connection.query(
      'INSERT INTO `group` (group_name, description, creator_id, max_members, group_img, creat_time) VALUES (?, ?, ?, ?, ?, NOW())',
      [
        group_name.trim(),
        description.trim(),
        creator_id,
        max_members,
        group_img,
      ]
    )

    // 自動將創建者加入群組
    await connection.query(
      'INSERT INTO group_members (group_id, member_id, join_time, status) VALUES (?, ?, NOW(), ?)',
      [result.insertId, creator_id, 'accepted']
    )

    await connection.commit()

    res.json({
      success: true,
      message: '群組建立成功',
      data: {
        group_id: result.insertId,
        group_name: group_name,
        description: description,
        creator_id: creator_id,
        max_members: max_members,
        group_img: group_img ? `http://localhost:3005${group_img}` : null,
      },
    })
  } catch (error) {
    if (connection) {
      await connection.rollback()
    }

    if (req.file) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError)
      }
    }

    console.error('Error in group creation:', error)
    res.status(400).json({
      success: false,
      error: error.message || '建立群組失敗',
    })
  } finally {
    if (connection) {
      connection.release()
    }
  }
})

export default router

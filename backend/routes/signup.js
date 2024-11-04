import express from 'express'
import db from '##/configs/mysql.js'
import multer from 'multer'
const upload = multer()
const router = express.Router()
import { generateHash } from '#db-helpers/password-hash.js'

router.post('/', upload.none(), async (req, res) => {  // 移除未使用的 next 參數
  try {
    const { email, password, phone, birthdate, gender } = req.body

    // 基本驗證
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        // message: '缺少必要欄位'
      })
    }

    // 檢查是否已經有相同的 email
    const [existingUsers] = await db.query(
      'SELECT 1 FROM users WHERE email = ?',
      [email]
    )
    // 為什麼這邊是SELECT 1?在這個查詢中,使用SELECT 1而不是SELECT *是一種常見的優化技巧。它的目的是檢查是否存在符合條件的記錄,而不關心記錄的具體內容。

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        status: 'error', 
        message: '電子郵件已被註冊' 
      })
    }

    // 密碼加密
    const hashedPassword = await generateHash(password)

    // SQL 查詢
    const sql = `
      INSERT INTO users (
        email, hashedPassword, phone, birthdate, gender
      ) VALUES (
        ?, ?, ?, ?, ?,        
      )
    `
    const params = [
      email, 
      hashedPassword,
      // password,
      phone || null,
      birthdate || null,
      gender || null
    ]

    const [result] = await db.query(sql, params)
    
    if (result.affectedRows === 1) {
      return res.json({ 
        status: 'success', 
        message: '註冊成功',
        data: {
          user_id: result.insertId
          // 這通常用在註冊新用戶時，需要知道新用戶的 ID：
        }
      })
    } 
  //   const connection = await db.getConnection()
  //   console.log('Database connection successful')
  //   connection.release()
  //   throw new Error('資料插入失敗')

  // } catch (error) {
  //   console.error('註冊失敗:', error)
  }catch(error){
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
          status: 'error',
          message: '此 email 已被註冊'
        })
      }
  
      return res.status(500).json({
        status: 'error',
        message: '系統錯誤，請稍後再試'
      })
    }
  })
export default router
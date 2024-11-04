import express from 'express'
import db from '##/configs/mysql.js'
import multer from 'multer'
const upload = multer()
const router = express.Router()
// import { generateHash } from '#db-helpers/password-hash.js'

router.post('/', upload.none(), async (req, res) => {  // 移除未使用的 next 參數
  try {
    const { email, password, phone, birthdate, gender } = req.body

    // 基本驗證
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: '缺少必要欄位'
      })
    }

    // 檢查是否已經有相同的 email
    const [existingUsers] = await db.query(
      'SELECT 1 FROM users WHERE email = ?',
      [email]
    )

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        status: 'error', 
        message: '電子郵件已被註冊' 
      })
    }

    // 密碼加密
    // const hashedPassword = await generateHash(password)

    // SQL 查詢
    const sql = `
      INSERT INTO users (
        email, password, phone, birthdate, gender,
        level, valid, created_at, 
        country, city, district, road_name, detailed_address
      ) VALUES (
        ?, ?, ?, ?, ?,
        0, 1, NOW(),
        '', '', '', '', ''
      )
    `
    const params = [
      email, 
      // hashedPassword,
      password,
      phone, 
      birthdate || null,
      gender
    ]

    const [result] = await db.query(sql, params)
    
    if (result.affectedRows === 1) {
      return res.json({ 
        status: 'success', 
        message: '註冊成功',
        data: {
          user_id: result.insertId
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
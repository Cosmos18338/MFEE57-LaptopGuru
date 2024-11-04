import express from 'express'
const router = express.Router()
import db from '##/configs/mysql.js'
import jsonwebtoken from 'jsonwebtoken'
import authenticate from '#middlewares/authenticate.js'
import 'dotenv/config.js'
import { compareHash } from '#db-helpers/password-hash.js'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// 檢查登入狀態
router.get('/check', authenticate, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE user_id=?', [
      req.user.user_id
    ])
    const user = rows[0]
    delete user.password
    return res.json({ status: 'success', data: { user } })
  } catch (error) {
    console.error('檢查失敗:', error)
    return res.json({ status: 'error', message: '檢查失敗' })
  }
})

// 登入
router.post('/login', async (req, res) => {
  const loginUser = req.body

  if (!loginUser.email || !loginUser.password) {
    return res.json({ status: 'fail', message: '缺少必要資料' })
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [loginUser.email, loginUser.password]
    )

    if (rows.length === 0) {
      return res.json({ status: 'error', message: '帳號或密碼錯誤' })
    }

    const user = rows[0]
    const tokenData = {
      user_id: user.user_id,
      email: user.email,
      city: user.city
    }

    const accessToken = jsonwebtoken.sign(
      tokenData,
      accessTokenSecret,
      { expiresIn: '3d' }
    )

    res.cookie('accessToken', accessToken, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    
    return res.json({
      status: 'success',
      data: { accessToken }
    })
  } catch (error) {
    console.error('登入失敗:', error)
    return res.json({ status: 'error', message: '登入失敗' })
  }
})

// 登出
router.post('/logout', authenticate, (req, res) => {
  res.clearCookie('accessToken', { httpOnly: true })
  return res.json({ status: 'success', data: null })
})

export default router
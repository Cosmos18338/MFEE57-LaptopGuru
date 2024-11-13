import express from 'express'
import bcrypt from 'bcrypt'  // 記得引入 bcrypt
const router = express.Router()
import transporter from "##/configs/mail.js";
import crypto from 'crypto'
// import { useRouter } from 'next/router'
import db from '##/configs/mysql.js'
import {generateHash} from '../db-helpers/password-hash.js'
// const router = useRouter()

// 忘記密碼請求
router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
  
      // 檢查信箱是否存在
      const [users] = await db.query(
        'SELECT * FROM users WHERE email = ? AND valid = 1',
        [email]
      );
  
      if (users.length === 0) {
        return res.status(404).json({ message: '此信箱未註冊' });
      }
  
      // 生成臨時密碼
      const hashedPassword = await generateHash(password)
   
  
      // 更新資料庫中的密碼
      await db.query(
        'UPDATE users SET password = ? WHERE email = ?',
        [hashedPassword, email]
      );
  
      // 發送郵件
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '密碼重置通知',
        html: `
          <h1>密碼重置</h1>
          <p>您的臨時密碼是: <strong>${tempPassword}</strong></p>
          <p>請使用此臨時密碼登入後立即更改您的密碼。</p>
          <p>如果這不是您本人的操作，請立即聯繫我們。</p>
        `
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ message: '新密碼已發送至您的信箱' });
    } catch (error) {
      console.error('忘記密碼處理錯誤:', error);
      res.status(500).json({ message: '伺服器錯誤' });
    }
  });
  
  export default router
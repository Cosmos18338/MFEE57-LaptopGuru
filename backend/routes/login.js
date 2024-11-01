import express from 'express'
const router = express.Router()

import db from '##/configs/mysql.js'
import multer from 'multer'
const upload = multer()

import jsonwebtoken from 'jsonwebtoken'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

/* GET home page. */
router.post('/', upload.none(), async (req, res, next) => {
  console.log(req.body)
  const loginmember = req.body

  const [row] = await db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [loginmember.email, loginmember.password]
  )

  if (row.length == 0) {
    return res.json({ status: 'error', message: '帳號或密碼錯誤' })
  }

  const user = row[0]

  const token = jsonwebtoken.sign(
    {
      id: user.user_id,
      email: user.email,
    },
    accessTokenSecret,
    { expiresIn: '1h' }
  )

  res.cookie('token', token)

  res.json({
    status: 'success',
    data: {
      token,
    },
  })
})

export default router

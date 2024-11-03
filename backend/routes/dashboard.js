import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
const router = express.Router()
const upload = multer()

import db from '##/configs/mysql.js'

// 這是dashboard的路由
router.get('/', async function (req, res) {
  try {
    const [users] = await db.query('SELECT * FROM users')
    return res.json({ status: 'success', data: { users } })
  } catch (error) {
    console.error('無法取得資料:', error)
    return res.status(500).json({ status: 'error', message: '無法連接' })
  }
})
// 這邊post是代表使用者更新了他的資料，然後把檔案傳進來之後我們要update，倒回去。倒進去是用value={}
router.post('/', async (req, res) => {
  const { name, gender, password, birthdate, phone, email, address } = req.body
  let result = await db.query(
    'UPDATE users SET birthdate =?, password=?,name=?,email=?,gender=?,country=?,city=?,district=?,road_name=?,detailed_address=?,image_path=?,remarks=?',
    // 這邊插入的值會去找req.body使用者input name裡面的名字的值對嗎
    [
      birthdate,
      password,
      name,
      email,
      gender,
      country,
      city,
      district,
      road_name,
      detailed_address,
      image_path,
      remarks,
    ]
  )
})


router.delete('/', async function (req, res) {
  const {user_id} =req.body
  try {
    const [users] = await db.query('UPDATE users SET valid = 0 WHERE user_id=?',[user_id] )
    return res.json({ status: 'success', data: { users } })
  } catch (error) {
    console.error('無法取得資料:', error)
    return res.status(500).json({ status: 'error', message: '無法連接' })
  }
})

export default router

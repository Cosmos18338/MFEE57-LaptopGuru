import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
const router = express.Router()
const upload = multer()
// 不要直接用auth狀態,
import db from '##/configs/mysql.js'

// 這是dashboard的路由
router.get('/:user_id', async function (req, res) {
  try {
    const [users] = await db.query('SELECT * FROM users')
    return res.json({ status: 'success', data: { users } })
  } catch (error) {
    console.error('無法取得資料:', error)
    return res.status(500).json({ status: 'error', message: '無法連接' })
  }
})
// patch這邊用於部分更新資源，只傳送需要更新的欄位，較為節省頻寬。用put會覆蓋整個資源，如果缺少某些欄位可能會被設為null,與我原本的語意不同所以使用patch

// 更新使用者資料
router.patch('/:user_id', async (req, res) => {
  const { name, gender, password, birthdate, phone, email, address } = req.body
  let result = await db.query(
    'UPDATE users SET name=?, password=?,birthdate =?,email=?,gender=?,country=?,city=?,district=?,road_name=?,detailed_address=?,image_path=?,remarks=?',
    // 這邊插入的值會去找req.body使用者input name裡面的名字的值對嗎
    [
      name,
      password,
      birthdate,
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

// 會員資料停用(軟刪除)
<<<<<<< Updated upstream
router.patch('/', async function (req, res) {
  const {user_id} =req.body
=======
router.put('/:user_id/address', async function (req, res) {
  const {user_id} =req.params
>>>>>>> Stashed changes
  try {
    const [users] = await db.query('UPDATE users SET valid = 0 WHERE user_id=?',[user_id] )
    return res.json({ status: 'success', data: { users } })
  } catch (error) {
    console.error('無法取得資料:', error)
    return res.status(500).json({ status: 'error', message: '無法連接' })
  }
})

export default router

import express from 'express'
import multer from 'multer'

const router = express.Router()
const upload = multer()

// 路由測試
// 路由測試
// 路由測試
router.get('/apple', upload.none(), (req, res) => {
  console.log('I am Ken')
  res.status(200).send('OK')
})

export default router

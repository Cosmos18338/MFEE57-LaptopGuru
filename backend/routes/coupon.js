import express from 'express'
const router = express.Router()
import db from '##/configs/mysql.js'
import multer from 'multer'

const upload = multer()

router.get('/:coupon_id', async (req, res) => {
  try {
    const [coupons] = await db.query('SELECT * FROM coupon_user WHERE user_id')

    res.json({
      status: 'success',
      data: coupons,
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤',
    })
  }
})

export default router

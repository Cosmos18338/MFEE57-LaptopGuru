import express from 'express'
const router = express.Router()
import db from '##/configs/mysql.js'
import multer from 'multer'

const upload = multer()

router.get('/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id

    if (isNaN(user_id)) {
      return res.status(400).json({
        status: 'error',
        message: '無效的用戶編號',
      })
    }

    const [coupons] = await db.query(
      `
        SELECT *
        FROM coupon_user
        WHERE user_id = ?`,
      [user_id]
    )

    if (coupons.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: '查無此用戶的優惠券',
      })
    }

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

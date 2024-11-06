import express from 'express'
import db from '##/configs/mysql.js'
import multer from 'multer'

const router = express.Router()
const upload = multer()

// 1. 獲取所有優惠券列表
router.get('/', async (req, res) => {
  try {
    const [coupons] = await db.query(`
      SELECT 
        coupon_id,
        coupon_code,
        coupon_content,
        discount_method,
        coupon_discount,
        coupon_start_time,
        coupon_end_time,
        valid
      FROM coupon
      ORDER BY coupon_end_time DESC
    `)

    // 處理日期格式和優惠券類型
    const processedCoupons = coupons.map(coupon => ({
      ...coupon,
      discount_type: coupon.discount_method === 1 ? '金額折抵' : '折扣百分比',
      coupon_start_time: new Date(coupon.coupon_start_time).toISOString(),
      coupon_end_time: new Date(coupon.coupon_end_time).toISOString()
    }))

    return res.json({
      status: 'success',
      data: processedCoupons
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    })
  }
})

// 2. 獲取使用者的優惠券（注意：這個路由要放在 /:coupon_id 之前）
router.get('/user/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id

    if (isNaN(user_id)) {
      return res.status(400).json({
        status: 'error',
        message: '無效的用戶編號'
      })
    }

    // JOIN 查詢獲取完整資訊
    const [coupons] = await db.query(`
      SELECT 
        cu.id as user_coupon_id,
        cu.user_id,
        cu.valid as user_coupon_valid,
        c.coupon_id,
        c.coupon_code,
        c.coupon_content,
        c.discount_method,
        c.coupon_discount,
        c.coupon_start_time,
        c.coupon_end_time,
        c.valid as coupon_valid
      FROM coupon_user cu
      JOIN coupon c ON cu.coupon_id = c.coupon_id
      WHERE cu.user_id = ?
      ORDER BY c.coupon_end_time DESC
    `, [user_id])

    if (coupons.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: '查無此用戶的優惠券'
      })
    }

    // 處理資料
    const processedCoupons = coupons.map(coupon => {
      const now = new Date()
      const startTime = new Date(coupon.coupon_start_time)
      const endTime = new Date(coupon.coupon_end_time)

      return {
        ...coupon,
        discount_type: coupon.discount_method === 1 ? '金額折抵' : '折扣百分比',
        coupon_start_time: startTime.toISOString(),
        coupon_end_time: endTime.toISOString(),
        is_valid: coupon.user_coupon_valid && coupon.coupon_valid && now >= startTime && now <= endTime,
        status: (() => {
          if (!coupon.user_coupon_valid) return '已使用'
          if (!coupon.coupon_valid) return '已失效'
          if (now < startTime) return '尚未開始'
          if (now > endTime) return '已過期'
          return '可使用'
        })()
      }
    })

    return res.json({
      status: 'success',
      data: processedCoupons
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    })
  }
})

// 3. 獲取單個優惠券資訊
router.get('/:coupon_id', async (req, res) => {
  try {
    const coupon_id = req.params.coupon_id

    if (isNaN(coupon_id)) {
      return res.status(400).json({
        status: 'error',
        message: '無效的優惠券編號'
      })
    }

    const [coupons] = await db.query(`
      SELECT 
        coupon_id,
        coupon_code,
        coupon_content,
        discount_method,
        coupon_discount,
        coupon_start_time,
        coupon_end_time,
        valid
      FROM coupon
      WHERE coupon_id = ?
    `, [coupon_id])

    if (coupons.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: '查無此優惠券'
      })
    }

    // 處理資料
    const processedCoupons = coupons.map(coupon => ({
      ...coupon,
      discount_type: coupon.discount_method === 1 ? '金額折抵' : '折扣百分比',
      coupon_start_time: new Date(coupon.coupon_start_time).toISOString(),
      coupon_end_time: new Date(coupon.coupon_end_time).toISOString()
    }))

    return res.json({
      status: 'success',
      data: processedCoupons
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤'
    })
  }
})

export default router
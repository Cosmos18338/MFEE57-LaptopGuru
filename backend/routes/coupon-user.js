// import express from 'express'
// const router = express.Router()
// import db from '##/configs/mysql.js'
// import multer from 'multer'

// const upload = multer()

// router.get('/user/:user_id', async (req, res) => {
//   try {
//     const user_id = parseInt(req.params.user_id)

//     if (isNaN(user_id) || user_id <= 0) {
//       return res.status(400).json({
//         status: 'error',
//         message: '無效的用戶編號',
//       })
//     }

//     const [coupons] = await db.query(
//       `
//       SELECT
//         cu.*,
//         c.coupon_code,
//         c.coupon_content,
//         c.discount_method,
//         c.coupon_discount,
//         c.coupon_start_time,
//         c.coupon_end_time,
//         c.valid as coupon_valid
//       FROM coupon_user cu
//       JOIN coupon c ON cu.coupon_id = c.coupon_id
//       WHERE cu.user_id = ?
//       ORDER BY cu.id DESC`,
//       [user_id]
//     )

//     if (coupons.length === 0) {
//       return res.json({
//         status: 'success',
//         data: [],
//         message: '目前沒有優惠券',
//       })
//     }

//     res.json({
//       status: 'success',
//       data: coupons,
//     })
//   } catch (error) {
//     console.error('Error:', error)
//     res.status(500).json({
//       status: 'error',
//       message: '伺服器錯誤',
//     })
//   }
// })

// export default router

import express from 'express'
import db from '##/configs/mysql.js'
import multer from 'multer'

const router = express.Router()
const upload = multer()

// 新增優惠券
router.post('/add', upload.none(), async (req, res, next) => {
  try {
    console.log('請求體:', req.body)

    const { user_id, coupon_id } = req.body

    // 基本驗證
    if (!user_id || !coupon_id) {
      return res.status(400).json({
        status: 'error',
        message: '缺少必要參數',
        receivedData: req.body,
      })
    }

    // 檢查資料庫連線
    const [testConnection] = await db.query('SELECT 1')
    console.log('資料庫連線測試:', testConnection)

    // 檢查優惠券是否已被領取
    const [existingCoupons] = await db.query(
      'SELECT * FROM coupon_user WHERE user_id = ? AND coupon_id = ?',
      [user_id, coupon_id]
    )
    console.log('既有優惠券查詢結果:', existingCoupons)

    if (existingCoupons.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: '您已經領取過這張優惠券',
      })
    }

    // 新增優惠券
    const [result] = await db.query(
      'INSERT INTO coupon_user (user_id, coupon_id) VALUES (?, ?)',
      [user_id, coupon_id]
    )
    console.log('插入結果:', result)

    res.json({
      status: 'success',
      message: '優惠券領取成功',
      data: {
        user_id,
        coupon_id,
        created_at: new Date(),
      },
    })
  } catch (error) {
    console.error('詳細錯誤信息:', error)
    res.status(500).json({
      status: 'error',
      message: '系統錯誤',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    })
  }
})

// 抓取coupon_user valid=1的資料
router.get('/:user_id', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id)

    if (isNaN(user_id) || user_id <= 0) {
      return res.status(400).json({
        status: 'error',
        message: '無效的用戶編號',
      })
    }

    // 只檢查 coupon_user 的 valid = 1
    const [validCoupons] = await db.query(
      `
      SELECT 
        cu.id,
        cu.user_id,
        cu.coupon_id,
        cu.valid as user_coupon_valid,
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
      AND cu.valid = 1  /* 只檢查 coupon_user 的 valid */
      ORDER BY cu.id DESC
      `,
      [user_id]
    )

    if (validCoupons.length === 0) {
      return res.json({
        status: 'success',
        data: [],
        message: '目前沒有可用的優惠券',
      })
    }

    res.json({
      status: 'success',
      data: validCoupons,
      message: '查詢成功',
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤',
    })
  }
})

// 修改
// 更新優惠券使用狀態
router.put('/update', async (req, res) => {
  try {
    const { user_id, coupon_id, valid } = req.body

    console.log('收到的請求資料:', { user_id, coupon_id, valid }) // 記錄收到的資料

    // 基本驗證
    if (!user_id || !coupon_id) {
      return res.status(400).json({
        status: 'error',
        message: '缺少必要參數',
      })
    }

    // 更新優惠券使用狀態
    const [result] = await db.query(
      `
      UPDATE coupon_user 
      SET valid = ?
      WHERE user_id = ? AND coupon_id = ?
      `,
      [valid, user_id, coupon_id]
    )
    console.log('更新結果:', result) // 記錄更新結果

    if (result.affectedRows === 0) {
      return res.status(400).json({
        status: 'error',
        message: '更新失敗，找不到符合條件的優惠券',
      })
    }

    // 回傳成功結果
    res.json({
      status: 'success',
      message: '優惠券狀態已更新',
      data: {
        user_id,
        coupon_id,
        valid,
        updated_at: new Date(),
      },
    })
  } catch (error) {
    console.error('詳細錯誤信息:', error)
    res.status(500).json({
      status: 'error',
      message: '系統錯誤',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
})

// // 更新優惠券使用狀態
// router.put('/update', async (req, res) => {
//   try {
//     const { user_id, coupon_id } = req.body

//     // 更新使用者優惠券狀態為已使用
//     const [result] = await db.query(
//       `
//       UPDATE coupon_user
//       SET valid = 0
//       WHERE user_id = ? AND coupon_id = ?
//       `,
//       [user_id, coupon_id]
//     )

//     if (result.affectedRows === 0) {
//       return res.status(400).json({
//         status: 'error',
//         message: '更新失敗，找不到符合條件的優惠券'
//       })
//     }

//     res.json({
//       status: 'success',
//       message: '優惠券已標記為已使用'
//     })
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: '系統錯誤'
//     })
//   }
// })
export default router

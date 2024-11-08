// // import express from 'express'
// // const router = express.Router()
// // import db from '##/configs/mysql.js'
// // import multer from 'multer'

// // const upload = multer()

// // // 獲取所有優惠券資訊
// // router.get('/', async (req, res) => {
// //   try {
// //     // SQL 查詢修改為獲取所有優惠券
// //     const [coupons] = await db.query(
// //       `
// //       SELECT
// //         coupon_id,
// //         coupon_code,
// //         coupon_content,
// //         discount_method,
// //         coupon_discount,
// //         coupon_start_time,
// //         coupon_end_time,
// //         valid
// //       FROM coupon
// //       WHERE valid = 1
// //       ORDER BY coupon_end_time DESC
// //       `
// //     )

// //     // 查無資料的處理
// //     if (coupons.length === 0) {
// //       return res.json({
// //         status: 'success',
// //         data: {
// //           coupons: [], // 回傳空陣列
// //         },
// //         message: '目前沒有優惠券',
// //       })
// //     }

// //     // 成功回應
// //     return res.json({
// //       status: 'success',
// //       data: {
// //         coupons: coupons, // 回傳所有優惠券資料
// //       },
// //     })
// //   } catch (error) {
// //     console.error('Error:', error)
// //     return res.status(500).json({
// //       status: 'error',
// //       message: '伺服器錯誤',
// //     })
// //   }
// // })

// // export default router

// import express from 'express'
// const router = express.Router()
// import db from '##/configs/mysql.js'
// import multer from 'multer'

// const upload = multer()

// // 獲取所有有效的優惠券資訊 (valid=1)
// router.get('/', async (req, res) => {
//   try {
//     // SQL 查詢，加入多重排序條件
//     const [coupons] = await db.query(
//       `
//       SELECT
//         coupon_id,
//         coupon_code,
//         coupon_content,
//         discount_method,
//         coupon_discount,
//         coupon_start_time,
//         coupon_end_time,
//         valid
//       FROM coupon
//       WHERE valid = 1
//       ORDER BY
//         coupon_end_time DESC,    -- 先依結束時間降序（最近到期的優先）
//         coupon_discount DESC,    -- 再依折扣金額降序（金額大的優先）
//         coupon_start_time DESC   -- 最後依開始時間降序（最新的優先）
//       `
//     )

//     // 查無資料的處理
//     if (coupons.length === 0) {
//       return res.json({
//         status: 'success',
//         data: {
//           coupons: []
//         },
//         message: '目前沒有可用的優惠券'
//       })
//     }

//     // 成功回應
//     return res.json({
//       status: 'success',
//       data: {
//         coupons: coupons
//       }
//     })
//   } catch (error) {
//     console.error('Error:', error)
//     return res.status(500).json({
//       status: 'error',
//       message: '伺服器錯誤'
//     })
//   }
// })

// export default router

import express from 'express'
const router = express.Router()
import db from '##/configs/mysql.js'
import multer from 'multer'

const upload = multer()

// 獲取所有有效的優惠券資訊 (valid=1)，依照 coupon_id 排序
router.get('/', async (req, res) => {
  try {
    // SQL 查詢，加入 ORDER BY coupon_id
    const [coupons] = await db.query(
      `
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
      WHERE valid = 1
      ORDER BY coupon_id ASC  /* 依照 ID 順序排列，ASC 是升序（從小到大） */
      `
    )

    // 查無資料的處理
    if (coupons.length === 0) {
      return res.json({
        status: 'success',
        data: {
          coupons: [],
        },
        message: '目前沒有可用的優惠券',
      })
    }

    // 成功回應
    return res.json({
      status: 'success',
      data: {
        coupons: coupons,
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      status: 'error',
      message: '伺服器錯誤',
    })
  }
})

router.put('/update', async (req, res) => {
  try {
    const { coupon_id } = req.body

    // 基本參數驗證
    if (!coupon_id) {
      return res.status(400).json({
        status: 'error',
        message: '缺少必要參數',
        receivedData: req.body,
      })
    }

    // 更新 coupon 表的 valid 為 0
    const [result] = await db.query(
      `
      UPDATE coupon 
      SET valid = 0 
      WHERE coupon_id = ?
      `,
      [coupon_id]
    )

    console.log('更新結果:', result)

    if (result.affectedRows === 0) {
      return res.status(400).json({
        status: 'error',
        message: '更新失敗，找不到優惠券',
      })
    }

    // 回傳成功結果
    res.json({
      status: 'success',
      message: '優惠券已標記為已領取',
      data: {
        coupon_id,
        valid: 0,
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

export default router

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

export default router

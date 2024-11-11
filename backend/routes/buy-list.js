import express from 'express'
const router = express.Router()

import db from '##/configs/mysql.js'

import multer from 'multer'
const upload = multer()

/* GET home page. */
router.get('/:user_id', upload.none(), async (req, res, next) => {
  const user_id = req.params.user_id
  try {
    const [data] = await db.query(
      'SELECT * FROM order_list WHERE user_id = ?',
      [user_id]
    )
    if (data.length == 0) {
      return res.json({ status: 'success', message: '無訂單資料' })
    }
    res.json({ status: 'success', data })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤',
    })
  }
})

router.get('/detail/:user_id', upload.none(), async (req, res, next) => {
  const user_id = req.params.user_id
  // 檢查user_id是否存在
  const [userCheck] = await db.query('SELECT * FROM users WHERE user_id = ?', [
    user_id,
  ])
  if (userCheck.length === 0) {
    return res.json({ status: 'error', message: '無此使用者' })
  }

  try {
    const [result] = await db.query(
      'SELECT order_list.user_id, order_list.order_id, order_list.order_amount, order_list.coupon_id, order_list.address, order_list.	already_pay, order_list.create_time, order_detail.product_id, order_detail.product_price, order_detail.quantity, product.product_name, product.	list_price, product_img.product_img_path FROM order_list JOIN order_detail ON order_list.order_id = order_detail.order_id JOIN product ON order_detail.product_id = product.product_id JOIN product_img ON product.product_id = product_img.img_product_id WHERE order_list.user_id = ?',
      [user_id]
    )

    if (result.length == 0) {
      return res.json({ status: 'success', message: '無訂單資料' })
    }

    res.json({ status: 'success', data: result })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤',
    })
  }
})

export default router

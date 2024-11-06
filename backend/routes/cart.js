import express from 'express'
const router = express.Router()

import db from '##/configs/mysql.js'

import multer from 'multer'
const upload = multer()

/* GET home page. */
router.post('/lease-cart', upload.none(), async (req, res, next) => {
  const { user_id } = req.body
  const [data] = await db.query('SELECT * FROM lease_cart WHERE user_id = ? ', [
    user_id,
  ])
  res.json({ status: 'success', data: { data } })
})

export default router

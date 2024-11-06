import express from 'express'
import db from '##/configs/mysql.js'
import multer from 'multer'

const router = express.Router()
// 指定router變成變數，router是一個方法，處理路由
const upload = multer()
// 解析傳來的請求，目前我是用 fetch()

// 有撈到了啦 json http://localhost:3005/api/article/1
// 動態路由記得寫

// 查詢後得到的變數是 responseData
router.get('/blog_detail/:blog_id', upload.none(), async (req, res, next) => {
  const blog_id = req.params.blog_id
  console.log(blog_id)

  // 查詢 blogoverview 表
  const [overviewData] = await db.query(
    'SELECT * FROM blogoverview WHERE blog_id = ? AND blog_validvalue = 1',
    [blog_id]
  )

  if (overviewData.length === 0) {
    return res.json({ status: 'error', message: '查無此文章' })
  }

  // 查詢 blogcomment 表
  const [comments] = await db.query(
    'SELECT blog_comment_userId, blog_comment_created_time, blog_comment_text FROM blogcomment WHERE blog_id = ? AND blog_validvalue = 1',
    [blog_id]
  )

  // 查詢 blogimage 表
  const [images] = await db.query(
    'SELECT blog_image FROM blogimage WHERE blog_id = ? AND blog_validvalue = 1',
    [blog_id]
  )

  // 查詢 blogkeyword 表
  const [keywords] = await db.query(
    'SELECT blog_keyword FROM blogkeyword WHERE blog_id = ? AND blog_validvalue = 1',
    [blog_id]
  )

  const responseData = {
    overview: overviewData,
    comments: comments,
    images: images,
    keywords: keywords,
  }

  res.json({ status: 'success', data: responseData })
})

router.post('/blog/blog-created', upload.none(), async (req, res) => {
  const {
    blog_user_id,
    blog_title,
    blog_content,
    blog_created_date,
    blog_brand,
    blog_brand_model,
    blog_type,
    blog_images, // 假設圖片以陣列形式傳遞
  } = req.body // 從 req.body 獲取所有必填欄位

  // 檢查必要的欄位是否存在
  if (!blog_user_id || !blog_title || !blog_content) {
    return res.status(400).json({
      status: 'error',
      message: '必填欄位喔!',
    })
  }

  try {
    // 插入部落格文章的資料
    const [result] = await db.query(
      'INSERT INTO blogoverview (blog_user_id, blog_title, blog_content, blog_created_date, blog_brand, blog_brand_model, blog_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        blog_user_id,
        blog_title,
        blog_content,
        blog_created_date,
        blog_brand,
        blog_brand_model,
        blog_type,
      ]
    )
    // 得到新的 blog_id，創建後回傳的
    const blog_id = result.insertId

    if (blog_images && blog_images.length > 0) {
      const imageInsertPromises = blog_images.map((image) => {
        return db.query(
          'INSERT INTO blogimage (blog_id, blog_image) VALUES (?, ?)',
          [blog_id, image]
        )
      })

      // 等待所有的插入操作完成
      await Promise.all(imageInsertPromises)
    }

    res.status(201).json({
      status: 'success',
      message: '部落格文章已成功創建',
      blog_id: blog_id, // 回傳新創建的 blog_id
    })
  } catch (error) {
    console.error('Error creating blog:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

router.patch('/blog/blog-delete/:blog_id', async (req, res) => {
  const { blog_id } = req.params

  if (!blog_id) {
    return res.status(400).json({ status: 'error', message: '缺少 blog_id' })
  }

  try {
    const [result] = await db.query(
      'UPDATE blogoverview SET blog_validvalue = 0 WHERE blog_id = ?',
      [blog_id]
    )

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: '查無此部落格文章，無法標記為刪除' })
    }

    res.status(200).json({
      status: 'success',
      message: '部落格文章已成功標記為刪除',
    })
  } catch (error) {
    console.error('Error marking blog as deleted:', error)

    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

export default router

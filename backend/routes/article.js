import express from 'express'
import db from '##/configs/mysql.js'

const router = express.Router()

router.get('/article-detail/:ArticleId', async function (req, res) {
  try {
    const { ArticleId } = req.params // 從路由中獲取 ArticleId

    // 查詢文章數據
    const [rows] = await db.query(
      'SELECT * FROM articleoverview WHERE article_id = ?',
      [ArticleId]
    )

    if (rows.length > 0) {
      // 如果找到對應的文章，返回該文章的資料
      res.json(rows[0]) // 假設 rows[0] 是你要返回的文章資料
    } else {
      res.status(404).json({ message: 'Article not found' }) // 如果找不到文章，返回404狀態
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' }) // 處理錯誤
  }
})

export default router

import express from 'express'
import db from '##/configs/mysql.js'
import multer from 'multer'

const router = express.Router()
// 指定router變成變數，router是一個方法，處理路由
// 解析傳來的請求，目前我是用 fetch()

// 有撈到了啦 json http://localhost:3005/api/article/1
// 動態路由記得寫

// 把假圖片全部儲存在後端統一路徑
// 後端儲存路徑：public/blog-images
// 後端完整儲存路徑 (不要用)：\laptopGuru\backend\public\blog-images\
// 前端獲取資料路徑：http://localhost:3005/blog-image/

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/blog-images',
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`)
    },
  }),
})

// -------------------------------時間戳記製作-------------------------------

router.get('/blog-detail/:blog_id', async (req, res) => {
  try {
    const blogId = req.params.blog_id // 從 URL 參數中獲取 blog_id

    // 從 blogoverview 表中撈取符合條件的資料
    const [blogData] = await db.query(
      `
      SELECT 
        blog_user_id,
        blog_type,
        blog_title,
        blog_content,
        blog_created_date,
        blog_brand,
        blog_image,
        blog_views,
        blog_keyword,
        blog_valid_value,
        blog_url
      FROM blogoverview
      WHERE blog_valid_value = 1 AND blog_id = ?
    `,
      [blogId]
    )

    // 檢查是否有撈到資料
    if (blogData.length === 0) {
      return res.json({ status: 'error', message: '查無相關部落格資料' })
    }

    // 回傳資料
    res.json({ status: 'success', data: blogData[0] })
  } catch (error) {
    console.error('Error fetching blog data:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

router.get('/bloguseroverview/:blog_id', async (req, res) => {
  try {
    const [blogData] = await db.query(
      `SELECT * FROM blogoverview WHERE blog_id = ? AND blog_valid_value = 1`,
      [req.params.blog_id]
    )

    if (blogData.length === 0) {
      return res.json({ status: 'error', message: '查無資料' })
    }

    res.json({ status: 'success', data: blogData[0] })
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

router.post('/blogcreated', upload.single('blog_image'), async (req, res) => {
  console.log(req.body.blog_valid_value)

  try {
    const {
      blog_type,
      blog_title,
      blog_content,
      blog_brand,
      blog_brand_model,
      blog_keyword,
      blog_valid_value,
      blog_created_date,
    } = req.body

    // 獲取上傳的圖片路徑
    const blog_image = req.file ? `/blog-images/${req.file.originalname}` : null

    const sql = `
    INSERT INTO blogoverview
    ( blog_type,
      blog_title,
      blog_content,
      blog_brand,
      blog_brand_model,
      blog_keyword,
      blog_valid_value,
      blog_created_date, blog_image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
      blog_type,
      blog_title,
      blog_content,
      blog_brand,
      blog_brand_model,
      blog_keyword,
      blog_valid_value,
      blog_created_date,
      blog_image,
    ]

    const [result] = await db.query(sql, values)

    res.json({
      success: true,
      message: '新增成功',
      id: result.insertId,
    })
  } catch (error) {
    console.error('資料庫錯誤:', error)
    res.status(500).json({
      success: false,
      message: '新增失敗，請稍後再試',
    })
  }
})

// 獲取單筆部落格資料
router.get('api/blog/edit/:blog_id', async (req, res) => {
  try {
    console.log('收到的 blog_id:', req.params.blog_id) // 檢查收到的 id

    const [rows] = await db.query(
      'SELECT * FROM blogoverview WHERE blog_id = ? AND blog_valid_value = 1',
      [req.params.blog_id]
    )

    console.log('查詢結果:', rows) // 檢查查詢結果

    // 加入錯誤處理
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: '找不到此篇部落格' })
    }

    // 確保資料存在再回傳
    res.json(rows[0])
  } catch (error) {
    console.error('資料庫錯誤:', error) // 記錄具體錯誤
    res.status(500).json({ error: '資料獲取失敗' })
  }
})

// 更新部落格資料
router.put(
  '/blog/edit/:blog_id',
  upload.single('blog_image'),
  async (req, res) => {
    try {
      const {
        blog_type,
        blog_title,
        blog_content,
        blog_brand,
        blog_brand_model,
        blog_keyword,
        blog_valid_value,
      } = req.body

      const blog_image = req.file
        ? `/blog-images/${req.file.originalname}`
        : null

      const sql = `
      UPDATE blogoverview 
      SET blog_type=?, blog_title=?, blog_content=?, 
          blog_brand=?, blog_brand_model=?, blog_keyword=?, 
          blog_valid_value=?, blog_image=?
      WHERE blog_id=?
    `

      await db.query(sql, [
        blog_type,
        blog_title,
        blog_content,
        blog_brand,
        blog_brand_model,
        blog_keyword,
        blog_valid_value,
        blog_image,
        req.params.blog_id,
      ])

      res.json({ success: true })
    } catch (error) {
      res.status(500).json({ error: '更新失敗' })
    }
  }
)

// 軟刪除部落格（把valid設為0）
router.put('/blog/delete/:blog_id', async (req, res) => {
  try {
    await db.query(
      'UPDATE blogoverview SET blog_valid_value = 0 WHERE blog_id = ?',
      [req.params.blog_id]
    )
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: '刪除失敗' })
  }
})

router.get('/blog_detail/:blog_id', async (req, res) => {
  try {
    const [blogDetail] = await db.query(
      'SELECT * FROM blogoverview WHERE blog_id = ?',
      [req.params.blog_id]
    )

    if (!blogDetail) {
      return res.status(404).json({ message: '找不到該文章' })
    }

    res.json(blogDetail)
  } catch (error) {
    console.error('部落格查詢錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

export default router

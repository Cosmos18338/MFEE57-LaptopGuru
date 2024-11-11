import express from 'express'
const router = express.Router()
import db from '##/configs/mysql.js'


router.post('/:user_id', async (req, res) => {
    const { user_id } = req.params//這邊params取的是自己寫的後端路由並非前端對吧
    try { 
      const [rowoflevel] = await db.query(
        'SELECT level FROM users WHERE user_id = ?',
        [user_id]
      )
  
      if (rowoflevel.length === 0) {
        return res.json({ status: 'error', message: '會員等級並未預設成功' })
      }
      return res.json({ status: 'success', level: rowoflevel[0].level }); // 返回會員等級
    } catch (error) {
      console.error('會員等級讀取錯誤:', error)
      res.status(500).json({
        status: 'error',
        message: '系統錯誤',
      })
    }
  })
// 需要關聯假資料，需要串到order_details的select...from...join...on... 還要count某個user_id累積的消費金額
export default router
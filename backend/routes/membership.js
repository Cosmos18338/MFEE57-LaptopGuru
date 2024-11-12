import express from 'express'
const router = express.Router()
import db from '##/configs/mysql.js'

// 獲取會員等級資訊
router.get('/api/membership/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id
    
    // 查詢該會員的所有訂單總金額
    const [orders] = await db.query(
      'SELECT SUM(order_amount) as total_spent FROM order_list WHERE user_id = ?',
      [user_id]
    )
    
    const totalSpent = orders[0].total_spent || 0

    // 獲取會員基本資料
    const [userResults] = await db.query(
      'SELECT level FROM users WHERE user_id = ?',
      [user_id]
    )

    if (userResults.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    // 計算下一等級所需金額
    let nextLevelRequired = 0
    if (totalSpent < 20000){
      nextLevelRequired = 20000 - totalSpent
    } 
    else if (totalSpent < 40000) {nextLevelRequired = 40000 - totalSpent}
    else if (totalSpent < 70000) {nextLevelRequired = 70000 - totalSpent}
    else if (totalSpent < 100000) {nextLevelRequired = 100000 - totalSpent}
    
    res.json({
      // currentLevel: userResults[0].level,
      totalSpent: totalSpent,
      nextLevelRequired: nextLevelRequired
    })
    
  } catch (error) {
    console.error('Error fetching membership data:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
import express from 'express'
import db from '../configs/mysql.js'

const router = express.Router()

// 獲取活動列表
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 12, status = '所有活動' } = req.query
    const offset = (page - 1) * pageSize

    // 基礎查詢
    let query = `
      SELECT 
        et.event_id,
        et.event_name,
        et.event_type,
        et.event_platform,
        et.event_content,
        et.event_rule,
        et.event_award,
        et.individual_or_team,
        et.event_picture,
        et.apply_start_time,
        et.apply_end_time,
        et.event_start_time,
        et.event_end_time,
        et.maximum_people,
        est.status_name as event_status,
        et.valid,
        et.created_at
      FROM event_type et
      JOIN event_status_type est ON et.status_id = est.status_id
      WHERE et.valid = 1
    `

    let countQuery = `
      SELECT COUNT(*) as total 
      FROM event_type et
      JOIN event_status_type est ON et.status_id = est.status_id
      WHERE et.valid = 1
    `
    let queryParams = []

    // 根據狀態篩選
    if (status !== '所有活動') {
      const statusCondition = {
        進行中: 'NOW() BETWEEN et.apply_end_time AND et.event_end_time',
        報名中: 'NOW() BETWEEN et.apply_start_time AND et.apply_end_time',
        即將開始報名: 'et.apply_start_time > NOW()',
        已結束: 'et.event_end_time < NOW()',
      }[status]

      if (statusCondition) {
        query += ` AND ${statusCondition}`
        countQuery += ` AND ${statusCondition}`
      }
    }

    // 加入排序和分頁
    query += ' ORDER BY et.created_at DESC LIMIT ? OFFSET ?'
    queryParams.push(parseInt(pageSize), offset)

    // 執行查詢
    const [events] = await db.query(query, queryParams)
    const [totalRows] = await db.query(countQuery)

    // 回傳資料
    res.json({
      code: 200,
      message: 'success',
      data: {
        events: events.map((event) => ({
          id: event.event_id,
          name: event.event_name,
          type: event.event_type,
          platform: event.event_platform,
          content: event.event_content,
          rule: event.event_rule,
          award: event.event_award,
          teamType: event.individual_or_team,
          picture: event.event_picture,
          applyStartTime: event.apply_start_time,
          applyEndTime: event.apply_end_time,
          eventStartTime: event.event_start_time,
          eventEndTime: event.event_end_time,
          maxPeople: event.maximum_people,
          status: event.event_status,
          createdAt: event.created_at,
        })),
        total: totalRows[0].total,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({
      code: 500,
      message: '獲取活動資料失敗',
      error: error.message,
    })
  }
})

// 獲取單一活動詳情
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const query = `
      SELECT 
        et.*,
        est.status_name as event_status
      FROM event_type et
      JOIN event_status_type est ON et.status_id = est.status_id
      WHERE et.event_id = ? AND et.valid = 1
    `

    const [results] = await db.query(query, [id])

    if (results.length === 0) {
      return res.status(404).json({
        code: 404,
        message: '活動不存在',
      })
    }

    const event = results[0]

    res.json({
      code: 200,
      message: 'success',
      data: {
        id: event.event_id,
        name: event.event_name,
        type: event.event_type,
        platform: event.event_platform,
        content: event.event_content,
        rule: event.event_rule,
        award: event.event_award,
        teamType: event.individual_or_team,
        picture: event.event_picture,
        applyStartTime: event.apply_start_time,
        applyEndTime: event.apply_end_time,
        eventStartTime: event.event_start_time,
        eventEndTime: event.event_end_time,
        maxPeople: event.maximum_people,
        status: event.event_status,
        createdAt: event.created_at,
      },
    })
  } catch (error) {
    console.error('Error fetching event details:', error)
    res.status(500).json({
      code: 500,
      message: '獲取活動詳情失敗',
      error: error.message,
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const {
      name,
      type,
      platform,
      content,
      rule,
      award,
      teamType,
      picture,
      applyStartTime,
      applyEndTime,
      eventStartTime,
      eventEndTime,
      maxPeople,
    } = req.body

    // 根據時間判斷狀態
    let statusQuery = `
      SELECT status_id FROM event_status_type 
      WHERE status_name = 
        CASE 
          WHEN ? > NOW() THEN '即將開始報名'
          WHEN NOW() BETWEEN ? AND ? THEN '報名中'
          WHEN NOW() BETWEEN ? AND ? THEN '進行中'
          ELSE '已結束'
        END
    `

    const [statusResult] = await db.query(statusQuery, [
      applyStartTime,
      applyStartTime,
      applyEndTime,
      applyEndTime,
      eventEndTime,
    ])

    const query = `
      INSERT INTO event_type (
        event_name,
        event_type,
        event_platform,
        event_content,
        event_rule,
        event_award,
        individual_or_team,
        event_picture,
        apply_start_time,
        apply_end_time,
        event_start_time,
        event_end_time,
        maximum_people,
        status_id,
        valid,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW())
    `

    const [result] = await db.query(query, [
      name,
      type,
      platform,
      content,
      rule,
      award,
      teamType,
      picture,
      applyStartTime,
      applyEndTime,
      eventStartTime,
      eventEndTime,
      maxPeople,
      statusResult[0].status_id,
    ])

    res.json({
      code: 200,
      message: '活動新增成功',
      data: {
        id: result.insertId,
      },
    })
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({
      code: 500,
      message: '新增活動失敗',
      error: error.message,
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      type,
      platform,
      content,
      rule,
      award,
      teamType,
      picture,
      applyStartTime,
      applyEndTime,
      eventStartTime,
      eventEndTime,
      maxPeople,
    } = req.body

    // 根據時間判斷狀態
    let statusQuery = `
      SELECT status_id FROM event_status_type 
      WHERE status_name = 
        CASE 
          WHEN ? > NOW() THEN '即將開始報名'
          WHEN NOW() BETWEEN ? AND ? THEN '報名中'
          WHEN NOW() BETWEEN ? AND ? THEN '進行中'
          ELSE '已結束'
        END
    `

    const [statusResult] = await db.query(statusQuery, [
      applyStartTime,
      applyStartTime,
      applyEndTime,
      applyEndTime,
      eventEndTime,
    ])

    const query = `
      UPDATE event_type
      SET 
        event_name = ?,
        event_type = ?,
        event_platform = ?,
        event_content = ?,
        event_rule = ?,
        event_award = ?,
        individual_or_team = ?,
        event_picture = ?,
        apply_start_time = ?,
        apply_end_time = ?,
        event_start_time = ?,
        event_end_time = ?,
        maximum_people = ?,
        status_id = ?
      WHERE event_id = ? AND valid = 1
    `

    const [result] = await db.query(query, [
      name,
      type,
      platform,
      content,
      rule,
      award,
      teamType,
      picture,
      applyStartTime,
      applyEndTime,
      eventStartTime,
      eventEndTime,
      maxPeople,
      statusResult[0].status_id,
      id,
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        message: '活動不存在',
      })
    }

    res.json({
      code: 200,
      message: '活動更新成功',
    })
  } catch (error) {
    console.error('Error updating event:', error)
    res.status(500).json({
      code: 500,
      message: '更新活動失敗',
      error: error.message,
    })
  }
})

export default router

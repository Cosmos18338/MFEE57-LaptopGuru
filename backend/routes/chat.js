// routes/chat.js
import express from 'express'
import { chatController } from '../controllers/chatController.js'

const router = express.Router()

router.get('/rooms', chatController.getRooms)
router.post('/rooms', chatController.createRoom)
router.post('/rooms/:roomId/join', chatController.joinRoom)
router.get('/rooms/:roomId/messages', chatController.getRoomMessages)

export default router

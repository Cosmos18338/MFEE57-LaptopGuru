import { WebSocketServer } from 'ws'
import { chatService } from '../services/chatService.js'

export function initializeWebSocket(server) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws, req) => {
    console.log('新的WebSocket連接')
    chatService.handleConnection(ws, req)
  })

  return wss
}

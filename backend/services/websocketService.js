import WebSocket from 'ws'

class WebSocketService {
  constructor() {
    this.ws = null
    this.listeners = {}
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.isConnecting = false
  }

  connect(userId) {
    if (this.isConnecting) return
    this.isConnecting = true

    try {
      console.log('Connecting to WebSocket server...')
      this.ws = new WebSocket('ws://localhost:3005')

      this.ws.onopen = () => {
        console.log('WebSocket connected successfully')
        this.isConnecting = false
        this.reconnectAttempts = 0

        this.send({
          type: 'register',
          userID: userId,
        })
        console.log('Register message sent')
      }

      this.ws.onclose = () => {
        console.log('WebSocket connection closed')
        this.isConnecting = false

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          setTimeout(() => {
            this.reconnectAttempts++
            this.connect(userId)
          }, 3000)
        }
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        this.isConnecting = false
      }

      this.ws.onmessage = (event) => {
        console.log('Raw WebSocket message:', event.data)
        try {
          const data = JSON.parse(event.data)
          console.log('Parsed WebSocket message:', data)
          if (this.listeners[data.type]) {
            this.listeners[data.type](data)
          }
        } catch (error) {
          console.error('WebSocket message parsing error:', error)
        }
      }
    } catch (error) {
      console.error('WebSocket connection error:', error)
      this.isConnecting = false
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('Sending message:', message)
      this.ws.send(JSON.stringify(message))
    } else {
      console.error('WebSocket is not connected')
    }
  }

  on(type, callback) {
    this.listeners[type] = callback
  }

  off(type) {
    delete this.listeners[type]
  }
}

const websocketService = new WebSocketService()
export default websocketService

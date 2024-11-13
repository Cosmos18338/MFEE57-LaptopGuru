import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ChatRoom from '@/components/chatroom/ChatRoom'
import CreateRoomForm from '@/components/chatroom/CreateRoomForm'
import UserList from '@/components/chatroom/UserList'
import EventButton from '@/components/event/EventButton'
import websocketService from '@/services/websocketService'
import styles from '@/styles/Chat.module.css'

export default function Chat() {
  const [users, setUsers] = useState([])
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  const [currentRoom, setCurrentRoom] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [message, setMessage] = useState('')

  // 初始化 WebSocket 連接和事件監聽
  useEffect(() => {
    // 假設從 localStorage 或 context 獲取用戶ID
    const userId = localStorage.getItem('userId') || 1
    setCurrentUser(userId)

    // 連接 WebSocket
    websocketService.connect(userId)

    // 註冊監聽器
    websocketService.on('registered', handleRegistered)
    websocketService.on('message', handleNewMessage)
    websocketService.on('roomCreated', handleRoomCreated)
    websocketService.on('userJoined', handleUserJoined)
    websocketService.on('userLeft', handleUserLeft)

    // 載入初始數據
    fetchInitialData()

    // 清理函數
    return () => {
      websocketService.disconnect()
    }
  }, [])

  // 獲取初始數據
  const fetchInitialData = async () => {
    try {
      const [usersResponse, roomsResponse] = await Promise.all([
        fetch('http://localhost:3005/api/chat/users'),
        fetch('http://localhost:3005/api/chat/rooms'),
      ])

      const usersData = await usersResponse.json()
      const roomsData = await roomsResponse.json()

      if (usersData.status === 'success') setUsers(usersData.data)
      if (roomsData.status === 'success') setRooms(roomsData.data)
    } catch (error) {
      console.error('獲取初始數據失敗:', error)
    }
  }

  // WebSocket 事件處理函數
  const handleRegistered = (data) => {
    setRooms(data.roomAry || [])
  }

  const handleNewMessage = (data) => {
    setMessages((prev) => [
      ...prev,
      {
        fromID: data.fromID,
        content: data.message,
        roomID: data.roomID,
        timestamp: new Date(),
        isPrivate: data.private,
      },
    ])
  }

  const handleRoomCreated = (data) => {
    setRooms((prev) => [...prev, data.room])
  }

  const handleUserJoined = (data) => {
    setUsers((prev) => [...prev, data.user])
  }

  const handleUserLeft = (data) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === data.userId ? { ...user, online: false } : user
      )
    )
  }

  // 用戶交互處理函數
  const handlePrivateChat = (userId) => {
    setCurrentRoom(null)
    // 開啟私人聊天
    websocketService.send({
      type: 'openPrivateChat',
      targetUserId: userId,
      fromId: currentUser,
    })
  }

  const handleRoomSelect = (roomId) => {
    setCurrentRoom(roomId)
    if (roomId) {
      websocketService.send({
        type: 'joinRoom',
        roomID: roomId,
        fromID: currentUser,
      })
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    websocketService.send({
      type: 'message',
      fromID: currentUser,
      message: message,
      roomID: currentRoom,
    })

    setMessage('')
  }

  return (
    <Container fluid className={styles.container}>
      <h3 className={styles.chatTitle}>聊天室</h3>
      <div className={styles.chatLayout}>
        <UserList
          users={users}
          rooms={rooms}
          currentUser={currentUser}
          currentRoom={currentRoom}
          onPrivateChat={handlePrivateChat}
          onRoomSelect={handleRoomSelect}
        />

        <div className={styles.chatContent}>
          <ChatRoom
            messages={messages}
            currentUser={currentUser}
            currentRoom={currentRoom}
          />
        </div>
      </div>

      <div className={styles.inputArea}>
        <form onSubmit={handleSendMessage} className={styles.inputForm}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="輸入訊息..."
            className={styles.messageInput}
          />
          <EventButton type="submit" className={styles.sendButton}>
            發送
          </EventButton>
        </form>
      </div>

      <CreateRoomForm
        show={showCreateRoom}
        onHide={() => setShowCreateRoom(false)}
        currentUser={currentUser}
      />
    </Container>
  )
}

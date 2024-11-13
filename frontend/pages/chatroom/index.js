import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ChatRoom from '@/components/chatroom/ChatRoom'
import CreateRoomForm from '@/components/chatroom/CreateRoomForm'
import UserList from '@/components/chatroom/UserList'
import EventButton from '@/components/event/EventButton'
import styles from '@/styles/Chat.module.css'

export default function Chat() {
  // 初始化時給一個空數組
  const [users, setUsers] = useState([])
  const [rooms, setRooms] = useState([])
  const [ws, setWs] = useState(null)
  const [messages, setMessages] = useState([])
  const [currentRoom, setCurrentRoom] = useState(null)
  const [currentUser, setCurrentUser] = useState(1)
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [message, setMessage] = useState('')

  // 使用 useEffect 來設置初始數據
  useEffect(() => {
    // 模擬從 API 獲取數據
    setUsers([
      { id: 1, name: 'User 1', online: true },
      { id: 2, name: 'User 2', online: false },
      // 更多使用者...
    ])

    setRooms([
      { id: 1, name: '公共聊天室', memberCount: 5 },
      { id: 2, name: '遊戲討論', memberCount: 3 },
      // 更多房間...
    ])
  }, [])

  const handlePrivateChat = (userId) => {
    setCurrentRoom(null)
    // 這裡可以添加開啟私人聊天的邏輯
    console.log('Opening private chat with user:', userId)
  }

  const handleRoomSelect = (roomId) => {
    setCurrentRoom(roomId)
    // 這裡可以添加切換房間的邏輯
    console.log('Switching to room:', roomId)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    ws?.send(
      JSON.stringify({
        type: 'message',
        fromID: currentUser,
        message: message,
        roomID: currentRoom,
      })
    )

    setMessage('')
  }

  return (
    <Container fluid className={styles.container}>
      <h3 className={styles.chatTitle}>聊天室</h3>
      <div className={styles.chatLayout}>
        {/* 左側使用者列表 */}
        <UserList
          users={users}
          rooms={rooms}
          currentUser={currentUser}
          currentRoom={currentRoom}
          onPrivateChat={handlePrivateChat}
          onRoomSelect={handleRoomSelect}
        />

        {/* 右側聊天區域 */}
        <div className={styles.chatContent}>
          <ChatRoom
            messages={messages}
            currentUser={currentUser}
            currentRoom={currentRoom}
            ws={ws}
          />
        </div>
      </div>

      {/* 底部輸入區域 */}
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

      {/* 新增聊天室的 Modal */}
      <CreateRoomForm
        show={showCreateRoom}
        onHide={() => setShowCreateRoom(false)}
        ws={ws}
        currentUser={currentUser}
      />
    </Container>
  )
}

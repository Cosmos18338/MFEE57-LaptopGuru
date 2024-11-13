import { useState } from 'react'
import { Form } from 'react-bootstrap'
import EventButton from '@/components/event/EventButton'
import styles from '@/styles/Chat.module.css'

export default function ChatRoom({ messages, currentUser, currentRoom, ws }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    ws.send(
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
    <div className={styles.chatContainer}>
      {/* 訊息顯示區域 */}
      <div className={styles.messagesContainer}>
        {messages
          .filter((msg) =>
            currentRoom ? msg.roomID === currentRoom : !msg.roomID
          )
          .map((msg, index) => (
            <div
              key={index}
              className={`${styles.messageItem} ${
                msg.fromID === currentUser ? styles.own : ''
              }`}
            >
              <div className={styles.messageContent}>
                <div className={styles.messageHeader}>
                  {msg.fromID === currentUser ? '你' : msg.fromID}
                </div>
                <div className={styles.messageText}>{msg.content}</div>
                <div className={styles.messageTime}>
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* 輸入區域 */}
      <div className={styles.inputContainer}>
        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <div className={styles.inputWrapper}></div>
        </Form>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Form } from 'react-bootstrap'
import EventButton from '@/components/event/EventButton'
import styles from '@/styles/Chat.module.css'
import websocketService from '@/services/websocketService'

export default function ChatRoom({ messages, currentUser, currentRoom }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
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
    <div className={styles.chatContainer}>
      {/* 訊息顯示區域 */}
      <div className={styles.messagesContainer}>
        {messages
          .filter((msg) => msg.roomID === currentRoom)
          .map((msg, index) => (
            <div
              key={msg.id || index}
              className={`${styles.messageItem} ${
                msg.fromID === currentUser ? styles.own : ''
              }`}
            >
              <div className={styles.messageContent}>
                <div className={styles.messageHeader}>
                  {msg.fromID === currentUser
                    ? '你'
                    : msg.senderName || msg.fromID}
                </div>
                <div className={styles.messageText}>{msg.content}</div>
                <div className={styles.messageTime}>
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

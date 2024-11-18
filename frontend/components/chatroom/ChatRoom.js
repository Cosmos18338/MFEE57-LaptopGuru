import { useRef, useEffect, useState, useCallback } from 'react'
import styles from '@/styles/Chat.module.css'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import Image from 'next/image'
import websocketService from '@/services/websocketService'

export default function ChatRoom({ currentUser, currentRoom }) {
  const [messages, setMessages] = useState([])
  const messageListRef = useRef(null)
  const defaultAvatar = 'http://localhost:3005/uploads/default-avatar.png'

  const scrollToBottom = useCallback(() => {
    if (!messageListRef.current) return
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight
  }, [])

  const handleNewMessage = useCallback(
    (data) => {
      if (data.room_id === currentRoom || data.roomId === currentRoom) {
        setMessages((prev) => {
          const messageExists = prev.some(
            (msg) =>
              msg.id === data.id ||
              (msg.created_at === data.created_at &&
                msg.sender_id === data.sender_id)
          )

          if (messageExists) return prev

          const newMessages = [...prev, data].sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          )

          requestAnimationFrame(scrollToBottom)
          return newMessages
        })
      }
    },
    [currentRoom, scrollToBottom]
  )

  const handleSystemMessage = useCallback(
    (data) => {
      if (data.room_id === currentRoom || data.roomId === currentRoom) {
        setMessages((prev) => {
          // 解析系統訊息
          let messageContent = data.content || data.message

          try {
            if (
              typeof messageContent === 'string' &&
              messageContent.startsWith('{')
            ) {
              const parsedContent = JSON.parse(messageContent)
              messageContent = parsedContent.content
            }
          } catch (e) {
            // 如果解析失敗，使用原始內容
          }

          // 清理訊息內容
          messageContent = messageContent
            .replace(/^{/, '')
            .replace(/}$/, '')
            .replace(/"type":"system",/, '')
            .replace(/"content":/, '')
            .replace(/"/g, '')
            .replace(/使用者/, '')
            .trim()

          const newMessage = {
            id: data.id || `system-${Date.now()}`,
            type: 'system',
            isSystem: true,
            content: messageContent,
            created_at: data.created_at || new Date().toISOString(),
          }

          // 檢查訊息是否已存在
          const exists = prev.some(
            (msg) =>
              msg.id === newMessage.id ||
              (msg.content === newMessage.content &&
                msg.created_at === newMessage.created_at)
          )

          if (exists) return prev

          requestAnimationFrame(scrollToBottom)
          return [...prev, newMessage]
        })
      }
    },
    [currentRoom, scrollToBottom]
  )

  const handleRoomJoined = useCallback(
    (data) => {
      if (data.roomId === currentRoom && Array.isArray(data.messages)) {
        setMessages((prev) => {
          const existingIds = new Set(prev.map((msg) => msg.id))
          const newMessages = data.messages
            .filter((msg) => !existingIds.has(msg.id))
            .map((msg) => ({
              ...msg,
              isSystem: msg.is_system,
              content: msg.content || msg.message,
            }))

          const combinedMessages = [...prev, ...newMessages].sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          )

          requestAnimationFrame(scrollToBottom)
          return combinedMessages
        })
      }
    },
    [currentRoom, scrollToBottom]
  )

  const handleMemberUpdate = useCallback(
    (data) => {
      if (data.roomId === currentRoom) {
        setMessages((prev) => {
          const newMessage = {
            id: `system-${Date.now()}`,
            type: 'system',
            content: data.content,
            created_at: data.timestamp || new Date().toISOString(),
            isSystem: true,
          }

          requestAnimationFrame(scrollToBottom)
          return [...prev, newMessage]
        })
      }
    },
    [currentRoom, scrollToBottom]
  )

  useEffect(() => {
    if (currentUser) {
      websocketService.connect(currentUser)
    }

    if (currentRoom) {
      setMessages([])
      websocketService.send({
        type: 'joinRoom',
        roomID: currentRoom,
        fromID: currentUser,
      })
    }

    websocketService.on('message', handleNewMessage)
    websocketService.on('system', handleSystemMessage)
    websocketService.on('roomJoined', handleRoomJoined)
    websocketService.on('memberJoined', handleMemberUpdate)
    websocketService.on('memberLeft', handleMemberUpdate)

    return () => {
      if (currentRoom) {
        websocketService.send({
          type: 'leaveRoom',
          roomID: currentRoom,
          fromID: currentUser,
        })
      }

      websocketService.off('message', handleNewMessage)
      websocketService.off('system', handleSystemMessage)
      websocketService.off('roomJoined', handleRoomJoined)
      websocketService.off('memberJoined', handleMemberUpdate)
      websocketService.off('memberLeft', handleMemberUpdate)
    }
  }, [
    currentUser,
    currentRoom,
    handleNewMessage,
    handleSystemMessage,
    handleRoomJoined,
    handleMemberUpdate,
  ])

  const renderMessage = (msg) => {
    const isOwnMessage = msg.sender_id === currentUser

    if (msg.isSystem || msg.type === 'system') {
      const content = msg.content || msg.message
      if (!content) return null

      // 清理並格式化系統訊息
      let displayContent = content
      try {
        if (typeof content === 'string' && content.startsWith('{')) {
          const parsed = JSON.parse(content)
          displayContent = parsed.content || content
        }
      } catch (e) {
        displayContent = content
      }

      // 移除多餘的符號和格式
      displayContent = displayContent
        .replace(/^{/, '')
        .replace(/}$/, '')
        .replace(/"type":"system",/, '')
        .replace(/"content":/, '')
        .replace(/"/g, '')
        .replace(/使用者/, '')
        .trim()

      return <div className={styles.systemMessage}>{displayContent}</div>
    }

    return (
      <div
        className={`${styles.messageContainer} ${
          isOwnMessage ? styles.ownMessage : ''
        }`}
      >
        {!isOwnMessage && (
          <div className={styles.senderInfo}>
            <div className={styles.avatarWrapper}>
              <Image
                src={msg.sender_image || defaultAvatar}
                alt={msg.sender_name || '未知用戶'}
                width={32}
                height={32}
                className={styles.avatarImage}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = defaultAvatar
                }}
              />
            </div>
            <span className={styles.senderName}>
              {msg.sender_name || '未知用戶'}
            </span>
          </div>
        )}
        <div className={styles.messageContent}>
          <div className={styles.messageText}>{msg.message}</div>
          <div className={styles.messageTime}>
            {format(new Date(msg.created_at), 'HH:mm', {
              locale: zhTW,
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer} ref={messageListRef}>
        {messages.map((msg) => {
          const messageKey = msg.id
            ? `msg-${msg.id}`
            : `${msg.isSystem ? 'system' : 'msg'}-${msg.created_at}-${
                msg.sender_id || 'system'
              }`

          return (
            <div key={messageKey} className={styles.messageWrapper}>
              {renderMessage(msg)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

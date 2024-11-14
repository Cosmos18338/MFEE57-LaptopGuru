import { useState, useEffect } from 'react'
import styles from '@/styles/Chat.module.css'
import { Nav, ListGroup } from 'react-bootstrap'
import Image from 'next/image'

export default function UserList({
  users,
  rooms,
  currentUser,
  currentRoom,
  onPrivateChat,
  onRoomSelect,
}) {
  const [showTab, setShowTab] = useState('group') // 預設顯示群組訊息
  const [myPrivateChats, setMyPrivateChats] = useState([]) // 進行中的私人聊天
  const [myGroups, setMyGroups] = useState([]) // 使用者的群組

  // 獲取使用者的私人聊天和群組
  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        // 獲取私人聊天記錄
        const chatsResponse = await fetch(
          'http://localhost:3005/api/chat/messages/private',
          {
            credentials: 'include',
          }
        )
        const chatsData = await chatsResponse.json()

        if (chatsData.status === 'success') {
          // 找出有私訊紀錄的使用者
          const chatUsers = new Set()
          chatsData.data.forEach((msg) => {
            if (msg.senderId === currentUser) {
              chatUsers.add(msg.recipientId)
            } else if (msg.recipientId === currentUser) {
              chatUsers.add(msg.senderId)
            }
          })

          // 取得這些使用者的資料
          const activeUsers = users.filter((user) =>
            chatUsers.has(user.user_id)
          )
          setMyPrivateChats(activeUsers)
        }

        // 獲取使用者群組
        const groupsResponse = await fetch(
          'http://localhost:3005/api/chat/user/groups',
          {
            credentials: 'include',
          }
        )
        const groupsData = await groupsResponse.json()

        if (groupsData.status === 'success') {
          setMyGroups(groupsData.data)
        }
      } catch (error) {
        console.error('獲取聊天資料失敗:', error)
      }
    }

    if (currentUser) {
      fetchUserChats()
    }
  }, [currentUser, users])

  const handleTabChange = (tab) => {
    setShowTab(tab)
    if (tab === 'private') {
      onRoomSelect(null)
    }
  }

  return (
    <div className={styles.userList}>
      <div className={styles.userListHeader}>
        <h4>聊天列表</h4>
      </div>

      <Nav variant="tabs" className={styles.chatTabs}>
        <Nav.Item>
          <Nav.Link
            className={styles.chatTab}
            active={showTab === 'private'}
            onClick={() => handleTabChange('private')}
          >
            私人訊息
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={styles.chatTab}
            active={showTab === 'group'}
            onClick={() => handleTabChange('group')}
          >
            群組訊息
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className={styles.userListContent}>
        {showTab === 'private' ? (
          // 私人訊息列表 - 只顯示已有聊天記錄的使用者
          <div className={styles.listSection}>
            {myPrivateChats.length > 0 ? (
              <ListGroup>
                {myPrivateChats.map((user) => (
                  <ListGroup.Item
                    key={user.user_id}
                    action
                    onClick={() => onPrivateChat(user.user_id)}
                    className={styles.userItem}
                  >
                    <div className={styles.userAvatar}>
                      {user.image_path ? (
                        <Image
                          src={user.image_path}
                          alt={user.name}
                          width={24}
                          height={24}
                          className={styles.userImage}
                        />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {user.name?.[0] || '?'}
                        </div>
                      )}
                    </div>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>
                        {user.name || '未命名用戶'}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className={styles.emptyList}>目前沒有進行中的對話</div>
            )}
          </div>
        ) : (
          // 群組列表 - 顯示使用者參與的群組
          <div className={styles.listSection}>
            {myGroups.length > 0 ? (
              <ListGroup>
                {myGroups.map((group) => (
                  <ListGroup.Item
                    key={group.chatRoomId}
                    action
                    active={currentRoom === group.chatRoomId}
                    onClick={() => onRoomSelect(group.chatRoomId)}
                    className={styles.roomItem}
                  >
                    <div className={styles.roomAvatar}>
                      {group.image ? (
                        <Image
                          src={group.image}
                          alt={group.name}
                          width={24}
                          height={24}
                          className={styles.roomImage}
                        />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {group.name?.[0] || 'G'}
                        </div>
                      )}
                    </div>
                    <div className={styles.roomInfo}>
                      <div className={styles.roomName}>{group.name}</div>
                      <div className={styles.roomMembers}>
                        {group.memberCount}/{group.maxMembers} 位成員
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className={styles.emptyList}>您目前沒有參與任何群組</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

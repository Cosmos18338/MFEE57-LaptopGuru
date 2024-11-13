import { ListGroup, Nav } from 'react-bootstrap'
import styles from '@/styles/Chat.module.css'

export default function UserList({
  users,
  rooms,
  currentUser,
  currentRoom,
  onPrivateChat,
  onRoomSelect,
}) {
  return (
    <div className={styles.userList}>
      <div className={styles.userListHeader}>
        <h4>聊天列表</h4>
      </div>

      {/* 分頁導航 */}
      <Nav variant="tabs" className={styles.chatTabs}>
        <Nav.Item>
          <Nav.Link
            className={styles.chatTab}
            active={!currentRoom}
            onClick={() => onRoomSelect(null)}
          >
            私人訊息
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={styles.chatTab}
            active={currentRoom}
            onClick={() => onRoomSelect(currentRoom || rooms[0]?.id)}
          >
            群組訊息
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className={styles.userListContent}>
        {/* 根據當前選擇的分頁顯示不同內容 */}
        {!currentRoom ? (
          // 私人訊息列表
          <ListGroup>
            {users
              .filter((user) => user.id !== currentUser)
              .map((user) => (
                <ListGroup.Item
                  key={user.id}
                  action
                  onClick={() => onPrivateChat(user.id)}
                  className={styles.userItem}
                >
                  <div className={styles.userAvatar}>{user.name[0]}</div>
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>{user.name}</div>
                    <div
                      className={`${styles.userStatus} ${
                        user.online ? styles.online : styles.offline
                      }`}
                    >
                      {user.online ? '在線' : '離線'}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        ) : (
          // 群組訊息列表
          <ListGroup>
            {rooms.map((room) => (
              <ListGroup.Item
                key={room.id}
                action
                active={currentRoom === room.id}
                onClick={() => onRoomSelect(room.id)}
                className={styles.roomItem}
              >
                <div className={styles.roomAvatar}>#</div>
                <div className={styles.roomInfo}>
                  <div className={styles.roomName}>{room.name}</div>
                  <div className={styles.roomMembers}>
                    {room.memberCount || 0} 位成員
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </div>
  )
}

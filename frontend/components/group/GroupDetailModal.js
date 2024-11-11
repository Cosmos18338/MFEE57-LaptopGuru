import React, { useEffect, useState } from 'react'
import styles from './GroupDetailModal.module.css'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// 修改預設頭像路徑
const DEFAULT_AVATAR = '/images/group/default-avatar.png'

const GroupDetailModal = ({ onClose, groupData, onJoin }) => {
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetchGroupMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupData.id])

  const fetchGroupMembers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/group/${groupData.id}`
      )
      const data = await response.json()
      console.log('Received members data:', data)

      if (data.status === 'success') {
        setMembers(data.data.group.members || [])
      }
    } catch (error) {
      console.error('獲取群組成員失敗:', error)
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return DEFAULT_AVATAR
    }

    try {
      const cleanPath = imagePath.replace(/['"]/g, '').trim()

      if (cleanPath.startsWith('data:image')) {
        const base64Part = cleanPath.split(',')[1]
        return `data:image/png;base64,${base64Part}`
      }

      if (cleanPath.includes('base64,')) {
        const base64Content = cleanPath.split('base64,')[1]
        return `data:image/png;base64,${base64Content}`
      }

      if (/^[A-Za-z0-9+/=]+$/.test(cleanPath)) {
        return `data:image/png;base64,${cleanPath}`
      }

      if (cleanPath.startsWith('http')) {
        return cleanPath
      }

      return `http://localhost:3005${
        cleanPath.startsWith('/') ? '' : '/'
      }${cleanPath}`
    } catch (error) {
      console.error('Image processing error:', {
        error,
        originalPath: imagePath,
      })
      return DEFAULT_AVATAR
    }
  }

  const handleImageError = (member, e) => {
    console.error('Image load failed:', {
      member: member.name,
      imagePath: member.image_path,
      processedUrl: e.target.src,
    })
    e.target.src = DEFAULT_AVATAR
    e.target.onerror = null
  }

  if (loading) {
    return <div>載入中...</div>
  }

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClose()
        }
      }}
    >
      <div className={styles.customModal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="關閉視窗"
        >
          <X size={24} />
        </button>

        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>活動詳情</h3>

          <div className={styles.descriptionSection}>
            <h4 className={styles.eventName}>{groupData.title}</h4>
            <p className={styles.description}>{groupData.description}</p>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>創建者</span>
              <span className={styles.infoValue}>{groupData.creator_name}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>活動時間</span>
              <span className={styles.infoValue}>
                {new Date(groupData.group_time).toLocaleString()}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>需求人數</span>
              <span className={styles.infoValue}>
                {groupData.currentMembers}/{groupData.maxMembers}
              </span>
            </div>
          </div>

          {members.length > 0 && (
            <div className={styles.usersSection}>
              <button className={styles.navButton} type="button">
                <ChevronLeft className={styles.navIcon} />
              </button>

              <div className={styles.usersContainer}>
                {members.map((member) => {
                  const imageUrl = getImageUrl(member.image_path)
                  console.log(`Rendering image for ${member.name}:`, imageUrl)

                  return (
                    <div
                      key={member.user_id}
                      className={styles.userAvatarWrapper}
                    >
                      <img
                        src={imageUrl}
                        alt={member.name}
                        className={styles.userAvatar}
                        onError={(e) => handleImageError(member, e)}
                      />
                      <div className={styles.userNameTooltip}>
                        {member.name}
                      </div>
                    </div>
                  )
                })}
              </div>

              <button className={styles.navButton} type="button">
                <ChevronRight className={styles.navIcon} />
              </button>
            </div>
          )}

          <button
            className={styles.joinButton}
            onClick={onJoin}
            disabled={groupData.currentMembers >= groupData.maxMembers}
          >
            {groupData.currentMembers >= groupData.maxMembers
              ? '人數已滿'
              : '申請參加'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupDetailModal

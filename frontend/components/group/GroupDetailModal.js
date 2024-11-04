import React from 'react';
import styles from './GroupDetailModal.module.css';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const GroupDetailModal = ({ onClose, groupData, onJoin }) => {
  // 只在點擊背景時關閉 Modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
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
              <span className={styles.infoLabel}>活動日期</span>
              <span className={styles.infoValue}>{groupData.date}</span>
            </div>
            
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>需求人數</span>
              <span className={styles.infoValue}>
                {groupData.currentMembers}/{groupData.maxMembers}
              </span>
            </div>
          </div>

          <div className={styles.usersSection}>
            <button className={styles.navButton}>
              <ChevronLeft className={styles.navIcon} />
            </button>
            
            <div className={styles.usersContainer}>
              {groupData.users.map((user) => (
                <div key={user.id} className={styles.userAvatarWrapper}>
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className={styles.userAvatar}
                  />
                  <div className={styles.userNameTooltip}>
                    {user.name}
                  </div>
                </div>
              ))}
            </div>
            
            <button className={styles.navButton}>
              <ChevronRight className={styles.navIcon} />
            </button>
          </div>

          <button 
            className={styles.joinButton}
            onClick={onJoin}
            disabled={groupData.currentMembers >= groupData.maxMembers}
          >
            {groupData.currentMembers >= groupData.maxMembers ? '人數已滿' : '申請參加'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailModal;
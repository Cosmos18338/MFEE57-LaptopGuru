import React, { useState } from 'react';
import styles from './GroupJoin.module.css';
import { X, User, MessageSquare } from 'lucide-react';
// 要記得安裝 lucide-react

const GroupJoin = ({ onClose, groupData }) => {
  const [formData, setFormData] = useState({
    gameId: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      groupId: groupData.id,
      ...formData
    });
    onClose();
  };

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
          <h2 className={styles.modalTitle}>申請加入揪團</h2>
          <h3 className={styles.eventTitle}>{groupData.title}</h3>

          <form onSubmit={handleSubmit} className={styles.formSection}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <User size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  name="gameId"
                  value={formData.gameId}
                  onChange={handleChange}
                  placeholder="遊戲ID"
                  className={styles.input}
                  required
                />
              </label>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <MessageSquare size={16} className={styles.inputIcon} />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="自我介紹"
                  className={styles.textarea}
                  rows={4}
                  required
                />
              </label>
            </div>

            <button type="submit" className={styles.submitButton}>
              送出申請
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupJoin;
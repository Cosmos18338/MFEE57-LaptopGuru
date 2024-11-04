import React, { useState, useEffect } from 'react';
import styles from '@/styles/laptopLogin.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineEmail, MdLockOutline, MdArrowForward } from "react-icons/md";

export default function PurpleLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // ... 相同的提交邏輯
    setIsLoading(false);
  };

  return (
    <div className={styles.gradientBg}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h4>Welcome to</h4>
          <h3 className={styles.guruLaptop}>GURU Laptop</h3>
          
          {/* 系統指示燈 */}
          <div className={styles.indicators}>
            <div className={styles.indicator}></div>
            <div className={styles.indicator}></div>
            <div className={styles.indicator}></div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.cameraArea}>
            <div className={styles.camera}>
              <div className={styles.light}></div>
            </div>
          </div>

          <div className={styles.tabs}>
            <Link href="/login" className={styles.active}>Login</Link>
            <span>|</span>
            <Link href="/signup">Sign Up</Link>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>帳號(信箱)</label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MdOutlineEmail className={styles.icon} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>密碼</label>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MdLockOutline className={styles.icon} />
              </div>
            </div>

            <div className={styles.passwordRule}>
              密碼請至少輸入6個字元、最多20字元，需要包含大寫字母、
              小寫字母、數字、特殊符號。會再經過加密
            </div>

            <button 
              type="submit" 
              className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
            >
              送出 <MdArrowForward />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
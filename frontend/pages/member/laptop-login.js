import React, { useState, useEffect } from 'react';
import styles from '@/styles/laptopLogin.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineEmail, MdLockOutline, MdArrowForward } from "react-icons/md";

export default function LaptopLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  
  useEffect(() => {
    setIsOpening(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch(
        `http://localhost:3005/api/auth/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password')
          })
        }
      );
      const result = await response.json();
      if (result.status === 'success') {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('登入錯誤:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.laptop}>
        <div className={`${styles.screen} ${isOpening ? styles.opened : ''}`}>
          {/* 攝像頭區域 */}
          <div className={styles.camera}>
            <div className={styles.cameraLens}>
              <div className={styles.cameraLight}></div>
            </div>
          </div>

          {/* 登入表單 */}
          <div className={styles.content}>
            <h1 className={styles.title}>GURU Laptop</h1>
            
            <div className={styles.indicators}>
              <div className={styles.indicator}></div>
              <div className={styles.indicator}></div>
              <div className={styles.indicator}></div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                <MdOutlineEmail className={styles.icon} />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <MdLockOutline className={styles.icon} />
              </div>

              <button type="submit" className={styles.submitButton}>
                Login <MdArrowForward className={styles.arrowIcon} />
              </button>
            </form>

            <div className={styles.links}>
              <Link href="/login">Login</Link> |
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
        
        {/* 鍵盤底座 */}
        <div className={styles.base}>
          <div className={styles.touchpad}></div>
        </div>
      </div>
    </div>
  );
}
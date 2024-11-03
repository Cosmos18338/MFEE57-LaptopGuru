import React, { useState } from 'react';
import styles from '@/styles/laptopLogin.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineEmail, MdLockOutline, MdArrowForward } from "react-icons/md";

export default function NotebookLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... 相同的提交邏輯
  };

  return (
    <div className={styles.container}>
      <div className={styles.notebook}>
        {/* 裝飾性釘裝 */}
        <div className={styles.binding}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.spiral}></div>
          ))}
        </div>

        <div className={styles.page}>
          <div className={styles.header}>
            <div className={styles.dots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1>GURU Notes</h1>
          </div>

          <div className={styles.lines}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Email:</label>
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
                <label>Password:</label>
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

              <button type="submit" className={styles.submitButton}>
                Login <MdArrowForward />
              </button>
            </form>

            <div className={styles.links}>
              <Link href="/login">Login</Link> |
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
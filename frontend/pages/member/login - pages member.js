import React from 'react'
import styles from '@/styles/signUpForm.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LogIn(props) {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    try {
      const response = await fetch(
        `http://localhost:3005/api/login`,
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
      )
      const result = await response.json()
      
      if (result.status === 'success') {
        console.log("登入前端接上後端成功")
        // 可以添加登入成功後的導向
        router.push('/dashboard')
      } else {
        // 處理錯誤情況
        console.log(result.message)
      }
    } catch (error) {
      console.error('無法取得資料:', error)
    }
  }

  return (
    <div className={styles['gradient-bg']}>
      <div className="row p-5 gx-5">
        <div className={`${styles.left} col`}>
          <h4 className={styles.white}>Welcome to</h4>
          <br />
          <h3 className={`${styles.white} ${styles['guru-laptop']}`}>
            GURU Laptop
          </h3>
        </div>
        <div className={`${styles.right} col`}>
          <div className={`${styles.tabs} d-flex justify-content-between`}>
            <h7 className={`${styles.white} ${styles.hover}`}>
              <Link href="/signup-test/login">Log in</Link>
            </h7>
            <h7 className={styles.white}>|</h7>
            <h7 className={`text-white ${styles.hover}`}>
              <Link href="/member/signup-2">Sign up</Link>
            </h7>
          </div>
          <form 
            className="mt-5 position-relative d-flex justify-content-center align-items-center" 
            onSubmit={handleSubmit}
          >
            <div className="inputs position-relative">
              <label htmlFor="email" className={styles.white}>
                帳號(信箱)
              </label>
              <input
                type="email"
                className={`${styles['custom-input']} form-control`}
                name="email"
                required  // 添加必填
              />
              <label
                htmlFor="inputPassword5"
                className={`form-label ${styles.white} ${styles['custom-label']} mt-5`}
              >
                密碼
              </label>
              <input
                type="password"
                id="inputPassword5"
                name="password"  // 添加 name
                className={`form-control ${styles['custom-input']}`}
                aria-describedby="passwordHelpBlock"
                required  // 添加必填
              />
              <div
                id="passwordHelpBlock"
                className={`form-text ${styles.white} p-5`}
              >
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </div>
              <button className={`text-white ${styles.button}`} type="submit">
                送出
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
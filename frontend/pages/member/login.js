import React, { useState } from 'react'
import styles from '@/styles/signUpForm.module.scss'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import { MdOutlineEmail, MdLockOutline, MdArrowForward } from 'react-icons/md'
import { useJumpingLetters } from '@/hooks/jumping-letters-hook'

export default function LogIn(props) {
  const [showpassword, setShowpassword] = useState(false)
  const { renderJumpingText } = useJumpingLetters()
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ error: ' ' })

  // 以上還是不太確定為什麼需要用狀態管理。登入頁不就送出帳密比對主要這功能就好了嗎？
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    try {
      const response = await fetch(`http://localhost:3005/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      })
      const result = await response.json()

      if (result.status === 'success') {
        console.log('登入前端接上後端成功')
        // 可以添加登入成功後的導向

        router.push('/dashboard')
      } else {
        // 處理錯誤情況
        setErrors({
          message: result.message,
        })
      }
    } catch (error) {
      console.error('無法取得資料:', error)
      Swal.fire({
        title: '登入失敗',
        text: '連接伺服器有問題',
        icon: 'error',
        confirmButtonText: '確定',
        confirmButtonColor: '#3085d6',
      })
    }
  }

  return (
    <div className={styles['gradient-bg']}>
      <div className="row p-5 gx-5">
        <div className={`${styles.left} col`}>
          <h4 className={styles.white}>
            {renderJumpingText('Welcome to', 'welcome-text')}
          </h4>
          <br />
          <h3 className={`text-white ${styles['guru-laptop']}`}>
            {renderJumpingText('Laptop Guru', 'company-name')}
          </h3>
        </div>
        <div className={`${styles.right} col`}>
          <div className={`${styles.tabs} d-flex justify-content-between`}>
            <Link
              className={` ${styles.hover} text-decoration-none text-white`}
              href="/member/login"
            >
              登入Log in
            </Link>
            <span className="text-white">|</span>
            <Link
              className={`${styles.hover} text-decoration-none text-white`}
              href="/member/signup"
            >
              註冊Sign Up
            </Link>
          </div>
          <form
            className="mt-5 position-relative d-flex justify-content-center align-items-center"
            onSubmit={handleSubmit}
          >
            <div className="inputs position-relative">
              <div className="position-relative">
                <label htmlFor="email" className={`form-label text-white`}>
                  帳號(信箱)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  className={`form-control ${styles.inputs}`}
                  name="email"
                  required // 添加必填
                />
                <MdOutlineEmail
                  className={`${styles['input-icon']}`}
                  size={22}
                  style={{ color: '#E0B0FF' }} // 使用淺粉紫色
                />
              </div>

              <div className="position-relative">
                <label htmlFor="password" className={`form-label text-white`}>
                  密碼
                </label>
                <input
                  type={showpassword ? 'text' : 'password'}
                  value={password}
                  autocomplete="new-password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  onClick={() => {
                    setShowpassword((prev) => {
                      console.log('changing showpassword to:', !prev) // 檢查狀態更新
                      return !prev
                    })
                  }}
                  id="password"
                  name="password" // 添加 name
                  className={`form-control ${styles.inputs}`}
                  required // 添加必填
                />
                <MdLockOutline
                  className={`${styles['input-icon']}`}
                  size={22}
                  style={{ color: '#E0B0FF', cursor: 'pointer' }}
                />
              </div>
              <div id="Error_message" className={`form-text text-white p-5`}>
                {errors.message && (
                  <div className="error">{errors.message}</div>
                )}
              </div>
              <button
                onClick={() => {
                  login
                }}
                className={`text-white ${styles.button} ${styles.hover}`}
                type="submit"
              >
                送出
                <MdArrowForward
                  size={20}
                  className={styles['button-icon']}
                  style={{ marginLeft: '8px' }}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .error {
          color: red;
          font-size: 16px;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  )
}

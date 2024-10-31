import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/signUpForm.module.scss'
/* eslint-disable */
import validator from 'validator'
import isEmail from 'validator/lib/isEmail'
import Link from 'next/link'

// 代替使用者去做聚焦的操作，所以被偵測到SEO會扣分。在新的網站中比較沒有提供這個功能。
export default function Signin(props) {
  // 狀態為物件，屬性對應到表單的欄位名稱
  const [user, setUser] = useState({
    name: '111',
    email: '',
    username: '',
    pwd: '',
    ConfirmPwd: '',
    phone: '',
    gender: '',
    agree: false, // checkbox 同意會員註冊條款
  })
  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    pwd: '',
    confirmPwd: '',
    phone: '',
    gender: '',
    agree: '', // 錯誤訊息用字串
  })

  // checkbox 呈現密碼用
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)

  // 多欄位共用事件函式
  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target
    // 若欄位是 checkbox，使用 checked 狀態，否則使用 value
    if (e.target.name === 'agree') {
      nextUser = { ...user, agree: e.target.checked }
    }
    setUser({
      ...user,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault() // 阻止表單自動提交
    // 簡單驗證
    // 表單檢查--start--
    // 1.建立一個全新的錯誤訊息用物件
    const newErrors = {
      name: '',
      email: '',
      username: '',
      pwd: '',
      confirmPwd: '',
      phone: '',
      gender: '',
      agree: '',
    }

    // 2.開始做個欄位的表單檢查，如果有錯誤訊息就加到newErrors
    if (!user.name) {
      newErrors.name = '姓名為必填'
    }
    if (!user.email) {
      newErrors.email = 'Email為必填'
    }
    if (!user.agree) {
      newErrors.agree = '請先同意會員註冊條款'
    }
    if (!user.confirmPwd) {
      newErrors.confirmPwd = '確認密碼為必填'
    }
    if (user.pwd !== user.confirmPwd) {
      newErrors.pwd = '密碼與確認密碼需要相同'
    }
    if (user.pwd !== user.confirmPwd) {
      setErrors({ ...errors, confirmPwd: '密碼不匹配' })
    } else {
      // 處理表單提交邏輯，例如發送資料到伺服器
      console.log('表單資料:', user)
    }
    // 表單檢查--end--
    // 3.呈現錯誤訊息
    setErrors(newErrors)
    const hasErrors = Object.values(newErrors).some((v) => v)
    // some有值(錯誤訊息)的話會是true, 如果是空字串會是falsy
    // 有錯誤，部送到伺服器，跳出此函式
    if (hasErrors) {
      return
    }
    alert('送到伺服器')
  }

  return (
    <>
      <div className={styles['gradient-bg']}>
      <Image 
    src="/bgi/signup_bgi.png"
    alt="background"
    layout="fill"
    objectFit="cover"
    quality={100}
  /> 
          {/* <div className={`${styles.blur} text-white`}>blur</div> */}
          <div className="row d-flex justify-content-center align-items-center gx-5">
            <div className={`${styles.left} col-4`}>
              <h4 className={`text-white ${styles.welcome}`}>Welcome to</h4>
              <br />
              <h3 className={`text-white ${styles['guru-laptop']}`}>
                GURU Laptop
              </h3>
            </div>
            <div className={`${styles.right} col-sm-12 col-md-4`}>

              <div className={`${styles.tabs} d-flex justify-content-between`}>
              <h7 className={`${styles.white} ${styles.hover}`}>
                <Link href="/member/login-2">登入Log in</Link>
              </h7>
              <h5 className={styles.white}>|</h5>
              <h7 className={`${styles.white} ${styles.hover}`}>
              <Link href="/member/Sign up">註冊Sign Up</Link>
              </h7>
            </div>
              <div className="justify-content-center align-items-center">
                <form className="mt-3" onSubmit={handleSubmit}>
                  <div className={styles['inputs-group']}>
                    <span className="error">{errors.email}</span>
                    <label htmlFor="email" className={styles.white}>
                      <h9> 帳號(信箱)</h9>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${styles.inputs}`}
                      name="email"
                      value={user.email}
                      onChange={handleFieldChange}
                      autofocus
                    />
                    {"  "}
                    <span className="error">{errors.pwd}</span>{"        "}
                    <label
                      htmlFor="pwd"
                      className={`form-label text-white ${styles['custom-label']} mt-3`}
                    >
                      密碼
                    </label>
                    <input
                      name="pwd"
                      id="inputPassword"
                      className={`form-control ${styles.inputs}`}
                      type={showPwd ? 'text' : 'password'}
                      minLength={6}
                      maxLength={12}
                      value={user.pwd}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="checkbox"
                      checked={showPwd}
                      onChange={() => setShowPwd(!showPwd)}
                      // 修正這裡
                    />{' '}
                    <p className={`${styles.white} d-inline-block`}>
                      顯示密碼1
                    </p>
                    <br />
                    <span className="error">{errors.confirmPwd}</span>
                    <label
                      className={`form-label text-white ${styles['custom-label']} mt-3`}
                      htmlFor="ConfirmPwd"
                    >
                      重新輸入密碼:{'顯示密碼'}
                    </label>
                    <input
                      className={`form-control ${styles.inputs}`}
                      type={showConfirmPwd ? 'text' : 'password'}
                      name="ConfirmPwd"
                      value={user.confirmPwd}
                      onChange={handleFieldChange}
                    />
                    <input
                      type="checkbox"
                      checked={showConfirmPwd}
                      onChange={(e) => {
                        setShowConfirmPwd(!showConfirmPwd)
                      }}
                    />{' '}
                    <p className={`${styles.white} d-inline`}>顯示密碼2</p>
                    <br />
                    <label
                      className={`form-label text-white ${styles['custom-label']} mt-3`}
                      htmlFor="phone"
                    >
                      手機
                    </label>
                    <input
                      className={`form-control ${styles.inputs}`}
                      type="text"
                      name="phone"
                    />
                    <label
                      className={`form-label text-white ${styles['custom-label']} mt-3`}
                      htmlFor="birthDate"
                    >
                      生日
                    </label>
                    <input
                      className={`form-control ${styles.inputs}`}
                      type="date"
                      name="birthDate"
                    />
                    <label
                      className={`form-label text-white ${styles['custom-label']} mt-3`}
                      htmlFor="gender"
                    >
                      性別
                    </label>
                    <br />
                    <select name="gender" className={`${styles.inputs}`}>
                      <option value="女" selected>
                        請選擇
                      </option>
                      <option value="女">女</option>
                      <option value="男">男</option>
                      <option value="不透漏">不透漏</option>
                      <option value="+LGBTQ">+LGBTQ</option>
                    </select>
                    <br />
                    <input
                      type="checkbox"
                      name="agree"
                      checked={user.agree}
                      onChange={handleFieldChange}
                    />
                    <p className={`text-white d-inline-block`}>
                      我同意網站會員註冊條款
                    </p>
                    <span className="error">{errors.agree}</span>
                    <br />
                    <button type="submit" className="btn btn-primary">
                      送出
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      <style jsx>
        {`
          .error {
            color: red;
            font-size: 16px;
            height: 16px;
            letter-spacing: 3.2px;
          }
          .right{
          top: 10%vh;
          }
        `}
      </style>
    </>
  )
}

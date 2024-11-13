import styles from './member.module.css'
import Link from 'next/link'
import {useState} from 'react'
import axios from 'axios'

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const getConfirmMail=async()=>{
    try{
      console.log('輸入的 email:', email) // 檢查輸入的 email 值

      if(!email){
        setError('請輸入電子郵件地址')
        return
      }
      console.log('準備發送請求到:', `http://localhost:3005/api/forgot-password/send`)

      const response = await axios.post(
        `http://localhost:3005/api/forgot-password/send`,{email}
      )
      console.log('收到伺服器回應:', response.data) // 檢查完整回應

      if (response.data.status === 'success') {
        console.log('請求成功')
        setMessage('已發送重設密碼信件到您的信箱')
        setError('')
      }else{
        console.log('請求失敗:', response.data.message)
        setError(response.data.message || '發送失敗')
      }
    }catch(error){
      console.error('發生錯誤:', error) // 詳細記錄錯誤
      console.log('錯誤回應:', error.response?.data) // 查看錯誤回應內容
      setError(error.response?.data?.message || '發送失敗')
    }

  }
  return (
    <main className={`form-member w-100 m-auto text-center`}>
      <h2 className="text-center mb-5">重設密碼</h2>
      <p className={`text-center mb-3 ${styles['text-note']}`}>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

        輸入你的會員電子郵件地址，按下&quot;取得驗証碼&ldquo;按鈕後，我們會將密碼重設指示寄送給你。
        {/* 先讓他寄信成功 */}
      </p>
      <form>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="email"
              name='email'
              className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
              placeholder="電子郵件地址"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`${styles['error']} my-2 text-start`}>
            請輸入有效的註冊會員電子郵件地址。
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="input-group">
              {/* 我要確認這個按鈕沒有綁這個信箱 */}
              <input
                type="text"
                className={`form-control ${styles['form-control']} ${styles['invalid']} `}
                placeholder="電子郵件驗證碼"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={getConfirmMail}
              >
                取得驗証碼
              </button>
            </div>
          </div>
          <div className={`${styles['error']} my-2 text-start`}>
            請輸入驗証碼。
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="password"
              className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
              placeholder="密碼"
            />

          </div>
          <div className={`${styles['error']} my-2 text-start`}>
            請輸入新密碼。
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="password"
              className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
              placeholder="確認密碼"
            />
          </div>
          <div className={`${styles['error']} my-2 text-start`}>
            請輸入確認密碼。
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          確定
        </button>

        <div className="row mt-2">
          <p className={`${styles['notice']}`}>
            還不是會員？
            <Link href="/member/signup">加入我們</Link>。
          </p>
        </div>
      </form>
    </main>
  )
}

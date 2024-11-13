import React, { useState } from 'react'
import { useRouter } from 'next/router'
import EventButton from '@/components/event/EventButton'
import styles from '@/styles/individualRegistration.module.css'
import axios from 'axios'

const IndividualRegistration = () => {
  const router = useRouter()
  const { eventId } = router.query

  // 表單狀態管理
  const [formData, setFormData] = useState({
    participant: {
      name: '',
      gameId: '',
      phone: '',
      email: '',
    },
    agreeToTerms: false,
  })

  // 新增 loading、錯誤和成功狀態
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // 表單驗證函式
  const validateForm = () => {
    // 驗證個人資訊
    if (
      !formData.participant.name.trim() ||
      !formData.participant.gameId.trim() ||
      !formData.participant.phone.trim() ||
      !formData.participant.email.trim()
    ) {
      setError('請填寫所有必填欄位')
      return false
    }

    // 驗證電子郵件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.participant.email)) {
      setError('請輸入有效的電子郵件地址')
      return false
    }

    // 驗證電話號碼格式（台灣手機號碼格式）
    const phoneRegex = /^09\d{8}$/
    if (!phoneRegex.test(formData.participant.phone)) {
      setError('請輸入有效的手機號碼（格式：09xxxxxxxx）')
      return false
    }

    // 驗證同意條款
    if (!formData.agreeToTerms) {
      setError('請同意活動相關規定及條款')
      return false
    }

    return true
  }

  // 處理輸入變更
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setError('') // 清除錯誤訊息

    if (name.startsWith('participant.')) {
      const field = name.split('.')[1]
      setFormData((prev) => ({
        ...prev,
        participant: {
          ...prev.participant,
          [field]: value,
        },
      }))
    } else if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 驗證表單
    if (!validateForm()) {
      return
    }

    // 確認提交
    if (!window.confirm('確定要提交報名嗎？')) {
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await axios.post(
        `http://localhost:3005/api/events/${eventId}/register/individual`,
        {
          participantInfo: {
            name: formData.participant.name,
            gameId: formData.participant.gameId,
            phone: formData.participant.phone,
            email: formData.participant.email,
          },
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.data.code === 200) {
        setShowSuccess(true)
        setTimeout(() => {
          router.push(`/event/eventDetail/${eventId}`)
        }, 2000)
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || '報名失敗，請稍後再試')
      } else if (error.request) {
        setError('網路連線異常，請檢查網路狀態')
      } else {
        setError('報名失敗，請稍後再試')
      }
      console.error('Registration error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles['individualRegistration-wrapper']}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className={styles['individualRegistration-card'] + ' p-4'}>
              <h2
                className={
                  styles['individualRegistration-title'] + ' text-center mb-4'
                }
              >
                個人賽報名表單
              </h2>

              {/* 成功訊息 */}
              {showSuccess && (
                <div className="alert alert-success text-center" role="alert">
                  報名成功！即將返回活動詳情頁面...
                </div>
              )}

              {/* 錯誤訊息 */}
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h3 className={styles['individualRegistration-subtitle']}>
                    參賽者資訊
                  </h3>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="participant.name"
                        className={styles['individualRegistration-label']}
                      >
                        參賽者姓名
                      </label>
                      <input
                        type="text"
                        name="participant.name"
                        value={formData.participant.name}
                        onChange={handleInputChange}
                        className={`form-control ${styles['individualRegistration-input']}`}
                        placeholder="請輸入姓名"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="participant.gameId"
                        className={styles['individualRegistration-label']}
                      >
                        遊戲ID
                      </label>
                      <input
                        type="text"
                        name="participant.gameId"
                        value={formData.participant.gameId}
                        onChange={handleInputChange}
                        className={`form-control ${styles['individualRegistration-input']}`}
                        placeholder="請輸入遊戲ID"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="participant.phone"
                        className={styles['individualRegistration-label']}
                      >
                        聯絡電話
                      </label>
                      <input
                        type="tel"
                        name="participant.phone"
                        value={formData.participant.phone}
                        onChange={handleInputChange}
                        className={`form-control ${styles['individualRegistration-input']}`}
                        placeholder="請輸入手機號碼（格式：09xxxxxxxx）"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="participant.email"
                        className={styles['individualRegistration-label']}
                      >
                        電子郵件
                      </label>
                      <input
                        type="email"
                        name="participant.email"
                        value={formData.participant.email}
                        onChange={handleInputChange}
                        className={`form-control ${styles['individualRegistration-input']}`}
                        placeholder="請輸入電子郵件"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 同意條款 */}
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="agreeToTerms">
                      我同意活動相關規定及條款
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <EventButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '報名中...' : '提交報名'}
                  </EventButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualRegistration

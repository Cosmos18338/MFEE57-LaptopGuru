import React, { useState } from 'react'
import { useRouter } from 'next/router'
import EventButton from '@/components/event/EventButton'
import PlayerInfo from '@/components/event/PlayerInfo'
import axios from 'axios'

const EventRegistration = () => {
  const router = useRouter()
  const { eventId } = router.query

  // 表單狀態管理
  const [formData, setFormData] = useState({
    teamName: '',
    captain: {
      name: '',
      gameId: '',
      phone: '',
      email: '',
    },
    players: {
      1: { name: '', gameId: '' },
    },
    agreeToTerms: false,
  })

  // 追踪目前顯示的隊員數量
  const [visiblePlayers, setVisiblePlayers] = useState(1)
  // 新增 Loading 和錯誤狀態
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  // 表單驗證函式
  const validateForm = () => {
    // 驗證隊伍名稱
    if (!formData.teamName.trim()) {
      setError('請輸入隊伍名稱')
      return false
    }

    // 驗證隊長資訊
    if (
      !formData.captain.name.trim() ||
      !formData.captain.gameId.trim() ||
      !formData.captain.phone.trim() ||
      !formData.captain.email.trim()
    ) {
      setError('請填寫完整的隊長資訊')
      return false
    }

    // 驗證隊長電話號碼格式（台灣手機號碼格式）
    const phoneRegex = /^09\d{8}$/
    if (!phoneRegex.test(formData.captain.phone)) {
      setError('請輸入有效的手機號碼（格式：09xxxxxxxx）')
      return false
    }

    // 驗證隊長電子郵件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.captain.email)) {
      setError('請輸入有效的電子郵件地址')
      return false
    }

    // 驗證所有顯示的隊員資訊
    for (let i = 1; i <= visiblePlayers; i++) {
      const player = formData.players[i]
      if (!player || !player.name.trim() || !player.gameId.trim()) {
        setError('請確認所有隊員資訊都已填寫完整')
        return false
      }
    }

    // 驗證同意條款
    if (!formData.agreeToTerms) {
      setError('請同意活動相關規定及條款')
      return false
    }

    return true
  }

  // 處理隊伍名稱和隊長資訊變更
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setError('') // 清除錯誤訊息

    if (name.startsWith('captain.')) {
      const field = name.split('.')[1]
      setFormData((prev) => ({
        ...prev,
        captain: {
          ...prev.captain,
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

  // 處理隊員資訊變更
  const handlePlayerChange = (playerNumber, field, value) => {
    setError('') // 清除錯誤訊息
    setFormData((prev) => ({
      ...prev,
      players: {
        ...prev.players,
        [playerNumber]: {
          ...prev.players[playerNumber],
          [field]: value,
        },
      },
    }))
  }

  // 處理新增隊員
  const handleAddPlayer = () => {
    if (visiblePlayers >= 6) {
      setError('已達人數上限')
      return
    }

    const nextPlayerNumber = visiblePlayers + 1
    setVisiblePlayers(nextPlayerNumber)
    setFormData((prev) => ({
      ...prev,
      players: {
        ...prev.players,
        [nextPlayerNumber]: { name: '', gameId: '' },
      },
    }))
  }

  // 處理移除隊員
  const handleRemovePlayer = (playerNumber) => {
    if (visiblePlayers <= 1) {
      setError('至少需要一名隊員')
      return
    }

    setVisiblePlayers((prev) => prev - 1)
    setFormData((prev) => {
      const newPlayers = { ...prev.players }
      delete newPlayers[playerNumber]
      // 重新排序剩餘隊員
      const sortedPlayers = {}
      let index = 1
      Object.values(newPlayers).forEach((player) => {
        sortedPlayers[index] = player
        index++
      })
      return {
        ...prev,
        players: sortedPlayers,
      }
    })
  }

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 驗證表單
    if (!validateForm()) {
      return
    }

    // 確認所有隊員資料是否填寫完整
    const teamMembers = Object.values(formData.players)
    for (let i = 0; i < teamMembers.length; i++) {
      const player = teamMembers[i]
      if (!player.name.trim() || !player.gameId.trim()) {
        setError('請確認所有隊員資訊都已填寫完整')
        return
      }
    }

    // 確認提交
    if (!window.confirm('確定要提交報名嗎？')) {
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await axios.post(
        `http://localhost:3005/api/events/${eventId}/register/team`,
        {
          teamName: formData.teamName,
          captainInfo: {
            name: formData.captain.name,
            gameId: formData.captain.gameId,
            phone: formData.captain.phone,
            email: formData.captain.email,
          },
          teamMembers: Object.values(formData.players).map((player) => ({
            name: player.name,
            gameId: player.gameId,
          })),
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
    <div className="eventRegistration-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="eventRegistration-card p-4">
              <h2 className="eventRegistration-title text-center mb-4">
                團體賽報名表單
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
                {/* 隊伍資訊 */}
                <div className="mb-4">
                  <h3 className="eventRegistration-subtitle">隊伍資訊</h3>
                  <div className="mb-3">
                    <label
                      htmlFor="teamName"
                      className="eventRegistration-label"
                    >
                      隊伍名稱
                    </label>
                    <input
                      type="text"
                      id="teamName"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      className="form-control eventRegistration-input"
                      placeholder="請輸入隊伍名稱"
                      required
                    />
                  </div>
                </div>

                {/* 隊長資訊 */}
                <div className="mb-4">
                  <h3 className="eventRegistration-subtitle">隊長資訊</h3>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="captain.name"
                        className="eventRegistration-label"
                      >
                        隊長姓名
                      </label>
                      <input
                        type="text"
                        name="captain.name"
                        value={formData.captain.name}
                        onChange={handleInputChange}
                        className="form-control eventRegistration-input"
                        placeholder="請輸入隊長姓名"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="captain.gameId"
                        className="eventRegistration-label"
                      >
                        遊戲ID
                      </label>
                      <input
                        type="text"
                        name="captain.gameId"
                        value={formData.captain.gameId}
                        onChange={handleInputChange}
                        className="form-control eventRegistration-input"
                        placeholder="請輸入遊戲ID"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="captain.phone"
                        className="eventRegistration-label"
                      >
                        聯絡電話
                      </label>
                      <input
                        type="tel"
                        name="captain.phone"
                        value={formData.captain.phone}
                        onChange={handleInputChange}
                        className="form-control eventRegistration-input"
                        placeholder="請輸入手機號碼（格式：09xxxxxxxx）"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="captain.email"
                        className="eventRegistration-label"
                      >
                        電子郵件
                      </label>
                      <input
                        type="email"
                        name="captain.email"
                        value={formData.captain.email}
                        onChange={handleInputChange}
                        className="form-control eventRegistration-input"
                        placeholder="請輸入電子郵件"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 隊員資訊 */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="eventRegistration-subtitle mb-0">
                      隊員資訊
                    </h3>
                    <EventButton
                      type="button"
                      onClick={handleAddPlayer}
                      className="btn-sm"
                      disabled={visiblePlayers >= 6}
                    >
                      新增隊員 ({visiblePlayers}/6)
                    </EventButton>
                  </div>

                  {Array.from({ length: visiblePlayers }).map((_, index) => (
                    <div key={index + 1} className="position-relative mb-3">
                      <PlayerInfo
                        number={index + 1}
                        playerData={formData.players[index + 1]}
                        onChange={(field, value) =>
                          handlePlayerChange(index + 1, field, value)
                        }
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm position-absolute"
                          style={{ top: '10px', right: '10px' }}
                          onClick={() => handleRemovePlayer(index + 1)}
                        >
                          移除
                        </button>
                      )}
                    </div>
                  ))}
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

                {/* 提交按鈕 */}
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

export default EventRegistration

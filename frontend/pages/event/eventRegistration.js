import React, { useState } from 'react'
import EventButton from '@/components/event/EventButton'
import PlayerInfo from '@/components/event/PlayerInfo'

const EventRegistration = () => {
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
      2: { name: '', gameId: '' },
      3: { name: '', gameId: '' },
      4: { name: '', gameId: '' },
    },
    agreeToTerms: false,
  })

  // 處理隊伍名稱和隊長資訊變更
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('captain.')) {
      const field = name.split('.')[1]
      setFormData((prev) => ({
        ...prev,
        captain: {
          ...prev.captain,
          [field]: value,
        },
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

  // 處理條款同意狀態
  const handleTermsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      agreeToTerms: e.target.checked,
    }))
  }

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault()
    // 在這裡處理表單提交邏輯
    console.log('Form submitted:', formData)
  }

  return (
    <div className="eventRegistration-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="eventRegistration-card p-4">
              <h2 className="eventRegistration-title text-center mb-4">
                活動報名表單
              </h2>
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
                        htmlFor="captain.email"
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
                        placeholder="請輸入聯絡電話"
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
                  {[1, 2, 3, 4].map((number) => (
                    <PlayerInfo
                      key={number}
                      number={number}
                      playerData={formData.players[number]}
                      onChange={(field, value) =>
                        handlePlayerChange(number, field, value)
                      }
                    />
                  ))}
                </div>

                {/* 同意條款 */}
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      id="agreeToTerms"
                      className="form-check-input eventRegistration-checkbox"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleTermsChange}
                      required
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="eventRegistration-label"
                    >
                      我已閱讀並同意活動規則及相關條款
                    </label>
                  </div>
                </div>

                {/* 提交按鈕 */}
                <EventButton type="submit">提交報名</EventButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventRegistration

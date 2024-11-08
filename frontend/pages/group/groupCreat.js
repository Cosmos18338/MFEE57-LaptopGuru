import { useState } from 'react'
import EventButton from '@/components/event/EventButton'

export default function GroupCreat() {
  const [formData, setFormData] = useState({
    group_name: '',
    max_members: '',
    description: '',
    image: null,
  })
  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError('圖片大小不能超過 5MB')
        return
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // 基本驗證
      if (!formData.group_name?.trim()) {
        setError('請輸入群組名稱')
        return
      }
      if (!formData.description?.trim()) {
        setError('請輸入群組描述')
        return
      }
      if (!formData.max_members) {
        setError('請選擇人數上限')
        return
      }

      // 創建 FormData 對象
      const submitFormData = new FormData()
      submitFormData.append('group_name', formData.group_name.trim())
      submitFormData.append('description', formData.description.trim())
      submitFormData.append('max_members', formData.max_members)
      submitFormData.append('creator_id', '1') // 這裡要替換成實際的用戶ID
      if (formData.image) {
        submitFormData.append('group_img', formData.image)
      }

      // 發送請求
      const response = await fetch('http://localhost:3005/api/group', {
        method: 'POST',
        body: submitFormData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '建立群組失敗')
      }

      const result = await response.json()

      if (result.success) {
        setSuccess('群組建立成功！')
        // 清空表單
        setFormData({
          group_name: '',
          max_members: '',
          description: '',
          image: null,
        })
        setImagePreview('')
      } else {
        throw new Error(result.error || '建立群組失敗')
      }
    } catch (err) {
      setError(err.message || '發生錯誤，請稍後再試')
    }
  }

  return (
    <div className="group-creat-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="group-creat-card p-4">
              <h2 className="text-center mb-4">揪團表單</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {/* 群組名稱 */}
                <div className="mb-3">
                  <label htmlFor="group_name" className="group-creat-label">
                    群組名稱
                    <span className="group-creat-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="group_name"
                    name="group_name"
                    value={formData.group_name}
                    onChange={handleInputChange}
                    className="form-control group-creat-input"
                    placeholder="請輸入群組名稱"
                    maxLength={20}
                    required
                  />
                </div>

                {/* 人數上限 */}
                <div className="mb-3">
                  <label htmlFor="max_members" className="group-creat-label">
                    人數上限
                    <span className="group-creat-required">*</span>
                  </label>
                  <select
                    name="max_members"
                    value={formData.max_members}
                    onChange={handleInputChange}
                    className="group-creat-select"
                    required
                  >
                    <option value="">請選擇人數上限</option>
                    <option value="2">2人</option>
                    <option value="3">3人</option>
                    <option value="4">4人</option>
                    <option value="5">5人</option>
                    <option value="6">6人</option>
                    <option value="7">7人</option>
                    <option value="8">8人</option>
                  </select>
                </div>

                {/* 群組描述 */}
                <div className="mb-4">
                  <label htmlFor="description" className="group-creat-label">
                    群組描述
                    <span className="group-creat-required">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-control group-creat-input"
                    rows={4}
                    placeholder="請描述你的群組"
                    maxLength={500}
                    required
                  />
                </div>

                {/* 圖片上傳 */}
                <div className="mb-4">
                  <label htmlFor="group_img" className="group-creat-label">
                    群組圖片
                  </label>
                  <div className="group-creat-image-preview">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <span className="text-white-50">預覽圖片</span>
                    )}
                  </div>
                  <label className="group-creat-upload-btn d-block text-center">
                    選擇圖片
                    <input
                      type="file"
                      id="group_img"
                      className="group-creat-file-input"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {/* 提交按鈕 */}
                <EventButton type="submit">建立群組</EventButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

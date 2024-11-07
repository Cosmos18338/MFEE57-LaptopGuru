import { useState } from 'react'
import EventButton from '@/components/event/EventButton'

export default function GroupCreat() {
  const [formData, setFormData] = useState({
    activityName: '',
    activityTime: '',
    requiredPeople: '',
    description: '',
    image: null,
  })
  const [imagePreview, setImagePreview] = useState('')

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    // 這裡處理表單提交邏輯
  }

  return (
    <div className="group-creat-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="group-creat-card p-4">
              <h2 className="text-center mb-4">揪團表單</h2>
              <form onSubmit={handleSubmit}>
                {/* 名稱 */}
                <div className="mb-3">
                  <label htmlFor="activityName" className="group-creat-label">
                    活動名稱
                    <span className="group-creat-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="activityName"
                    name="activityName"
                    value={formData.activityName}
                    onChange={handleInputChange}
                    className="form-control group-creat-input"
                    placeholder="請輸入活動名稱"
                    required
                  />
                </div>

                {/* 活動時間 */}
                <div className="mb-3">
                  <label htmlFor="activityTime" className="group-creat-label">
                    活動時間
                    <span className="group-creat-required">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="activityTime"
                    value={formData.activityTime}
                    onChange={handleInputChange}
                    className="form-control group-creat-input"
                    required
                  />
                </div>

                {/* 需求人數 */}
                <div className="mb-3">
                  <label htmlFor="requiredPeople" className="group-creat-label">
                    需求人數
                    <span className="group-creat-required">*</span>
                  </label>
                  <select
                    name="requiredPeople"
                    value={formData.requiredPeople}
                    onChange={handleInputChange}
                    className="group-creat-select"
                    required
                  >
                    <option value="">請選擇需求人數</option>
                    <option value="1">1人</option>
                    <option value="2">2人</option>
                    <option value="3">3人</option>
                    <option value="4">4人</option>
                    <option value="5">5人</option>
                  </select>
                </div>

                {/* 活動敘述 */}
                <div className="mb-4">
                  <label htmlFor="description" className="group-creat-label">
                    活動敘述
                    <span className="group-creat-required">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-control group-creat-input"
                    rows={4}
                    placeholder="請描述你的活動內容"
                    required
                  />
                </div>

                {/* 圖片上傳 */}
                <div className="mb-4">
                  <label htmlFor="activityImage" className="group-creat-label">
                    活動圖片
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
                      id="activityImage"
                      className="group-creat-file-input"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {/* 提交按鈕 */}
                <EventButton>提交表單</EventButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

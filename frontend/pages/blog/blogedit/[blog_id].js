import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'next/navigation'
import { useRouter } from 'next/router'

export default function Blogedit() {
  const router = useRouter()
  const { blog_id } = router.query
  // 使用同一個表單管理功能，把 const blog_type = useState('') 都全部去除
  const [formData, setFormData] = useState({
    blog_type: '',
    blog_title: '',
    blog_content: '',
    blog_brand: '',
    blog_brand_model: '',
    blog_keyword: '',
    blog_image: null,
    blog_valid_value: '1',
  })

  // 獲取原始數據
  useEffect(() => {
    console.log('router.query:', router.query) // 檢查整個 query 物件
    if (blog_id) {
      fetch(`http://localhost:3005/api/blog/edit/${blog_id}`)
        .then((r) => r.json())
        .then((data) => {
          console.log('從後端獲取的資料:', data)
          setFormData({
            blog_type: data.blog_type || '',
            blog_title: data.blog_title || '',
            blog_content: data.blog_content || '',
            blog_brand: data.blog_brand || '',
            blog_brand_model: data.blog_brand_model || '',
            blog_keyword: data.blog_keyword || '',
            blog_valid_value: data.blog_valid_value || '1',
            blog_image: data.blog_image || null,
          })
        })
        .catch(console.error)
    }
  }, [blog_id])

  // 統一的表單處理函數
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `http://localhost:3005/api/blog/edit/${blog_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )
      if (response.ok) {
        navigate('/blogs') // 假設成功後導向部落格列表
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="BlogEditAlignAllItems mt-5">
      <div className="">
        <div className="BlogEditSmallTitle text-nowrap">
          <p>
            <FontAwesomeIcon icon={faDiamond} className="TitleDiamond" />
            {'\u00A0 '}
            新增封面圖片
          </p>
        </div>
      </div>

      <div
        className="BlogImgUploadDiv d-flex align-items-center justify-content-center"
        onClick={() => document.getElementById('imageInput').click()}
      >
        {formData.blog_image ? (
          <img
            // 如果是檔案物件用 URL.createObjectURL，如果是字串路徑直接使用
            src={
              formData.blog_image instanceof File
                ? URL.createObjectURL(formData.blog_image)
                : `http://localhost:3005${formData.blog_image}`
            }
            alt="預覽圖片"
            className="object-fit-cover w-100 h-100"
          />
        ) : (
          <>
            <i className="fa-solid fa-arrow-up-from-bracket" />
            <div style={{ cursor: 'pointer' }}>點擊上傳圖片</div>
          </>
        )}
        <input
          type="file"
          onChange={(e) => handleChange('blog_image', e.target.files[0])}
          style={{ display: 'none' }}
          id="imageInput"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-start justify-content-start">
          <div className="BlogEditSmallTitle text-nowrap col-4">
            <p>
              <FontAwesomeIcon icon={faDiamond} className="TitleDiamond" />
              {'\u00A0 '}
              標題
            </p>
          </div>
          <div className="col-8 col-lg-8 col-md-10">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="標題"
              value={formData.blog_title}
              onChange={(e) => handleChange('blog_title', e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex align-items-start justify-content-start mb-5 mt-5">
          <div className="BlogEditSmallTitle text-nowrap">
            <p>
              <FontAwesomeIcon icon={faDiamond} className="TitleDiamond" />
              {'\u00A0 '}
              內文
            </p>
          </div>
          <div>
            <textarea
              className="form-control BlogCreatedTextArea"
              value={formData.blog_content}
              onChange={(e) => handleChange('blog_content', e.target.value)}
              rows="10"
              placeholder="請輸入內文"
            />
          </div>
        </div>

        <div className="d-flex flex-row justify-content-between align-items-start col-12 mb-5">
          <div className="BlogSmallTitleAlign d-flex justify-content-start align-items-start col-6">
            <div className="BlogEditSmallTitle text-nowrap">
              <p>
                <FontAwesomeIcon icon={faDiamond} className="TitleDiamond" />
                {'\u00A0 '}
                筆電品牌
              </p>
            </div>
          </div>
          <div className="d-flex flex-row gap-5 col-6">
            <div className="d-flex flex-column gap-5">
              {[
                'ROG',
                'DELL',
                'Acer',
                'Raser',
                'GIGABYTE',
                'MSI',
                'HP',
                'ASUS',
              ].map((v) => (
                <div
                  key={v}
                  className={`BlogEditBrandSelected d-flex justify-content-center align-items-center ${
                    v === formData.blog_brand
                      ? 'BlogEditBrandSelectedActive'
                      : ''
                  }`}
                  onClick={() => handleChange('blog_brand', v)}
                >
                  <p>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex align-items-start justify-content-start mt-5 mb-5">
          <div className="BlogEditSmallTitle text-nowrap col-4">
            <p>
              <FontAwesomeIcon icon={faDiamond} className="TitleDiamond" />
              {'\u00A0 '}
              筆電型號
            </p>
          </div>
          <div className="col-8 col-lg-8 col-md-10">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="型號"
              value={formData.blog_brand_model}
              onChange={(e) => handleChange('blog_brand_model', e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-row justify-content-between align-items-start col-12 mb-5">
          <div className="BlogEditSmallTitle text-nowrap col-10">
            <p>
              <FontAwesomeIcon icon={faDiamond} className="TitleDiamond" />
              {'\u00A0 '}
              類別
            </p>
          </div>
          <div className="d-flex flex-column gap-5 col-9">
            {['購買心得', '開箱文', '疑難雜症', '活動心得'].map((v) => (
              <div
                key={v}
                className="BlogEditTypeSelected d-flex justify-content-center align-items-center"
                onClick={() => handleChange('blog_type', v)}
              >
                <p>{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-start justify-content-start">
          <div className="BlogEditSmallTitle text-nowrap col-4">
            <p>
              <FontAwesomeIcon icon={faDiamond} className="TitleDiamond" />
              {'\u00A0 '}
              關鍵字
            </p>
          </div>
          <div className="col-8 col-lg-8 col-md-10">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="輸入一組你喜歡的關鍵字！"
              value={formData.blog_keyword}
              onChange={(e) => handleChange('blog_keyword', e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-row justify-content-around align-items-center mt-5">
          <button className="BlogEditButtonSubmit" type="submit">
            送出
          </button>
          <button
            className="BlogEditButtonDelete"
            type="button"
            onClick={async () => {
              try {
                const res = await fetch(`/api/blog/delete/${blog_id}`, {
                  method: 'PUT',
                })
                if (res.ok) {
                  // 可以導向到列表頁或其他頁面
                  router.push('/blogs')
                }
              } catch (error) {
                console.error('刪除失敗:', error)
              }
            }}
          >
            刪除
          </button>
        </div>
      </form>
    </div>
  )
}

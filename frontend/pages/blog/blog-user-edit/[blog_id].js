import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'

export default function BlogUserEdit() {
  const router = useRouter()
  const { blog_id } = router.query
  const { auth } = useAuth()
  const { userData } = auth

  useEffect(() => {
    if (blog_id) {
      // 先檢查用戶身份
      if (!auth.isAuth) {
        console.log('用戶未登入')
        router.push('/dashboard')
        return
      }

      if (!userData) {
        console.log('無用戶數據')
        router.push('/dashboard')
        return
      }

      // 獲取文章數據並驗證
      fetch(`http://localhost:3005/api/blog/blog-edit/${blog_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log('從後端收到的資料:', data)

          // 驗證文章作者是否為當前用戶
          const blogUserId = String(data.user_id)
          const currentUserId = String(userData.user_id)

          if (blogUserId !== currentUserId) {
            console.log('用戶ID不匹配')
            router.push('/dashboard')
            return
          }

          // 驗證通過，設置表單數據
          setFormData({
            ...data,
            originalImage: data.blog_image,
            blog_image: data.blog_image,
          })
        })
        .catch((error) => {
          console.log('錯誤:', error)
          router.push('/dashboard')
        })
    }
  }, [blog_id, userData, auth.isAuth, router])

  const [formData, setFormData] = useState({
    blog_type: '',
    blog_title: '',
    blog_content: '',
    blog_brand: '',
    blog_brand_model: '',
    blog_keyword: '',
    blog_image: null,
    originalImage: null,
    blog_valid_value: '1',
  })

  const brands = [
    ['ROG', 'DELL', 'Acer', 'Raser'],
    ['GIGABYTE', 'MSI', 'HP', 'ASUS'],
  ]

  useEffect(() => {
    if (blog_id) {
      fetch(`http://localhost:3005/api/blog/blog-edit/${blog_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log('從後端收到的資料:', data)
          setFormData({
            ...data,
            originalImage: data.blog_image,
            blog_image: data.blog_image,
          })
        })
        .catch((error) => console.log('錯誤:', error))
    }
  }, [blog_id])

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()

      formDataToSend.append('user_id', userData.user_id)
      formDataToSend.append('blog_type', formData.blog_type)
      formDataToSend.append('blog_title', formData.blog_title)
      formDataToSend.append('blog_content', formData.blog_content)
      formDataToSend.append('blog_brand', formData.blog_brand)
      formDataToSend.append('blog_brand_model', formData.blog_brand_model)
      formDataToSend.append('blog_keyword', formData.blog_keyword)

      // 處理圖片
      if (formData.blog_image instanceof File) {
        formDataToSend.append('blog_image', formData.blog_image)
      } else {
        formDataToSend.append('originalImage', formData.originalImage)
      }

      const response = await fetch(
        `http://localhost:3005/api/blog/blog-edit/${blog_id}`,
        {
          method: 'PUT',
          body: formDataToSend,
        }
      )

      if (response.ok) {
        window.alert('編輯成功！') // 加入這行
        router.push('/blog/blog-edit-success') // 改用這個路徑
      }
    } catch (error) {
      console.error('錯誤:', error)
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
        {formData.blog_image || formData.originalImage ? (
          <img
            src={
              formData.blog_image instanceof File
                ? URL.createObjectURL(formData.blog_image)
                : `http://localhost:3005${
                    formData.originalImage || formData.blog_image
                  }`
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
              style={{ width: '200%' }}
              value={formData.blog_title || ''}
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
              className="form-control"
              value={formData.blog_content || ''}
              onChange={(e) => handleChange('blog_content', e.target.value)}
              style={{ width: '430%' }}
              rows="20"
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
          <div className="d-flex flex-row gap-5 justify-content-center">
            {brands.map((column, columnIndex) => (
              <div key={columnIndex} className="d-flex flex-column gap-5">
                {column.map((brand) => (
                  <div
                    key={brand}
                    className={`BlogEditBrandSelected d-flex justify-content-center align-items-center ${
                      brand === formData.blog_brand
                        ? 'BlogEditBrandSelectedActive'
                        : ''
                    }`}
                    onClick={() => handleChange('blog_brand', brand)}
                  >
                    <p className="m-0">{brand}</p>
                  </div>
                ))}
              </div>
            ))}
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
              value={formData.blog_brand_model || ''}
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
                className={`BlogEditBrandSelected d-flex justify-content-center align-items-center ${
                  v === formData.blog_type ? 'BlogEditBrandSelectedActive' : ''
                }`}
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
              value={formData.blog_keyword || ''}
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
              if (window.confirm('確定要刪除這篇文章嗎？')) {
                try {
                  const res = await fetch(
                    `http://localhost:3005/api/blog/blog-delete/${blog_id}`,
                    {
                      method: 'PUT',
                    }
                  )
                  if (res.ok) {
                    router.push('/blog/blog-delete-success')
                  }
                } catch (error) {
                  console.error('刪除失敗:', error)
                }
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

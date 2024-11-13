import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'

export default function Blogedit() {
  const router = useRouter()
  const { blog_id } = router.query

  const brands = [
    ['ROG', 'DELL', 'Acer', 'Raser'],
    ['GIGABYTE', 'MSI', 'HP', 'ASUS'],
  ]

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

  useEffect(() => {
    console.log('1. blog_id:', blog_id) // 檢查 blog_id

    if (blog_id) {
      fetch(`http://localhost:3005/api/blog/blog-edit/${blog_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((data) => {
          setFormData(data)
        })
        .catch((error) => console.log('3. 錯誤:', error)) // 檢查錯誤
    }
  }, [blog_id])

  // 如果要檢查 formData 的變化，可以加一個新的 useEffect
  useEffect(() => {}, [formData])

  // 統一的表單處理函數
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // -------------------使用者-------------------
  const { auth } = useAuth()
  const { userData } = auth
  const user_id = userData.user_id
  console.log(user_id)

  // 如果沒有登入就導向首頁或登入頁
  if (!userData) {
    router.push('http://localhost:3000/member/login') // 或是 router.push('/')
    return null // 返回 null 避免渲染其他內容
  }
  // -------------------使用者-------------------

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // 創建 FormData 物件
      const formDataToSend = new FormData()

      // 加入所有欄位
      formDataToSend.append('user_id', formData.user_id)
      formDataToSend.append('blog_type', formData.blog_type)
      formDataToSend.append('blog_title', formData.blog_title)
      formDataToSend.append('blog_content', formData.blog_content)
      formDataToSend.append('blog_brand', formData.blog_brand)
      formDataToSend.append('blog_brand_model', formData.blog_brand_model)
      formDataToSend.append('blog_keyword', formData.blog_keyword)

      // 如果有新圖片才加入
      if (formData.blog_image instanceof File) {
        formDataToSend.append('blog_image', formData.blog_image)
      }

      const response = await fetch(
        `http://localhost:3005/api/blog/blog-edit/${blog_id}`,
        {
          method: 'PUT',
          // 移除 Content-Type header，讓瀏覽器自動設定
          body: formDataToSend,
        }
      )

      if (response.ok) {
        router.push(`/blog/blog-user-detail/${blog_id}`)
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
              style={{ width: '200%' }}
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
              className="form-control"
              value={formData.blog_content}
              onChange={(e) => handleChange('blog_content', e.target.value)}
              style={{ width: '430%' }}
              rows="20"
              placeholder="請輸入內文"
            />
          </div>
        </div>

        {/* 品牌選擇區塊 */}
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
              value={formData.blog_keyword}
              onChange={(e) => handleChange('blog_keyword', e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-row justify-content-around align-items-center mt-5">
          <button
            className="BlogEditButtonSubmit"
            type="submit"
            onClick={async () => {
              // 加入確認視窗
              if (window.confirm('更新文章？')) {
                try {
                  const res = await fetch(
                    `http://localhost:3005/api/blog/blog-user-edit/${blog_id}`,
                    {
                      method: 'PUT',
                    }
                  )
                  if (res.ok) {
                    router.push('/blog/blog-edit-success')
                  }
                } catch (error) {
                  console.error('刪除失敗:', error)
                }
              }
            }}
          >
            送出
          </button>
          <button
            className="BlogEditButtonDelete"
            type="button"
            onClick={async () => {
              // 加入確認視窗
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

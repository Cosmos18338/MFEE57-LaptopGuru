import React, { useState } from 'react'

export default function Blogcreated(props) {
  // 狀態定義
  const [blog_title, setTitle] = useState('')
  const [blog_content, setContent] = useState('')
  const [blog_brand, setBrand] = useState('')
  const [blog_brand_model, setCategory] = useState('')
  const [blog_image, setImage] = useState(null)

  // 處理表單提交，把原本的預設狀態弄掉
  const handleSubmit = async (e) => {
    e.preventDefault()

    const blogData = {
      blog_title,
      blog_content,
      blog_brand,
      blog_brand_model,
      blog_image: blog_image ? blog_image.name : null,
    }

    try {
      const response = await fetch(
        'http://localhost:3005/api/blog/blogcreated',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        }
      )

      const result = await response.json()

      if (response.ok) {
        alert('部落格新增成功')
        // window.location.href = 'http://localhost:3000/blog/BlogList'
      } else {
        alert(`發生錯誤: ${result.message}`)
      }
    } catch (error) {
      console.error('錯誤:', error)
      alert('發生錯誤，請稍後再試')
    }
  }

  return (
    <div className="container BlogEditAlignAllItems">
      {/* 圖片上傳區塊 */}
      <div className="container">
        <div className="BlogEditSmallTitle text-nowrap">
          <p>
            <i className="fa-solid fa-diamond TitleDiamond" />
            新增封面圖片
          </p>
        </div>
      </div>
      <div className="container BlogImgUploadDiv d-flex align-items-center justify-content-center">
        <i className="fa-solid fa-arrow-up-from-bracket" />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ display: 'none' }}
          id="imageInput"
        />
        <div
          onClick={() => document.getElementById('imageInput').click()}
          style={{ cursor: 'pointer' }}
        >
          {blog_image ? blog_image.name : '點擊上傳圖片'}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 標題區塊 */}
        <div className="container d-flex align-items-start justify-content-start">
          <div className="BlogEditSmallTitle text-nowrap col-4">
            <p>
              <i className="fa-solid fa-diamond TitleDiamond" />
              標題
            </p>
          </div>
          <div className="col-8 col-lg-8 col-md-10">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="標題"
              value={blog_title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* 文章內容區塊 */}
        <div className="d-flex align-items-start justify-content-start">
          <div className="BlogEditSmallTitle text-nowrap">
            <p>
              <i className="fa-solid fa-diamond TitleDiamond" />
              內文
            </p>
          </div>
        </div>
        <div>
          <textarea
            className="form-control"
            value={blog_content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            placeholder="請輸入內文"
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '10px',
              marginBottom: '20px',
            }}
          />
        </div>

        {/* 品牌選擇區塊 */}
        <div className="d-flex flex-row justify-content-between align-items-start col-12">
          <div className="BlogSmallTitleAlign d-flex justify-content-start align-items-start col-6">
            <div className="BlogEditSmallTitle text-nowrap">
              <p>
                <i className="fa-solid fa-diamond TitleDiamond" />
                品牌
              </p>
            </div>
          </div>
          <div className="container d-flex flex-row gap-5 col-6">
            <div className="d-flex flex-column gap-5">
              {['GIGABYTE', 'MSI', 'HP', 'ASUS'].map((brand) => (
                <div
                  key={brand}
                  className="BlogEditBrandSelected d-flex justify-content-center align-items-center"
                  onClick={() => setBrand(brand)}
                >
                  <p>{brand}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 類別選擇區塊 */}
        <div className="container d-flex flex-row justify-content-between align-items-start col-12">
          <div className="BlogEditSmallTitle text-nowrap col-10">
            <p>
              <i className="fa-solid fa-diamond TitleDiamond" />
              類別
            </p>
          </div>
          <div className="container d-flex flex-column gap-5 col-2">
            {['購買心得', '開箱文', '疑難雜症', '活動心得'].map((category) => (
              <div
                key={category}
                className="BlogEditTypeSelected d-flex justify-content-center align-items-center"
                onClick={() => setCategory(category)}
              >
                <p>{category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 按鈕區塊 */}
        <div className="container d-flex flex-row justify-content-around align-items-center">
          <button className="BlogEditButtonSubmit" type="submit">
            送出
          </button>
          <button className="BlogEditButtonDelete" type="button">
            刪除
          </button>
        </div>
      </form>
    </div>
  )
}

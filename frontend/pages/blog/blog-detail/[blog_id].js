import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ArticleDetailMainArea from '@/components/blog/blogdetail/blogdetail-mainarea'

export default function BlogId() {
  const router = useRouter()
  const { blog_id } = router.query // 動態獲取 blog_id
  const [blogData, setBlogData] = useState(null)

  console.log(blogData)

  useEffect(() => {
    if (blog_id) {
      fetch(`http://localhost:3005/api/blog/blog-detail/${blog_id}`) // 這裡替換為你實際的 API 路徑
        .then((response) => response.json())
        .then((data) => {
          setBlogData(data.data) // 設定資料
          console.log('撈取資料正常')
        })
        .catch((error) => console.error('Error fetching blog data:', error))
    }
  }, [blog_id]) // 當 blog_id 改變時重新執行 useEffect

  if (!blogData) {
    return <p>Loading...</p> // 當資料還沒載入時顯示 loading
  }

  return (
    <>
      <ArticleDetailMainArea />
      <div>
        <section className="container-fluid ArticleSectionContainer">
          <div className="container">
            <div className="row d-flex">
              <div className="ArticleSectionTitle">
                <p className="text-light">{blogData.blog_title}</p>
              </div>
              <div className="ArticleSectionIntroduction">
                <p className="text-light h5">{blogData.blog_content}</p>
              </div>
            </div>
          </div>
        </section>
        <div className="container mt-5">
          <div className="mb-5">
            <p className="fs-5 fw-bold">{blogData.blog_brand}</p>
          </div>
          <div className="mb-5">
            <p className="fs-5 fw-bold">購買機型型號</p>
          </div>
          <div className="w-100 h-25 overflow-hidden m-auto">
            <img
              className="object-fit-cover w-100 h-100"
              src={blogData.blog_blog_image}
              alt="..."
            />
          </div>
        </div>
        <section className="container BlogDetailSectionContentArea">
          <p className="fs-5 fw-bold BlogDetailSectionContentAreaTitle">
            {blogData.blog_title}
          </p>
          <p className="BlogDetailText">{blogData.blog_content}</p>
        </section>
      </div>
    </>
  )
}

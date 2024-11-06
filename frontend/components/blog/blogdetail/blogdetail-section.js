import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function BlogDetailSection() {
  const router = useRouter()
  const { blog_id } = router.query // 從路由中獲取 ArticleId
  const [blog, setBlog] = useState(null) // 初始化 article 狀態

  useEffect(() => {
    if (blog_id) {
      console.log('Fetching blog with ID:', blog_id) // 檢查 ArticleId 是否正確
      // http://localhost:3005/api/article/article-detail/${ArticleId}
      fetch(`http://localhost:3005/api/blog/blog-detail/${blog_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log('Fetched blog data:', data) // 檢查獲取的數據
          setBlog(data) // 假設這裡的 data 是文章的詳細信息
        })
        .catch((error) => console.error('Error fetching blog:', error))
    }
  }, [blog_id]) // 當 blogId 改變時重新執行

  return (
    <>
      {blog ? (
        <div>
          <div className="container mt-5">
            <div className="mb-5">
              <p className="fs-5 fw-bold">購買機型</p>
            </div>
            <div className="mb-5">
              <p className="fs-5 fw-bold">Swift 14 AI AMD</p>
            </div>
            <div className="w-100 h-25 overflow-hidden m-auto">
              <img
                className="object-fit-cover w-100 h-100"
                src="https://images.acer.com/is/image/acer/acer-laptop-swift-14-ai-amd-designed-to-unfold-your-potential:KSP-with-Specs-XL"
                alt
              />
            </div>
          </div>
          <section className="container BlogDetailSectionContentArea">
            <p className="fs-5 fw-bold BlogDetailSectionContentAreaTitle">
              {blog.blog_title}
            </p>
            <p className="BlogDetailText">{blog.blog_content}</p>
            <div className="container d-flex align-items-center justify-content-center gap-5 mb-5">
              <div className="col-6">
                <img
                  className="w-100 h-100 ratio"
                  src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                  alt
                />
              </div>
              <div className="col-6">
                <img
                  className="w-100 h-100 ratio"
                  src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                  alt
                />
              </div>
            </div>
            <p className="BlogDetailText">{blog.blog_content}</p>
            <div className="container d-flex align-items-center justify-content-center col-12 mb-5 gap-5">
              <div className="row">
                <div className="col-6">
                  <img
                    className="w-100 h-100 ratio"
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    alt
                  />
                </div>
                <div className="col-6">
                  <img
                    className="w-100 h-100 ratio"
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    alt
                  />
                </div>
              </div>
            </div>
            <div className="container d-flex align-items-center justify-content-center col-12">
              <img
                className="w-50 h-50 ratio"
                src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                alt
              />
            </div>
          </section>
        </div>
      ) : (
        <p>Loading...</p> // 加載中的提示
      )}
    </>
  )
}

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ArticleDetailSection() {
  const router = useRouter()
  const { article_id } = router.query // 從路由中獲取 ArticleId
  const [article, setArticle] = useState(null) // 初始化 article 狀態

  useEffect(() => {
    if (article_id) {
      console.log('Fetching article with ID:', article_id) // 檢查 ArticleId 是否正確
      // http://localhost:3005/api/article/article-detail/${ArticleId}
      fetch(`http://localhost:3005/api/article/${article_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log('Fetched article data:', data) // 檢查獲取的數據
          setArticle(data) // 假設這裡的 data 是文章的詳細信息
        })
        .catch((error) => console.error('Error fetching article:', error))
    }
  }, [article_id]) // 當 ArticleId 改變時重新執行

  return (
    <>
      {article ? (
        <section className="ArticleDetailSectionContentArea">
          <p className="fs-5 fw-bold ArticleDetailSectionContentAreaTitle">
            {article.ArticleTitle}
          </p>
          <p className="ArticleDetailText">{article.article_content}</p>
          <div className="d-flex align-items-center justify-content-center gap-5 mb-5">
            <div className="col-6">
              <img
                className="w-100 h-100 ratio"
                src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                alt=""
              />
            </div>
            <div className="col-6">
              <img
                className="w-100 h-100 ratio"
                src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                alt=""
              />
            </div>
          </div>
          <p className="ArticleDetailText">{article.article_content}</p>
          <div className="d-flex align-items-center justify-content-center col-12 mb-5 gap-5">
            <div className="row">
              <div className="col-6">
                <img
                  className="w-100 h-100 ratio"
                  src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                  alt=""
                />
              </div>
              <div className="col-6">
                <img
                  className="w-100 h-100 ratio"
                  src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="container d-flex align-items-center justify-content-center col-12">
            <img
              className="w-50 h-50 ratio"
              src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
              alt=""
            />
          </div>
        </section>
      ) : (
        <p>Loading...</p> // 加載中的提示
      )}
    </>
  )
}

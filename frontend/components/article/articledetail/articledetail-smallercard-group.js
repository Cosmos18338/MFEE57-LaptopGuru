import React, { useState, useEffect } from 'react'
import ArticleDetailSmallerCard from '@/components/Article/articledetail/articledetail-smallercard'
import { useRouter } from 'next/router'

export default function ArticleDetailSmallerCardGroup() {
  const [articles, setArticles] = useState([]) // 使用複數名稱
  const [visibleArticles, setVisibleArticles] = useState(8) // 初始顯示的文章數量
  const router = useRouter()
  const { ArticleId } = router.query // 從路由中獲取 ArticleId

  useEffect(() => {
    const fetchArticles = async () => {
      if (ArticleId) {
        // 確保 ArticleId 存在
        try {
          const response = await fetch(`/article/article-detail/${ArticleId}`) // 確保提供正確的 API 路徑
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const data = await response.json()
          setArticles(data) // 正確地設置狀態
        } catch (error) {
          console.error('Error fetching articles:', error) // 錯誤處理
        }
      }
    }

    fetchArticles() // 調用 fetchArticles 函數
  }, [ArticleId]) // 依賴 ArticleId，當其變化時重新發送請求

  const loadMoreArticles = () => {
    setVisibleArticles((prevVisible) => prevVisible + 4) // 每次加載 ? 篇文章
  }

  return (
    <div className="container position-relative">
      <div className="d-flex flex-column align-items-center justify-content-center gap-5">
        <div className="row">
          {articles.slice(0, visibleArticles).map((article, index) => (
            <div className="col-md-12 col-lg-6 mb-3" key={index}>
              <ArticleDetailSmallerCard
                ArticleBrand={article.brand}
                ArticleTitle={article.title}
                ArticleContent={article.content}
                ArticleType={article.type}
                ArticleCreatedDate={article.createdDate}
                ArticleViews={article.views} // 假設你的文章對象有這個欄位
              />
            </div>
          ))}
        </div>
        {visibleArticles < articles.length && ( // 當還有未顯示的文章時顯示按鈕
          <button
            className="SmallCircleWidgetToButtom"
            onClick={loadMoreArticles}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        )}
      </div>
    </div>
  )
}

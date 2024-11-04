import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const ArticleDetail = () => {
  const router = useRouter()
  const { ArticleId } = router.query // 從路由中獲取 ArticleId
  const [article, setArticle] = useState(null) // 初始化 article 狀態

  useEffect(() => {
    if (ArticleId) {
      fetch(`http://localhost:3005/api/article/article-detail/${ArticleId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => setArticle(data.article))
        .catch((error) => console.error('Error fetching article:', error))
    }
  }, [ArticleId])

  return (
    <div>
      {article ? (
        <section className="ArticleDetailSectionContentArea">
          <h1>{article.ArticleTitle}</h1>
          <p>{article.ArticleContent}</p>
          {/* 其他內容 */}
        </section>
      ) : (
        <p>Loading...123</p>
      )}
    </div>
  )
}

export default ArticleDetail

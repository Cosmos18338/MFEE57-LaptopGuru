import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function BlogHomepageSearchbox(props) {
  // 啟用 router
  const router = useRouter()
  // 自己設置一個狀態以利後續撈取
  const [blog, setBlogs] = useState([])

  // 例如，當網址為 https://example.com/blog?SearchKeywords=React 時，SearchKeywords 的值會是 'React'，你可以利用這個參數來進行搜尋或其他相關操作。
  // .query 是 next 用來獲取網址後字串的方法
  const { SearchKeywords } = router.query

  useEffect(() => {
    const fetchBlogs = async () => {
      // 如果有關鍵字，這是先執行檢查
      if (SearchKeywords) {
        try {
          // fetch 請求
          const response = await fetch(
            `/blog/blog-search/${SearchKeywords.param}`
          )
          // 等待後的東西被轉成 json，並被儲存在 data 中
          // 應該是要等待搜尋到的 blogid，要記得喔到時候要去後端取用
          const data = await response.json()
          setBlogs(data)
        } catch (error) {
          console.error('error fetching', error)
        }
      }
    }
    fetchBlogs()
    // [] 僅在變動時代碼才會執行
  }, [SearchKeywords])

  return (
    <>
      <div className="BlogMain">
        <div className="BlogHomePageSearchBox">
          <form
            className="form-inline my-2 my-lg-0 d-flex justify-content-center"
            method="post"
            action="/search" // 根據你的需求設置處理搜索的 URL
          >
            <input
              className="form-control BlogHomePageSearchInputStyle"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={SearchKeywords || ''} // 注意這裡的 value 應該用花括號
              onChange={(e) =>
                router.push(`/search?SearchKeywords=${e.target.value}`)
              } // 搜索框內容改變時，動態更新 URL
              name="blogsearch" // 設定 name 屬性以便後端接收
            />

            <button className="btn" type="submit">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

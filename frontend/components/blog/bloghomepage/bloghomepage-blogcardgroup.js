import React, { useState, useEffect } from 'react'
import BloghomepageBlogcard from '@/components/blog/bloghomepage/bloghomepage-blogcard'

export default function BlogCardGroup() {
  const [blogData, setBlogData] = useState([])

  useEffect(() => {
    // 撈取 /blogcard 路由的資料
    const fetchBlogData = async () => {
      try {
        const response = await fetch('/blogcard') // 假設 API 路徑是 /blogcard
        const data = await response.json()
        setBlogData(data) // 將撈取到的資料設定到狀態中
      } catch (error) {
        console.error('Error fetching blog data:', error)
      }
    }

    fetchBlogData()
  }, [])

  return (
    <div>
      {blogData.map((blog, index) => (
        <BloghomepageBlogcard key={index} blog={blog} />
      ))}
    </div>
  )
}

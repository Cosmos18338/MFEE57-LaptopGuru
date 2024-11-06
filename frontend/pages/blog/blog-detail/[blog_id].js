import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BlogDetailMainArea from '@/components/blog/blogdetail/blogdetail-mainarea'

export default function BlogDetail(props) {
  // 使用 Router()
  const router = useRouter()

  const [blog, setBlog] = useState({
    blog_id: 0,
    blog_title: '',
    blog_content: '',
    blog_created_date: '',
    blog_brand: '',
    blog_type: '',
    blog_valid_value: '',
    blog_url: '',
  })
  console.log('13245')

  const [loading, setLoading] = useState(true)

  const getBlog = async (blog_id) => {
    const url = `http://localhost:3005/api/blog/blog_detail/${blog_id}`

    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log('Response Data:', resData)
      if (
        resData.status === 'success' &&
        Array.isArray(resData.data) &&
        resData.data.length > 0
      ) {
        setBlog(resData.data[0])
        console.log('Blog Loaded:', resData.data[0])
      } else {
        console.log('資料錯誤:', resData)
      }
    } catch (e) {
      console.log('Fetch error:', e)
    } finally {
      setLoading(false) // 完成加载
    }
  }

  useEffect(() => {
    console.log('Router query:', router.query) // 调试信息
    console.log('Router is ready:', router.isReady) // 检查 router.isReady 的状态
    if (router.isReady && router.query.blog_id) {
      console.log('Fetching blog with ID:', router.query.blog_id) // 调试信息
      console.log('11111')

      getBlog(router.query.blog_id)
    }
  }, [router.isReady, router.query.blog_id])

  return (
    <>
      <BlogDetailMainArea />

      {blog ? (
        <section className="BlogDetailSectionContentArea">
          <p className="fs-5 fw-bold BlogDetailSectionContentAreaTitle">
            {blog.blog_title}
          </p>
          <p className="BlogDetailText">{blog.blog_content}</p>
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
          <p className="BlogDetailText">{blog.blog_content}</p>
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

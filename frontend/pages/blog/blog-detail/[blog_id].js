import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BlogDetailMainArea from '@/components/blog/blogdetail/blogdetail-mainarea'
import BlogComments from '@/components/blog/blogdetail/blogdetail-commentgroup'

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
  console.log('BlogDetail鉤子有成功上狀態')

  const [loading, setLoading] = useState(true)

  const getBlog = async (blog_id) => {
    const url = `http://localhost:3005/api/blog/blog_detail/${blog_id}`

    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log('Response Data:', resData)

      if (resData.status === 'success' && resData.data) {
        const { overview, comments, images, keywords } = resData.data

        setBlog({
          blog_id: blog_id,
          blog_title: overview[0]?.title || '',
          blog_content: overview[0]?.content || '',
          blog_created_date: overview[0]?.created_at || '',
          blog_brand: overview[0]?.brand || '',
          blog_type: overview[0]?.type || '',
          blog_valid_value: overview[0]?.valid_value || '',
          blog_url: overview[0]?.url || '',
        })

        // 傳遞 comments 資料給 BlogComments 組件
        setComments(comments)

        console.log('Blog Loaded:', resData.data)
      } else {
        console.log('資料錯誤:', resData)
      }
    } catch (e) {
      console.log('Fetch error:', e)
    } finally {
      setLoading(false) // 完成加載
    }
  }

  useEffect(() => {
    console.log('Router query:', router.query) // 調試信息
    console.log('Router is ready:', router.isReady) // 檢查 router.isReady 的狀態
    if (router.isReady && router.query.blog_id) {
      console.log('Fetching blog with ID:', router.query.blog_id) // 調試信息
      console.log('11111')

      getBlog(router.query.blog_id)
    }
  }, [router.isReady, router.query.blog_id])

  return (
    <>
      <BlogDetailMainArea />

      {blog.blog_id !== 0 ? ( // 確保 blog_id 已經存在並且不為 0
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
                alt="Blog Image 1"
              />
            </div>
            <div className="col-6">
              <img
                className="w-100 h-100 ratio"
                src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                alt="Blog Image 2"
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
                  alt="Blog Image 3"
                />
              </div>
              <div className="col-6">
                <img
                  className="w-100 h-100 ratio"
                  src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                  alt="Blog Image 4"
                />
              </div>
            </div>
          </div>
          <div className="container d-flex align-items-center justify-content-center col-12">
            <img
              className="w-50 h-50 ratio"
              src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
              alt="Blog Image 5"
            />
          </div>
        </section>
      ) : (
        <p>Loading...</p> // 加載中的提示
      )}
      <BlogComments />
    </>
  )
}

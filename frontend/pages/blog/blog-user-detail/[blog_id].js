import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ArticleDetailMainArea from '@/components/blog/blogdetail/blogdetail-mainarea'
import Link from 'next/link'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { useAuth } from '@/hooks/use-auth'

export default function BlogId() {
  const router = useRouter()
  const { blog_id } = router.query // 動態獲取 blog_id
  const [blogData, setBlogData] = useState(null)

  useEffect(() => {
    if (blog_id) {
      fetch(`http://localhost:3005/api/blog/blog-user-detail/${blog_id}`) // 這裡替換為你實際的 API 路徑
        .then((response) => response.json())
        .then((data) => {
          setBlogData(data.data) // 設定資料
          console.log('撈取資料正常')
        })
        .catch((error) => console.error('Error fetching blog data:', error))
    }
  }, [blog_id]) // 當 blog_id 改變時重新執行 useEffect

  // -------------------使用者-------------------
  const { auth } = useAuth()
  const { userData } = auth
  const user_id = userData.user_id
  console.log(user_id)

  // 如果沒有登入就導向首頁或登入頁
  if (!userData) {
    router.push('http://localhost:3000/member/login') // 或是 router.push('/')
    return null // 返回 null 避免渲染其他內容
  }

  if (!blogData) {
    return <p>Loading...</p> // 當資料還沒載入時顯示 loading
  }
  // 確認一下圖片路徑
  console.log(`確認一下圖片路徑`)
  console.log(`http://localhost:3005${blogData.blog_image}`)
  console.log(blogData)
  console.log('blogData裡面沒有 blog_id，這點等之後完全綁使用者後解決')

  return (
    <>
      <ArticleDetailMainArea />
      <div className=" mt-5 mb-5">
        <Link
          href="/blog/blog-user-overview/1"
          className="text-decoration-none fs-5" // 移除底線
        >
          <p>
            <IoArrowBackCircleOutline /> 返回部落格總覽
          </p>
        </Link>
      </div>

      {/* <div>
        <div className="mt-5">
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
        </div> */}
      <section className="BlogDetailSectionContentArea mt-5">
        <div className="d-flex align-items-center justify-content-center mb-5">
          <img
            className="w-100 h-100 ratio"
            src={`http://localhost:3005${blogData.blog_image}`}
            alt
          />
        </div>
        <div className="d-flex flex-column">
          <div>
            <p className="mb-5 mt-5 display-5 fw-bold  BlogDetailSectionContentAreaTitle">
              部落格標題
            </p>
            <p className="fs-5 fw-bold BlogDetailSectionContentAreaTitle">
              {blogData.blog_title}
            </p>
          </div>
          <div className="mb-5 mt-5 d-flex flex-column gap-5">
            <p className="display-5 fw-bold "> 部落格分類</p>
            <p className="fs-5 fw-bold">{blogData.blog_type}</p>
          </div>
          <div className="mb-5 mt-5 d-flex flex-column gap-5 fw-bold ">
            <p className="display-5 fw-bold ">品牌</p>
            <p className="fs-5 fw-bold">{blogData.blog_brand}</p>
          </div>
          <div className="mb-5 mt-5 d-flex flex-column gap-5">
            <p className="display-5 fw-bold">購買機型</p>
            <p>{blogData.blog_brand_model}</p>
          </div>
        </div>

        <div className="mb-5 mt-5 d-flex flex-column gap-5">
          <p className="display-5 BlogDetailText fw-bold">部落格內文</p>
          <p className="fs-5 BlogDetailText">{blogData.blog_content}</p>
        </div>

        <Link href={`/blog/blog-user-edit/${blog_id}`}>
          <button className="BlogEditButtonDelete" type="button">
            前往編輯！
          </button>
        </Link>
      </section>
    </>
  )
}

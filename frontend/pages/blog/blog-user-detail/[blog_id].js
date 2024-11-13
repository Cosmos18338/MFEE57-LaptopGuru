import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ArticleDetailMainArea from '@/components/blog/blogdetail/blogdetail-mainarea'
import Link from 'next/link'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { useAuth } from '@/hooks/use-auth'
import { FontSize } from 'ckeditor5'

export default function BlogId() {
  const router = useRouter()
  const { blog_id } = router.query
  const [blogData, setBlogData] = useState(null)

  useEffect(() => {
    if (blog_id) {
      fetch(`http://localhost:3005/api/blog/blog-user-detail/${blog_id}`)
        .then((response) => response.json())
        .then((data) => {
          setBlogData(data.data)
          console.log('撈取資料正常')
        })
        .catch((error) => console.error('Error fetching blog data:', error))
    }
  }, [blog_id])

  if (!blogData) {
    return <p>Loading...</p>
  }

  return (
    <>
      <ArticleDetailMainArea />
      <div className=" mt-5 mb-5">
        <Link
          href="http://localhost:3000/dashboard"
          className="text-decoration-none fs-5"
        >
          <p className="fs-5 fw-bold">
            <IoArrowBackCircleOutline /> 返回使用者總覽
          </p>
        </Link>
      </div>

      <section className="BlogDetailSectionContentArea mt-5">
        <div className="d-flex align-items-center justify-content-center mb-5">
          <img
            className="w-50 h-50 ratio"
            src={`http://localhost:3005${blogData.blog_image}`}
            alt
          />
        </div>
        <div className="d-flex flex-column">
          <div>
            <p className="mb-5 mt-5 display-5 fw-bold  BlogDetailSectionContentAreaTitle">
              部落格標題：{blogData.blog_title}
            </p>
          </div>
          <div className="mb-5 mt-5 d-flex flex-column gap-5">
            <p className="display-5 fw-bold ">
              {' '}
              部落格分類：{blogData.blog_type}
            </p>
          </div>
          <div className="mb-5 mt-5 d-flex flex-column gap-5 fw-bold ">
            <p className="display-5 fw-bold ">品牌：{blogData.blog_brand}</p>
          </div>
          <div className="mb-5 mt-5 d-flex flex-column gap-5">
            <p className="display-5 fw-bold">
              購買機型：{blogData.blog_brand_model}
            </p>
          </div>
        </div>

        <div className="mb-5 mt-5 d-flex flex-column gap-5">
          <p className="display-5 BlogDetailText fw-bold">部落格內文</p>
          <p className="fs-5 BlogDetailText">{blogData.blog_content}</p>
        </div>

        <div className="d-flex gap-5">
          <Link href={`/blog/blog-detail/${blog_id}`}>
            <button className="BlogEditButtonSubmit" type="button text-nowrap">
              前往部落格頁面
            </button>
          </Link>
          <Link href={`/blog/blog-user-edit/${blog_id}`}>
            <button className="BlogEditButtonDelete" type="button">
              前往編輯！
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}

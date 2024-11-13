import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'

export default function BlogComment({ blog_id }) {
  const [blogComment, setBlogComment] = useState([])
  const [newComment, setNewComment] = useState('') // 新增评论的状态
  const router = useRouter()

  // 获取时间戳的函数
  function getTimestamp() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  // 获取评论列表
  useEffect(() => {
    if (blog_id) {
      fetch(`http://localhost:3005/api/blog/blog-comment/${blog_id}`)
        .then((response) => response.json())
        .then((data) => {
          setBlogComment(data)
          console.log('撈取資料正常')
        })
        .catch((error) => console.error('Error fetching blog data:', error))
    }
  }, [blog_id])

  const { auth } = useAuth()
  const { userData } = auth
  const user_id = userData.user_id
  console.log(user_id)

  // 处理提交评论
  const handleSubmit = async () => {
    if (!newComment.trim()) {
      alert('請輸入留言內容')
      return
    }

    const commentData = {
      blog_id: blog_id,
      user_id: user_id,
      blog_content: newComment,
      blog_created_date: getTimestamp(),
    }

    try {
      const response = await fetch(
        `http://localhost:3005/api/blog/blog-comment/${blog_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData),
        }
      )

      if (response.ok) {
        // 提交成功后刷新评论列表
        const newData = await response.json()
        setBlogComment([...blogComment, newData])
        setNewComment('') // 清空输入框
        alert('留言成功！')
        router.reload()
      } else {
        alert('你沒登入吧！')
      }
    } catch (error) {
      console.error('Error posting comment:', error)
      alert('你沒登入吧！')
    }
  }

  if (!blogComment) {
    return <p>Loading comments...</p>
  }

  return (
    <>
      {blogComment.map((comment, index) => (
        <div key={comment.blog_comment_id} className="mb-5 BlogDetailComment">
          <div className="m-4">
            <p>#{index + 1}</p>
            <hr />
            <div className="w-100 h-50 d-flex flex-row align-items-start justify-content-between">
              <div className="overflow-hidden BlogDetailCommentImg">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="https://th.bing.com/th/id/R.88c444f63f40cfa9b49801f826befa80?rik=QAme0H3xbxieEQ&pid=ImgRaw&r=0"
                  alt=""
                />
              </div>
              <p>要換成名字和大頭貼的話要去撈 user 資料表</p>
              <p>於 {comment.blog_created_date} 留言</p>
            </div>
            <div className="w-100 h-100 mt-5 mb-5">{comment.blog_content}</div>
          </div>
        </div>
      ))}

      {/* 只有登入才顯示留言框 */}
      {userData && (
        <div className="mb-5 BlogDetailComment">
          <div className="m-5">
            <p className="fs-5">新增你的留言，留下你的寶貴意見！</p>
            <hr />
            <textarea
              className="w-100 h-200"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          <button
            className="BlogEditButtonDelete ms-5 mb-5"
            type="button"
            onClick={handleSubmit}
          >
            送出
          </button>
        </div>
      )}
    </>
  )
}

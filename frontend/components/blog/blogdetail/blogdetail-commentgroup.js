import React from 'react'

export default function BlogComments({ comments }) {
  // 已經從父組件接收到評論數據，不需要再發送請求

  // 新增日期格式化函數
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <div
            key={`${comment.comment_user_id}-${index}`}
            className="mb-5 BlogDetailComment"
          >
            <div className="m-4">
              <p>#{index + 1}</p>
              <hr />
              <div className="w-50 h-50 d-flex flex-row align-items-start justify-content-between">
                <div className="overflow-hidden BlogDetailCommentImg">
                  <img
                    className="w-100 h-100 object-fit-cover"
                    src="https://th.bing.com/th/id/R.88c444f63f40cfa9b49801f826befa80?rik=QAme0H3xbxieEQ&pid=ImgRaw&r=0"
                    alt={comment.comment_user_id || 'anonymous'}
                  />
                </div>
                <p>{comment.comment_user_id || '匿名用戶'}</p>
                <p>於 {formatDate(comment.comment_created_time)} 留言</p>
                <p>普通會員</p>
              </div>
              <div className="w-100 h-100 mt-5 mb-5">
                {comment.comment_text}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No comments available</p>
      )}
    </>
  )
}

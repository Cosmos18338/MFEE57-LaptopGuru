import React from 'react'

export default function BloghomepageBlogcard({ blog }) {
  return (
    <div className="card d-flex flex-row BlogCard">
      <img
        src={blog.blog_image || 'https://via.placeholder.com/150'}
        className="card-img-top w-50 h-100 BlogCardImg"
        alt="Blog"
      />
      <div className="card-body w-50 h-100">
        <div className="BlogCardBodyContent">
          <div className="row">
            <p className="BlogCardTitle">{blog.blog_title}</p>
            <p className="card-text mb-4 BlogCardContent">
              {blog.blog_content}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="card-text BlogCardType">版主：{blog.blog_user_id}</p>
            <p>
              <i className="fa-brands fa-readme" />
              &nbsp;{blog.blog_views}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>{blog.blog_type}</p>
            <p>{new Date(blog.blog_created_date).toLocaleString()}</p>{' '}
            {/* 顯示格式化的時間 */}
          </div>
        </div>
      </div>
    </div>
  )
}

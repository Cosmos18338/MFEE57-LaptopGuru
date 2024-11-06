import React, { useState, useEffect } from 'react'

export default function BloghomepageBrandCardGroup(props) {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch('/api/blogcard')
      .then((response) => response.json())
      .then((data) => setBlogs(data.data || [])) // 確認 `data.data` 是否存在並設置為預設值
      .catch((error) => console.error('Error fetching blogs:', error))
  }, [])

  return (
    <div className="container position-relative">
      <div className="BlogSmallerCardEightGroup">
        {blogs.map((blog) => (
          <div className="card BlogSmallerCard" key={blog.blog_id}>
            <img
              src={blog.image_url || 'default_image_url.jpg'}
              className="card-img-top BlogHomePageSmallerCardImg"
              alt="Blog Card"
            />
            <div className="card-body BlogHomePageSmallerCardBody p-4">
              <h5 className="card-title BlogHomePageSmallerCardBodyTitle">
                {blog.blog_title}
              </h5>
              <p className="card-text BlogHomePageSmallerCardBodyContent">
                {blog.blog_content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'

export default function BloghomepageBrandCardGroup(props) {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch('/api/blogs')
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error('Error fetching blogs:', error))
  }, [])

  return (
    <div className="container position-relative">
      <div className="BlogSmallerCardEightGroup">
        {blogs.map((blog) => (
          <div className="card BlogSmallerCard" key={blog.blog_id}>
            <img
              src={blog.image_url || 'default_image_url.jpg'} // 使用預設圖片
              className="card-img-top BlogHomePageSmallerCardImg"
              alt={blog.blog_title}
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

import React, { useState, useEffect } from 'react'

export default function Header(props) {
  return (
    <>
      <header>
        <div className="container d-flex p-3 align-items-center">
          <img className="logo me-auto" src="/logo.svg" />
          <div className="me-7 nav-list">
            <a className="text-light me-3">首頁</a>
            <a className="text-light me-3">商品</a>
            <a className="text-light me-3">比較</a>
            <a className="text-light me-3">租賃</a>
            <a className="text-light me-3">活動</a>
            <a className="text-light me-3">文章</a>
            <a className="text-light me-3">部落格</a>
          </div>
          <div className="user-avater me-3">
            <img src="/Vector.svg" />
          </div>
          <div className="cart">
            <img src="/cart.svg" />
          </div>
        </div>
      </header>
    </>
  )
}

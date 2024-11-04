import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'

export default function Header(props) {
  const { auth } = useAuth() // 獲取 auth 對象
  const { isAuth } = auth // 獲取 isAuth

  return (
    <>
      <header>
        <div className="container d-flex p-3 align-items-center">
          <img className="logo me-auto" src="/logo.svg" />
          <div className="me-7 nav-list">
            <Link className="text-light me-3" href="/">
              首頁
            </Link>
            <a className="text-light me-3">商品</a>
            <a className="text-light me-3">比較</a>
            <a className="text-light me-3">租賃</a>
            <a className="text-light me-3">活動</a>
            <a className="text-light me-3">文章</a>
            <a className="text-light me-3">部落格</a>
          </div>
          {isAuth ? (
            <>
              <div className="user-avater me-3">
                <img src="/Vector.svg" />
              </div>
              <div className="cart">
                <img src="/cart.svg" />
              </div>
            </>
          ) : (
            <>
              <Link href="/member/login">
                <button className="btn btn-primary me-3">登入</button>
              </Link>
              <Link href="/member/signup">
                <button className="btn btn-primary">註冊</button>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  )
}

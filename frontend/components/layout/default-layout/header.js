import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import Swal from 'sweetalert2'
export default function Header(props) {
  const { auth, logout } = useAuth() // 獲取 auth 對象
  const { isAuth } = auth // 獲取 isAuth
  const handleLogout = () => {
    Swal.fire({
      title: '確定要登出嗎？',
      text: '您即將退出當前帳戶',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定登出',
      cancelButtonText: '取消'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // 用戶確認登出後才調用 logout
        await logout();
        Swal.fire('登出成功', '您已成功登出', 'success');
      }
    });
  };
  return (
    <>
      <header>
        <div className="container d-flex p-3 align-items-center">
          <Link className="logo me-auto" href="/">
            <img src="/logo.svg" />
          </Link>
          <div className="me-3 nav-list">
            <Link className={`text-light me-3`} href="/">
              首頁
            </Link>
            <Link className={`text-light me-3`} href="/product">
              商品
            </Link>
            <a className={`text-light me-3`}>比較</a>
            <Link className={`text-light me-3`} href="/event">
              活動
            </Link>
            <Link className={`text-light me-3`} href="/blog">
              部落格
            </Link>
          </div>
          {isAuth == true ? (
            <>
              <Link href="/dashboard">
                <div className="user-avater me-3">
                  <img src="/Vector.svg" />
                </div>
              </Link>
              <Link href="/cart">
                <div className="cart me-3">
                  <img src="/cart.svg" />
                </div>
              </Link>
              <Link href="/">
                <button
                  className="btn btn-primary header-logout"
                  onClick={handleLogout}
                >
                  登出
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/member/login">
                <button className="btn btn-primary text-white me-3">
                  登入
                </button>
              </Link>
              <Link href="/member/signup">
                <button className="btn btn-primary text-white">註冊</button>
              </Link>
            </>
          )}
        </div>
      </header>

      <style jsx>
        {`
          .header-hover {
            cursor: pointer;
            color: red;
          }
        `}
      </style>
    </>
  )
}

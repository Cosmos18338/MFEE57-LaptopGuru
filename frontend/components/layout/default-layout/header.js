import Link from 'next/link'
import React, { useState, useEffect, use } from 'react'
import { useAuth } from '@/hooks/use-auth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
export default function Header(props) {
  const { auth, logout } = useAuth() // 獲取 auth 對象
  const { isAuth } = auth // 獲取 isAuth
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: '確定要登出嗎？',
        text: '您即將退出當前帳戶',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#805AF5',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定登出',
        cancelButtonText: '取消',
      })
      console.log(result)
      //所以按下cancelButtonText:'取消' 因為swal 他就會自動跑去找到取消的部分了嗎
      // 檢查用戶是否點擊確認
      if (!result.isConfirmed) {
        // 這邊會是false
        return
      }

      // 執行登出
      await logout()

      // 登出成功提示
      await Swal.fire({
        title: '登出成功',
        text: '您已成功登出',
        timer: 1000,
        icon: 'success',
        confirmButtonColor: '#805AF5',
      })

      // 可選：重導向到首頁或登入頁
      setTimeout(() => {
        router.push('/member/login')
        // 導向登入頁
      }, 1000)
    } catch (error) {
      console.error('登出失敗:', error)
      Swal.fire({
        title: '登出失敗',
        text: '請稍後再試',
        timer: 1000,
        icon: 'error',
        confirmButtonColor: '#805AF5',
      })
    }
  }
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
            <Link className={`text-light me-3`} href="/product/compare">
              比較
            </Link>
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
              <button
                className="btn btn-primary text-white"
                onClick={handleLogout}
              >
                登出
              </button>
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

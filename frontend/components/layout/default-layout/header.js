import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
export default function Header(props) {
  const { auth, logout } = useAuth() // 獲取 auth 對象
  const { isAuth, userData } = auth // 獲取 isAuth
  const [user_id, setUserId] = useState('')
  const router = useRouter()
  const [image_path, setImagePath] = useState('/Vector.svg')

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

  useEffect(() => {
    if (user_id) {
      fetch(`http://localhost:3005/api/header`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const defaultImage = data?.gender === 'male' 
          ? 'signup_login/undraw_profile_2.svg'
          : data?.gender === 'female'
          ? 'signup_login/undraw_profile_1.svg'
          : '/Vector.svg';
          
        setImagePath(data?.image_path || defaultImage)
        })
    }
  }, [user_id])
//為了避免登出報錯登入或登出的時候userData就會變動
  useEffect(() => {
    if (userData && userData.user_id) {
      setUserId(userData.user_id)
    } else {
      setUserId(null)
    }
  }, [userData])

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
              產品
            </Link>
            <Link className={`text-light me-3`} href="/product/compare">
              比較
            </Link>
            <Link className={`text-light me-3`} href="/event">
              活動
            </Link>
            <Link className={`text-light me-3`} href="/group">
              揪團
            </Link>
            <Link className={`text-light me-3`} href="/blog">
              部落格
            </Link>
          </div>
          {isAuth == true ? (
            <>
              <Link href="/dashboard">
                <div className="user-avater me-3">
                  <img src={image_path} />
                </div>
              </Link>
              <Link href="/cart">
                <div className="cart me-3">
                  <img src="/cart.svg" />
                </div>
              </Link>
              <button
                className="btn btn-primary text-white border-0"
                onClick={handleLogout}
              >
                登出
              </button>
            </>
          ) : (
            <>
              <Link href="/member/login">
                <button className="btn btn-primary text-white me-3 border-0">
                  登入
                </button>
              </Link>
              <Link href="/member/signup">
                <button className="btn btn-primary text-white border-0">
                  註冊
                </button>
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
          .user-avater {
            width: 40px; /* 調整尺寸 */
            height: 40px;
            border-radius: 50%; /* 圓形 */
            overflow: hidden; /* 隱藏超出的部分 */
            display: inline-block; /* 讓外層成為包覆容器 */
          }

          .user-avater img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* 確保圖像填滿容器並裁剪 */
          }
        `}
      </style>
    </>
  )
}

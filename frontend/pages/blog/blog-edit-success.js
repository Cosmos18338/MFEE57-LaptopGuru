import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Blogdeletesuccess() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // 倒數計時
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    // 3秒後跳轉
    const redirect = setTimeout(() => {
      router.push('/blog/blog-user-overview/1')
    }, 5000)

    // 清理計時器
    return () => {
      clearInterval(timer)
      clearTimeout(redirect)
    }
  }, [])

  return (
    <>
      <div className="display-5 text-center mt-5">
        部落格編輯成功！{countdown}{' '}
        秒後會自動跳轉，或是自己動手按一下回到使用者首頁~
      </div>
      <div className="text-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => router.push('/blog')}
        >
          回到使用者
        </button>
      </div>
    </>
  )
}

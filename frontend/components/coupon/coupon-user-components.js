import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'  // 加入這行
import Coupon from './index'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function CouponUser() {
  const router = useRouter()  // 加入這行
  const [couponDataList, setCouponDataList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 跳轉到購物車
  const handleCartCoupon = (couponId) => {
    router.push(`/coupon/test?id=${couponId}`)
  }

  // 假設使用者 ID 從某個地方獲取（例如：全局狀態管理或 localStorage）
  // 這裡先寫死測試用的 ID，實際應該從登入狀態或 Context 中獲取
  const userId = 1

  // 獲取使用者優惠券資料
  const getUserCoupons = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/coupon-user/${userId}`)

      if (!res.ok) {
        throw new Error('請求失敗')
      }

      const resData = await res.json()

      if (resData.status === 'success') {
        setCouponDataList(resData.data)

        // 如果沒有優惠券，顯示提示訊息
        if (resData.data.length === 0) {
          MySwal.fire({
            title: '提示',
            text: '目前沒有可用的優惠券',
            icon: 'info',
          })
        }
      } else {
        throw new Error(resData.message || '獲取資料失敗')
      }
    } catch (err) {
      setError(err.message)
      MySwal.fire({
        title: '錯誤',
        text: err.message,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserCoupons()
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">載入中...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">我的優惠券</h2>
      <div className="row g-4">
        {couponDataList.map((coupon) => (
          <div
            key={coupon.id}
            className="col-md-6"
            onClick={() => handleCartCoupon(coupon.coupon_id)}
            style={{ cursor: 'pointer' }}
          >
            <Coupon
              coupon_id={coupon.coupon_id}
              coupon_code={coupon.coupon_code}
              coupon_content={coupon.coupon_content}
              coupon_discount={coupon.coupon_discount}
              discount_method={coupon.discount_method}
              coupon_start_time={coupon.coupon_start_time}
              coupon_end_time={coupon.coupon_end_time}
              isValid={coupon.user_coupon_valid === 1}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
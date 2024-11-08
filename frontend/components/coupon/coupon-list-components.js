// CouponList.js
import React, { useState, useEffect } from 'react'
import Coupon from './index'

export default function CouponList() {
  const [couponDataList, setCouponDataList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 獲取優惠券資料
  const getCouponData = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/coupon')
      const resData = await res.json()

      if (resData.data?.coupons) {
        setCouponDataList(resData.data.coupons)
      }
    } catch (err) {
      setError('獲取優惠券資料失敗')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCouponData()
  }, [])

  // CouponList 元件
  return (
    <div className="row g-4">
      {couponDataList.map((coupon) => (
        <div
          key={coupon.coupon_id}
          className="col-md-6"
          style={{ cursor: 'pointer' }}
        >
          <Coupon
            coupon_code={coupon.coupon_code}
            coupon_content={coupon.coupon_content}
            coupon_discount={coupon.coupon_discount}
            discount_method={coupon.discount_method}
            coupon_start_time={coupon.coupon_start_time}
            coupon_end_time={coupon.coupon_end_time}
          />
        </div>
      ))}
    </div>
  )
}

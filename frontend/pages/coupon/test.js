import React, { useState, useEffect } from 'react'
import Coupon from '@/components/coupon'

export default function TestCoupon() {
  // 定義要測試的優惠券 ID 陣列
  const couponIds = [1, 2, 3, 4, 5, 10, 999] // 可以依需求修改測試的 ID

  // 如果要從後端獲取所有優惠券 ID，可以這樣寫：
  const [allCouponIds, setAllCouponIds] = useState([])
  
  useEffect(() => {
    const fetchAllCoupons = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/coupon')
        if (!response.ok) throw new Error('獲取優惠券列表失敗')
        
        const result = await response.json()
        if (result.status === 'success' && result.data) {
          // 假設回傳的資料中包含 coupon_id
          const ids = result.data.map(coupon => coupon.coupon_id)
          setAllCouponIds(ids)
        }
      } catch (error) {
        console.error('錯誤:', error)
      }
    }

    fetchAllCoupons()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">優惠券測試頁面</h1>
      
      {/* 使用固定的 ID 陣列 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">固定 ID 測試</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {couponIds.map((id) => (
            <div key={id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">優惠券 ID: {id}</h2>
              <Coupon couponId={id} />
            </div>
          ))}
        </div>
      </div>

      {/* 使用從 API 獲取的 ID */}
      <div>
        <h2 className="text-xl font-bold mb-4">API 獲取的優惠券</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allCouponIds.map((id) => (
            <div key={id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">優惠券 ID: {id}</h2>
              <Coupon couponId={id} />
            </div>
          ))}
        </div>
      </div>

      {/* 顯示開發資訊 */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">開發資訊：</h2>
        <p>固定測試 ID 數量：{couponIds.length}</p>
        <p>API 獲取 ID 數量：{allCouponIds.length}</p>
        <p>API 路徑：http://localhost:3000/api/coupon</p>
      </div>
    </div>
  )
}
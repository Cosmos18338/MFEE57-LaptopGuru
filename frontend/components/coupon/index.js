// import React, { useState, useEffect } from 'react'

// export default function Coupon(props) {
//   return (
//     <>
//       <div className="coupon position-relative">
//         <img className='coupon' src="/coupon_2.svg" alt />
//         <div className={`coupon-title position-absolute`}>laptop Guru</div>
//         <div className={`coupon-content position-absolute ms-2`}>
//           <div className>夏季特賣，滿3萬全館享85折優惠</div>
//           <button className="btn btn-primary">@NS2409_cn03</button>
//         </div>
//         <div className={`coupon-end-time position-absolute`}>
//           <div>使用期限：</div>
//           <div>2025/09/30</div>
//         </div>
//       </div>
//     </>
//   )
// }

import React, { useState, useEffect } from 'react'

export default function Coupon({ couponId = 1 }) {  // 加入 props
  // 1. 先宣告所有需要的 state
  const [couponData, setCouponData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 2. 日期格式化函數
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const weekdays = ['日', '一', '二', '三', '四', '五', '六']
    return `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} (${
      weekdays[date.getDay()]
    })`
  }

  // 3. useEffect 放在 state 宣告之後
  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/coupon/${couponId}`
        )
        if (!response.ok) {
          throw new Error('優惠券資料獲取失敗')
        }

        const result = await response.json()
        console.log('API 回傳資料:', result)

        if (result.status === 'success' && result.data.length > 0) {
          setCouponData(result.data[0])
        }
      } catch (err) {
        console.error('錯誤:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCoupon()
  }, [couponId])

  // 4. 處理不同狀態的顯示
  if (loading) {
    return <div>載入中...</div>
  }

  if (error) {
    return <div>錯誤: {error}</div>
  }

  if (!couponData) {
    return <div>無優惠券資料</div>
  }

  // 5. 主要的渲染內容
  return (
    <div className="coupon-wrapper">
      <img className="coupon-bg" src="/coupon_2.svg" alt="coupon background" />
      <div className="coupon-content">
        <h2 className="store-name">GURU Laptop</h2>
        <p className="offer-text">{couponData.coupon_content}</p>
        <div className="coupon-code">
          優惠券代碼 {couponData.coupon_code}
        </div>
        <div className="expiry-date">
          期限：{formatDate(couponData.coupon_end_time)}前
        </div>
        {/* <div className="discount-info">
          {couponData.discount_method === 1 
            ? `折抵金額：${couponData.coupon_discount}元`
            : `折扣：${couponData.coupon_discount}%`
          }
        </div> */}
      </div>
    </div>
  )
}
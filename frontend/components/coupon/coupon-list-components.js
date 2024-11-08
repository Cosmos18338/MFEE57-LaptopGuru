// // CouponList.js
// import React, { useState, useEffect } from 'react'
// import Coupon from './index'

// export default function CouponList() {
//   const [couponDataList, setCouponDataList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   // 獲取優惠券資料
//   const getCouponData = async () => {
//     try {
//       const res = await fetch('http://localhost:3005/api/coupon')
//       const resData = await res.json()

//       if (resData.data?.coupons) {
//         setCouponDataList(resData.data.coupons)
//       }
//     } catch (err) {
//       setError('獲取優惠券資料失敗')
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     getCouponData()
//   }, [])

//   // CouponList 元件
//   return (
//     <div className="row g-4">
//       {couponDataList.map((coupon) => (
//         <div
//           key={coupon.coupon_id}
//           className="col-md-6"
//           style={{ cursor: 'pointer' }}
//         >
//           <Coupon
//             coupon_code={coupon.coupon_code}
//             coupon_content={coupon.coupon_content}
//             coupon_discount={coupon.coupon_discount}
//             discount_method={coupon.discount_method}
//             coupon_start_time={coupon.coupon_start_time}
//             coupon_end_time={coupon.coupon_end_time}
//           />
//         </div>
//       ))}
//     </div>
//   )
// }

// CouponList.js
import React, { useState, useEffect } from 'react'
import Coupon from './index'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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

  // 領取優惠券函數
  const handleClaimCoupon = async (couponId) => {
    try {
      // 1. 先新增到 coupon_user 表
      const addResponse = await fetch(
        'http://localhost:3005/api/coupon-user/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: 1,
            coupon_id: couponId,
            valid: 1, // 新增時設為有效
          }),
        }
      )

      const addResult = await addResponse.json()

      if (addResult.status === 'success') {
        // 2. 更新 coupon 表的 valid 為 0
        const updateResponse = await fetch(
          'http://localhost:3005/api/coupon/update', // 注意這裡的路徑
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              coupon_id: couponId, // 只需要傳 coupon_id
            }),
          }
        )

        const updateResult = await updateResponse.json()

        if (updateResult.status === 'success') {
          MySwal.fire({
            icon: 'success',
            title: '領取成功！',
            text: '優惠券已加入您的帳戶',
          })
          // 重新獲取優惠券列表
          getCouponData()
        } else {
          throw new Error('更新優惠券狀態失敗')
        }
      } else {
        MySwal.fire({
          icon: 'error',
          title: '領取失敗',
          text: addResult.message || '請稍後再試',
        })
      }
    } catch (error) {
      console.error('領取失敗:', error)
      MySwal.fire({
        icon: 'error',
        title: '領取失敗',
        text: '系統錯誤，請稍後再試',
      })
    }
  }

  useEffect(() => {
    getCouponData()
  }, [])

  if (loading) return <div>載入中...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="row g-4">
      {couponDataList.map((coupon) => (
        <div
          key={coupon.coupon_id}
          className="col-md-6"
          onClick={() => handleClaimCoupon(coupon.coupon_id)}
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
          />
        </div>
      ))}
    </div>
  )
}

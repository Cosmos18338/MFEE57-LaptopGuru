// Coupon 元件
export default function Coupon({
  coupon_id,          // 加入這個
  coupon_code,
  coupon_content,
  coupon_discount,
  discount_method,
  coupon_start_time,
  coupon_end_time,
}) {

  // 判斷折扣方式並格式化顯示文字
  const getDiscountText = () => {
    if (discount_method === 1) {
      return `折扣 ${coupon_discount} 元`
    } else {
      return `打 ${coupon_discount} 折`
    }
  }

  return (
    <div className="coupon-wrapper">
      <img className="coupon-bg" src="/coupon_2.svg" alt="coupon background" />
      <div className="coupon-content">
        <h2 className="store-name">GURU Laptop</h2>
        <p className="offer-text">{coupon_content}</p>
        <div className="coupon-code">優惠券代碼：{coupon_code}</div>
        <div className="coupon_discount">
          {getDiscountText()} {/* 使用判斷後的折扣文字 */}
        </div>
        <div className="expiry-date">
          期限：{coupon_end_time}前
        </div>
      </div>
    </div>
  )
}

// components/coupon/index.js
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// const MySwal = withReactContent(Swal)

// export default function Coupon({
//   coupon_id,
//   coupon_code,
//   coupon_content,
//   coupon_discount,
//   discount_method,
//   coupon_start_time,
//   coupon_end_time,
// }) {
//   const getDiscountText = () => {
//     if (discount_method === 1) {
//       return `折扣 ${coupon_discount} 元`
//     } else {
//       return `打 ${coupon_discount} 折`
//     }
//   }

//   const handleClaim = async (e) => {
//     e.preventDefault()

//     // 先印出看看有沒有值
//     console.log('要發送的數據:', {
//       user_id: 1,
//       coupon_id: coupon_id,
//     })

//     try {
//       const user_id = 1 // 暫時寫死的測試ID

//       // 檢查 coupon_id 是否存在
//       if (!coupon_id) {
//         console.error('缺少 coupon_id:', coupon_id)
//         MySwal.fire({
//           icon: 'error',
//           title: '系統錯誤',
//           text: '優惠券資料不完整',
//         })
//         return
//       }

//       const response = await fetch(
//         'http://localhost:3005/api/coupon_user/add',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             user_id: user_id,
//             coupon_id: Number(coupon_id), // 確保是數字
//           }),
//         }
//       )

//       const result = await response.json()
//       console.log('API 回應:', result)

//       if (result.status === 'success') {
//         MySwal.fire({
//           icon: 'success',
//           title: '領取成功！',
//           text: '優惠券已加入您的帳戶',
//         })
//       } else {
//         MySwal.fire({
//           icon: 'error',
//           title: '領取失敗',
//           text: result.message || '領取失敗，請稍後再試',
//         })
//       }
//     } catch (error) {
//       console.error('領取失敗:', error)
//       MySwal.fire({
//         icon: 'error',
//         title: '領取失敗',
//         text: '系統錯誤，請稍後再試',
//       })
//     }
//   }
//   return (
//     <div
//       className="coupon-wrapper relative cursor-pointer"
//       onClick={handleClaim}
//     >
//       <img className="coupon-bg" src="/coupon_2.svg" alt="coupon background" />
//       <div className="coupon-content">
//         <h2 className="store-name">GURU Laptop</h2>
//         <p className="offer-text">{coupon_content}</p>
//         <div className="coupon-code">優惠券代碼：{coupon_code}</div>
//         <div className="coupon_discount text-end">{getDiscountText()}</div>
//         <div className="expiry-date">期限：{coupon_end_time}前</div>
//       </div>
//     </div>
//   )
// }

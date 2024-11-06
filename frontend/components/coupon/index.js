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

import React from 'react'

export default function Coupon() {
  return (
    <div className="coupon-wrapper">
      <img className="coupon-bg" src="/coupon_2.svg" alt="coupon background" />
      <div className="coupon-content">
        <h2 className="store-name">GURU Laptop</h2>
        <p className="offer-text">夏季特賣，滿3萬全館享85折優惠</p>
        <div className="coupon-code">
          優惠券代碼 @NS2409_cn03
        </div>
        <div className="expiry-date">
          期限：2024/10/31 (四)前
        </div>
      </div>
    </div>
  )
}
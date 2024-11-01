import React, { useState, useEffect } from 'react'

export default function Coupon(props) {
  return (
    <>
      <div className="coupon position-relative">
        <img src="/coupon.svg" alt />
        <div className={`coupon-title position-absolute`}>laptop Guru</div>
        <div className={`coupon-content position-absolute ms-2`}>
          <div className>夏季特賣，滿3萬全館享85折優惠</div>
          <button className="btn btn-primary">@NS2409_cn03</button>
        </div>
        <div className={`coupon-end-time position-absolute`}>
          <div>使用期限：</div>
          <div>2025/09/30</div>
        </div>
      </div>
    </>
  )
}

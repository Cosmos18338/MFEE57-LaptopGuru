import React, { useState, useEffect } from 'react'

export default function CouponQuery(props) {
  return (
    <>
      <div className="discount-code-section mb-4">
        <div className="d-flex align-items-center">
          <div className="input-group" style={{ maxWidth: '400px' }}>
            <span
              className="input-group-text"
              style={{ backgroundColor: '#805AF5', color: 'white' }}
            >
              折扣碼
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="請輸入您的折扣碼"
              aria-label="Discount code"
            />
            <button
              className="btn btn-primary"
              type="button"
              style={{
                backgroundColor: '#805AF5',
                borderColor: '#805AF5',
              }}
            >
              使用
            </button>
          </div>
        </div>
      </div>
      優惠券網格
      <div className="row g-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="col-md-6">
            <Coupon />
          </div>
        ))}
      </div>
    </>
  )
}

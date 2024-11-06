import React, { useState, useEffect } from 'react'

export default function CouponUse(props) {
  return (
    <>
      <div className="filter-section mb-4">
        <div className="d-flex align-items-center">
          <span className="me-3">狀態篩選</span>
          <button
            className="btn btn-outline-primary btn-sm me-2"
            style={{
              color: '#805AF5',
              borderColor: '#805AF5',
              '&:hover': {
                backgroundColor: '#805AF5',
                color: 'white',
              },
            }}
          >
            未使用
          </button>
          <button
            className="btn btn-outline-primary btn-sm me-2"
            style={{
              color: '#805AF5',
              borderColor: '#805AF5',
              '&:hover': {
                backgroundColor: '#805AF5',
                color: 'white',
              },
            }}
          >
            已使用
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            style={{
              color: '#805AF5',
              borderColor: '#805AF5',
              '&:hover': {
                backgroundColor: '#805AF5',
                color: 'white',
              },
            }}
          >
            已過期
          </button>
        </div>
      </div>
    </>
  )
}

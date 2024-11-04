'use client'

import React, { useState, useEffect } from 'react'

export default function BuyCard(props) {
  return (
    <>
      <div className="card p-3 border-primary mb-3">
        <div className="row border-bottom border-primary">
          <div className="col-8 text-primary">
            <img src="diamond.svg" alt />
            購買資訊
          </div>
          <div className="col-2">數量</div>
          <div className="col-2 mb-2">價格</div>
        </div>
        <div className="row align-items-center mb-2">
          <div className="col-3">
            <div className="cart-photo">
              <img src="/images/lease/15-fd1149TU.png" alt />
            </div>
          </div>
          <div className="col-5">15-fd1149TU</div>
          <div className="col-2">
            <input type="number" defaultValue={1} className="w-50" />
          </div>
          <div className="col-2">$1000</div>
        </div>
      </div>
    </>
  )
}

import React, { useState, useEffect } from 'react'

export default function BuyItemCard(props) {
  return (
    <>
      <div className="card p-3 border-primary mb-3">
        <div className="row align-items-center mb-2">
          <div className="col-6 text-primary">
            <img src="diamond.svg" alt />
            商品資訊
          </div>
          <div className="col-2 ">單價</div>
          <div className="col-2">數量</div>
          <div className="col-2 ">小計</div>
          <div className="col-1 mb-2"></div>
        </div>
        <div className="row align-items-center mb-2">
          <div className="col-2">
            <div className="cart-photo">
              <img src="" alt="" width={500} height={500} />
            </div>
          </div>
          <div className="col-4">XXX</div>
          <div className="col-2">1000元</div>
          <div className="col-2">1</div>
          <div className="col-2">1000元</div>
        </div>
      </div>
    </>
  )
}

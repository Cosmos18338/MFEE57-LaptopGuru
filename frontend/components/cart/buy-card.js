'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function BuyCard(props) {
  const { item } = props

  const handleUpdate = async () => {
    const response = await fetch('http://localhost:3005/api/cart/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: item.user_id,
        product_id: item.product_id,
        quantity: item.quantity,
      }),
    })

    const data = await response.json()
    const message = data.message
  }
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
              <Image
                src={`/data/${item.product_img_path}`}
                alt={item.model}
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="col-5">{item.model}</div>
          <div className="col-2">
            <input
              type="number"
              defaultValue={item.quantity}
              className="w-50"
            />
          </div>
          <div className="col-2">{item.list_price * item.quantity}</div>
        </div>
      </div>
    </>
  )
}

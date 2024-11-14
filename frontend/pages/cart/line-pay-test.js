import React, { useState, useEffect, use } from 'react'
import { useAuth } from '@/hooks/use-auth'

export default function LinePayTest(props) {
  const { auth } = useAuth()
  const { userData } = auth
  const { user_id } = userData

  const [amount, setAmount] = useState(1000)
  const [product, setProduct] = useState({
    product_id: 1,
    product_name: 'product',
    product_price: 1000,
  })

  const handleLinePay = async () => {
    const res = await fetch(`http://localhost:3005/api/line-pay/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        amount: amount,
        products: product.product_name,
      }),
    })

    const data = await res.json()
    console.log(data)
  }

  return (
    <>
      <h3>userID: {user_id}</h3>
      <h3>amount: {amount}</h3>
      <h3>product_id: {product.product_name}</h3>
      <button className="btn btn-primary text-light" onClick={handleLinePay}>
        前往line-pay
      </button>
    </>
  )
}

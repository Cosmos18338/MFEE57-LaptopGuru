import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Checkout(props) {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const order_id = urlParams.get('order_id')
    const amount = urlParams.get('amount')

    if (order_id) {
      handleUpdate(order_id)
      MySwal.fire({
        icon: 'success',
        title: `訂單編號: ${order_id}已建立成功, 金額: ${amount} 元`,
        showConfirmButton: false,
        timer: 1500,
      })
    }

    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1500)

    const handleUpdate = async (order_id) => {
      const result = await fetch(`http://localhost:3005/api/order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: order_id,
        }),
      })

      const data = await result.json()
      if (data.status === 'success') {
        console.log('update success')
      }
    }
  }, [])
  //   const urlParams = new URLSearchParams(window.location.search)
  //   const order_id = urlParams.get('order_id')

  //   if (order_id) {
  //     MySwal.fire({
  //       icon: 'success',
  //       title: `訂單編號: ${order_id}已建立`,
  //       showConfirmButton: false,
  //       timer: 1500,
  //     })
  //   }

  return (
    <>
      <Link href="/dashboard">
        <div className={`btn btn-primary`}>回到會員中心</div>
      </Link>
    </>
  )
}

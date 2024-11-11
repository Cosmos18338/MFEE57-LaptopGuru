import Coupon from '@/components/coupon'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import BuyList from '@/components/dashboard/buy-list'
import { useAuth } from '@/hooks/use-auth'
import { data } from 'jquery'

export default function Test(props) {
  const [order, setOrder] = useState([])
  const [orderDetail, setOrderDetail] = useState([])
  const { auth } = useAuth()
  const { userData } = auth
  const user_id = userData.user_id

  const getOrder = async () => {
    const res = await fetch(`http://localhost:3005/api/buy-list/${user_id}`)
    const data = await res.json()

    if ((data.status == 'success') & !data.data) {
      return setOrder([])
    }
    setOrder(data.data)
  }

  const getOrderDetail = async () => {
    const res = await fetch(
      `http://localhost:3005/api/buy-list/detail/${user_id}`
    )
    const data = await res.json()
    setOrderDetail(data.data)
  }

  useEffect(() => {
    getOrder()
  }, [user_id])

  useEffect(() => {
    if (order.length > 0) {
      getOrderDetail()
    }
  }, [order, user_id])

  return (
    <>
      <div>123</div>
    </>
  )
}

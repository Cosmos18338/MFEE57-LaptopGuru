import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import Accordion from 'react-bootstrap/Accordion'
import BuyItemCard from './buy-item-card'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function BuyList(order) {
  const [orderDetail, setOrderDetail] = useState([])
  const [alreadyPay, setAlreadyPay] = useState(false)
  const order_id = order.order.order_id
  const order_date = order.order.create_time

  const getOrderDetail = async () => {
    const res = await fetch(
      `http://localhost:3005/api/buy-list/detail/${order_id}`
    )
    const data = await res.json()
    setOrderDetail(data.data)
  }

  useEffect(() => {
    console.log(order_id)
  }, [order_id])

  useEffect(() => {
    if (order_id) {
      getOrderDetail()
    }
    // console.log(orderDetail)
  }, [order_id])

  useEffect(() => {
    if (order.order.already_pay == 1) {
      setAlreadyPay(true)
    }
  }, [order])

  return (
    <>
      <Accordion defaultActiveKey="0" className="mb-3">
        <Accordion.Item eventKey="0" className="border-primary">
          <Accordion.Header>
            <div className="col-6">訂單編號: {order_id}</div>
            <div className="col-4">訂單日期: {order_date}</div>
            <div className="col-1">
              {alreadyPay ? (
                <div className="btn btn-success">已付款</div>
              ) : (
                <div className="btn btn-danger">未付款</div>
              )}
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {orderDetail.map((item, index) => {
              return <BuyItemCard key={index} item={item} />
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

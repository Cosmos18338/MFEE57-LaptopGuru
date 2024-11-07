import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import BuyCard from '@/components/cart/buy-card'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const accessToken = Cookies.get('accessToken')
console.log(accessToken) // 顯示 accessToken 的值

export default function CartIndex() {
  const [category, setCategory] = useState('lease')
  const { auth } = useAuth()
  const { userData } = auth
  const router = useRouter()
  const [cartdata, setCartdata] = useState([])

  const user_id = userData?.user_id

  const handleCheckboxChange = (selectedCategory) => {
    setCategory(selectedCategory)
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`http://localhost:3005/api/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user_id }),
      })

      const data = await result.json()
      const arrData = data.data
      console.log(arrData)
      setCartdata(arrData)
      console.log(cartdata)
    }

    if (user_id) {
      fetchData()
    }
  }, [user_id])

  return (
    <>
      <div className="tilte d-flex mb-3">
        <div className="logo border-end me-3">
          <img src="/logo-black.svg" alt />
        </div>
        <div className="h2 align-items-center">
          <h2>購物車</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-8 cart h-100">
          {cartdata && cartdata.length > 0 ? (
            cartdata.map((item) => (
              <BuyCard key={item.product_id} item={item} />
            ))
          ) : (
            <p>購物車是空的</p>
          )}
        </div>
        <div className="col bill h-50">
          <div className="card p-3 border-primary">
            <div className="row border-bottom border-primary mb-2 pb-2">
              <div className="col-6 text-primary">
                <img src="/diamond.svg" alt />
                清單資訊
              </div>
            </div>
            <div className="row border-bottom border-primary mb-2 pb-2">
              <div className="row">
                <div className="col">商品總計</div>
                <div className="col-auto">$20000</div>
              </div>
              <div className="row">
                <div className="col">運費總計</div>
                <div className="col-auto">$200</div>
              </div>
            </div>
            <div className="row border-bottom border-primary mb-2 pb-2">
              <div className=" d-flex justify-content-center">
                <button
                  className="btn btn-primary w-50  text-light"
                  type="button"
                >
                  使用優惠券
                </button>
              </div>
            </div>
            <div className>
              <div className="total row w-100 mb-2">
                <div className="col">總計</div>
                <div className="col-auto">$20000</div>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary w-50 text-light">
                  結帳
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

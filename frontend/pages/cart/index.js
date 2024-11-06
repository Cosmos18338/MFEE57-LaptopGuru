import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import LeaseCard from '@/components/cart/lease-card'
import BuyCard from '@/components/cart/buy-card'
import { useRouter } from 'next/router'

export default function CartIndex() {
  const [category, setCategory] = useState('lease')
  const router = useRouter()
  const { auth } = useAuth()
  const { isAuth } = auth

  useEffect(() => {
    // if (!isAuth) {
    //   router.push('/login')
    // }
    console.log('isAuth:', isAuth)
  }, [])

  const handleCheckboxChange = (selectedCategory) => {
    setCategory(selectedCategory)
  }

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
      <div className="check-box mb-3">
        <form action className="d-flex">
          <div className="form-check">
            <input
              type="checkbox"
              checked={category === 'buy'}
              onChange={() => handleCheckboxChange('buy')}
            />
            <label htmlFor="buy">購買</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              checked={category === 'lease'}
              onChange={() => handleCheckboxChange('lease')}
            />
            <label htmlFor="lease">租賃</label>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-8 cart h-100">
          {category == 'lease' ? <LeaseCard /> : <BuyCard />}
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

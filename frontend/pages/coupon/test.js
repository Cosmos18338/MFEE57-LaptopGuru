import React, { useState, useEffect } from 'react'
import Coupon from '@/components/coupon'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CouponBtn from '@/components/coupon/coupon-btn' 


const MySwal = withReactContent(Swal)

export default function Checkout() {
  const [selectedProduct, setSelectedProduct] = useState({
    id: 1,
    price: 1500  // 從資料庫獲取
  })
  
  const [coupon, setCoupon] = useState(null)
  
  return (
    <div>
      <h1>結帳</h1>
      
      <div className="card mb-3">
        <div className="card-body">
          <h5>商品金額: ${selectedProduct.price}</h5>
          {coupon && (
            <>
              <h5 className="text-success">
                折扣金額: -${coupon.discountAmount}
              </h5>
              <h4>應付金額: ${coupon.finalPrice}</h4>
            </>
          )}
        </div>
      </div>

      <CouponBtn 
        price={selectedProduct.price}
        setCouponValue={setCoupon}
      />
    </div>
  )
}
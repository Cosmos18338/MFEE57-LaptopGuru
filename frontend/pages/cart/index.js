import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import BuyCard from '@/components/cart/buy-card'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useShip711StoreOpener } from '@/hooks/use-ship-711-store'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const accessToken = Cookies.get('accessToken')
console.log(accessToken) // 顯示 accessToken 的值

export default function CartIndex() {
  const { auth } = useAuth()
  const { userData } = auth
  const [cartdata, setCartdata] = useState([])
  // const [total, setTotal] = useState(0)
  const [order, setOrder] = useState({
    order_id: '',
    amount: '',
  })
  const [couponAll, setCouponAll] = useState([])
  const [ship, setShip] = useState('')
  const [address, setAddress] = useState('')

  const user_id = userData.user_id ? userData.user_id : ''
  const country = userData.country ? userData.country : ''
  const city = userData.city ? userData.city : ''
  const district = userData.district ? userData.district : ''
  const road_name = userData.road_name ? userData.road_name : ''
  const detail_address = userData.detailed_address
    ? userData.detailed_address
    : ''
  let nowAddress = `${country}${city}${district}${road_name}${detail_address}`
  if (nowAddress === 'undefined') {
    nowAddress = ''
  }

  useEffect(() => {
    setAddress(nowAddress)
  }, [nowAddress])

  // 處理遞增
  const handle = (itemId, newQuantity) => {
    const nextProducts = cartdata.map((v, i) => {
      // 這裡判斷id值是否等於productId，如果是就count屬性遞增

      if (v.id === itemId) {
        return { ...v, quantity: newQuantity }
      } else {
        return v
      }
    })

    setCartdata(nextProducts)
  }

  const handleAddress = (targetAddress) => {
    setAddress(targetAddress)
    MySwal.fire({
      icon: 'success',
      title: '選擇門市成功',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const searchCoupon = async () => {
    const [result] = await fetch(
      `http://localhost:3005/api/coupon/${user_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await result.json()
    const coupons = data.data
    setCouponAll(coupons)
  }

  // 處理7-11選擇
  const { store711, openWindow } = useShip711StoreOpener(
    'http://localhost:3005/api/shipment/711',
    { autoCloseMins: 3 } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
  )

  // 產生訂單
  const createOrder = async () => {
    if (cartdata == null) {
      MySwal.fire({
        icon: 'error',
        title: '購物車是空的',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }

    if (ship == '') {
      MySwal.fire({
        icon: 'error',
        title: '請選擇運送方式',
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }

    if (ship == '7-11') {
      if (store711.storeid == '') {
        MySwal.fire({
          icon: 'error',
          title: '請選擇7-11門市',
          showConfirmButton: false,
          timer: 1500,
        })
        return
      }
    }

    const result = await fetch(`http://localhost:3005/api/cart/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        amount: total,
        coupon_id: '',
        detail: cartdata,
        address: address,
      }),
    })

    const data = await result.json()
    const order_id = data.order_id
    // const id = data.id
    if (data.status === 'success') {
      setOrder({ order_id: order_id, amount: total })
      setCartdata([])
      setAddress('')
      localStorage.removeItem('store711')
      if (window.confirm('確認要導向至ECPay進行付款?')) {
        // 先連到node伺服器後，導向至ECPay付款頁面
        window.location.href = `http://localhost:3005/api/ecpay-test-only?orderId=${order_id}`
      }
    }
  }

  // // 送到綠界
  // const goECPay = (order_id, amount) => {
  //   if (window.confirm('確認要導向至ECPay進行付款?')) {
  //     // 先連到node伺服器後，導向至ECPay付款頁面
  //     window.location.href = `http://localhost:3005/api/ecpay/payment?orderId=${order_id}&amount=${amount}`
  //   }
  // }

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
      setCartdata(arrData)
    }

    if (user_id) {
      fetchData()
    }
  }, [user_id])

  // useEffect(() => {
  //   searchCoupon()
  // }, [user_id])

  // useEffect(() => {
  //   if (cartdata.length > 0) {
  //     let total = 0
  //     cartdata.forEach((item) => {
  //       total += item.list_price * item.quantity
  //       setTotal(total)
  //     })
  //   }
  // }, [cartdata])

  const total = cartdata
    ? cartdata.reduce((acc, v) => acc + Number(v.quantity) * v.list_price, 0)
    : 0

  return (
    <>
      <div className="tilte d-flex mb-3">
        <div className="logo border-end me-3">
          <img src="/logo-black.svg" />
        </div>
        <div className="h2 align-items-center">
          <h2>購物車</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-9 cart h-100">
          {cartdata && cartdata.length > 0 ? (
            cartdata.map((item) => (
              <BuyCard
                key={item.product_id}
                item={item}
                onDataChange={(newQuantity) => {
                  // console.log(item.quantity)
                  handle(item.product_id, newQuantity)
                  if (newQuantity === 0) {
                    setCartdata(
                      cartdata.filter((v) => v.product_id !== item.product_id)
                    )
                  }
                }}
              />
            ))
          ) : (
            <p>購物車是空的</p>
          )}
        </div>
        <div className="col bill h-50">
          <div className="card p-3 border-primary">
            <div className="row border-bottom border-primary mb-2 pb-2">
              <div className="col-6 text-primary">
                <img src="/diamond.svg" />
                清單資訊
              </div>
            </div>
            <div className="row border-bottom border-primary mb-2 pb-2">
              <div className="row">
                <div className="col">商品總計</div>
                <div className="col-auto">{total}元</div>
              </div>
              <div className="row">
                <div className="col">運費總計</div>
                <div className="col-auto">
                  {ship == '' && '0'}
                  {ship == '7-11' && '60'}
                  {ship == '宅配' && '200'}元
                </div>
              </div>
            </div>
            <div className="row border-bottom border-primary mb-2 pb-2">
              <div className="text-center mb-2">
                <select className="form-select border-primary">
                  <option value="" selected disabled>
                    選擇運送方式
                  </option>
                  <option value="宅配">宅配</option>
                  <option value="7-11">7-11</option>
                </select>
              </div>
              <div className="text-center mb-2">
                <select
                  className="form-select border-primary"
                  onChange={(e) => {
                    setShip(e.target.value)
                  }}
                >
                  <option value="" selected disabled>
                    選擇運送方式
                  </option>
                  <option value="宅配">宅配</option>
                  <option value="7-11">7-11</option>
                </select>
              </div>
              <div className="address">
                {ship === '7-11' && (
                  <>
                    <div className="d-flex justify-content-center mb-2">
                      <button
                        className="btn btn-primary w-50  text-light"
                        onClick={() => {
                          openWindow()
                        }}
                      >
                        選擇門市
                      </button>
                    </div>
                    <div className="d-flex justify-content-center mb-2">
                      <input
                        type="text"
                        className="border-primary form-control"
                        value={store711.storename}
                        disabled
                      />
                    </div>
                    <div className="d-flex justify-content-center mb-2">
                      <input
                        type="text"
                        className="border-primary form-control"
                        value={store711.storeaddress}
                        disabled
                      />
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-primary text-light w-50"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAddress(store711.storeaddress)
                        }}
                      >
                        確認收件門市
                      </button>
                    </div>
                  </>
                )}
                {ship === '宅配' && (
                  <>
                    <div className="d-flex justify-content-center mb-2">
                      <input
                        type="text"
                        className="border-primary form-control"
                        value={address}
                        onChange={(e) => {
                          e.preventDefault()
                          setAddress(e.target.value)
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="discount row w-100 mb-2">
                <div className="col">折價</div>
                <div className="col-auto">200元</div>
              </div>
              <div className="total row w-100 mb-2">
                <div className="col">總計</div>
                <div className="col-auto">{total}元</div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary w-50 text-light"
                  onClick={async (e) => {
                    e.preventDefault()

                    await createOrder()
                    // console.log(address)
                  }}
                >
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

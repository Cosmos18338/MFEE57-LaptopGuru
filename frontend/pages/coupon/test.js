import React, { useState, useEffect } from 'react'
import Coupon from '@/components/coupon'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function CouponList({ setCouponValue = () => {} }) {
  const [couponDataList, setCouponDataList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('') // 搜尋關鍵字

  const userId = 1

  const getCouponData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3005/api/coupon-user/${userId}`)

      if (!res.ok) {
        throw new Error('請求失敗')
      }

      const resData = await res.json()
      console.log('優惠券資料:', resData)

      if (resData.status === 'success') {
        setCouponDataList(resData.data)

        if (resData.data.length === 0) {
          MySwal.fire({
            title: '提示',
            text: '目前沒有可用的優惠券',
            icon: 'info',
          })
        }
      } else {
        throw new Error(resData.message || '獲取資料失敗')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
      MySwal.fire({
        title: '錯誤',
        text: err.message,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCouponData()
  }, [])

  // 搜尋功能
  const filteredCoupons = couponDataList.filter((coupon) => {
    const searchContent = searchTerm.toLowerCase()
    return (
      coupon.coupon_content.toLowerCase().includes(searchContent) ||
      coupon.coupon_code.toLowerCase().includes(searchContent) ||
      String(coupon.coupon_discount).includes(searchContent)
    )
  })

  const couponModal = (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        選擇優惠券
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                選擇優惠券
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            {/* 搜尋欄位 */}
            <div className="modal-header border-0 pb-0">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="搜尋優惠券..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="modal-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">載入中...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                // 修改這裡的 className，加入 d-flex justify-content-center
                <div className="row g-3 d-flex justify-content-center">
                  {filteredCoupons.length === 0 ? (
                    <div className="col-12 text-center py-4">
                      <p className="text-muted">
                        {searchTerm
                          ? '找不到符合的優惠券'
                          : '目前沒有可用的優惠券'}
                      </p>
                    </div>
                  ) : (
                    filteredCoupons.map((coupon) => (
                      <div
                        // 修改 col-12 為較小的寬度，例如 col-md-8
                        className="col-12 col-md-8"
                        key={coupon.id}
                        onClick={() => {
                          setCouponValue(coupon)
                          setSearchTerm('')
                        }}
                        style={{
                          cursor: 'pointer',
                          // 可以加入一些額外的樣式
                          transition: 'transform 0.2s',
                          ':hover': {
                            transform: 'scale(1.02)',
                          },
                        }}
                        data-bs-dismiss="modal"
                      >
                        <div className="d-flex justify-content-center">
                          <Coupon
                            coupon_id={coupon.coupon_id}
                            coupon_code={coupon.coupon_code}
                            coupon_content={coupon.coupon_content}
                            coupon_discount={coupon.coupon_discount}
                            discount_method={coupon.discount_method}
                            coupon_start_time={coupon.coupon_start_time}
                            coupon_end_time={coupon.coupon_end_time}
                            isValid={coupon.user_coupon_valid === 1}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return <>{couponModal}</>
}

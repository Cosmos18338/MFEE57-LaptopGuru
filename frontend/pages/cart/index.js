import React from 'react'

export default function CartIndex() {
  return (
    <>
      <div>
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
              <input type="checkbox" />
              <label htmlFor>全部</label>
            </div>
            <div className="form-check">
              <input type="checkbox" />
              <label htmlFor>購買</label>
            </div>
            <div className="form-check">
              <input type="checkbox" defaultChecked />
              <label htmlFor>租賃</label>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col-8 cart">
            <div className="card p-3 border-primary mb-3">
              <div className="row border-bottom border-primary">
                <div className="col-8 text-primary">
                  <img src="/diamond.svg" alt />
                  租賃資訊
                </div>
                <div className="col-2">數量</div>
                <div className="col-2 mb-2">價格</div>
              </div>
              <div className="row align-items-center border-bottom border-primary mb-2">
                <div className="col-3">
                  <div className="photo">
                    <img src="/images/lease/15-fd1149TU.png" alt />
                  </div>
                </div>
                <div className="col-5">15-fd1149TU</div>
                <div className="col-2">
                  <input type="number" defaultValue={1} className="w-50" />
                </div>
                <div className="col-2">$1000</div>
              </div>
              <div className="row align-items-center">
                <div className="col-8 text-primary">租賃時間~到期時間</div>
                <div className="col d-flex justify-content-between">
                  <div className="start-time">2024-11-20</div>
                  <div>~</div>
                  <div className="end-time">2024-12-20</div>
                </div>
              </div>
            </div>
            <div className="card p-3 border-primary mb-3">
              <div className="row border-bottom border-primary">
                <div className="col-8 text-primary">
                  <img src="/diamond.svg" alt />
                  租賃資訊
                </div>
                <div className="col-2">數量</div>
                <div className="col-2 mb-2">價格</div>
              </div>
              <div className="row align-items-center border-bottom border-primary mb-2">
                <div className="col-3">
                  <div className="photo">
                    <img src="/images/lease/15-fd1149TU.png" alt />
                  </div>
                </div>
                <div className="col-5">15-fd1149TU</div>
                <div className="col-2">
                  <input type="number" defaultValue={1} className="w-50" />
                </div>
                <div className="col-2">$1000</div>
              </div>
              <div className="row align-items-center">
                <div className="col-8 text-primary">租賃時間~到期時間</div>
                <div className="col d-flex justify-content-between">
                  <div className="start-time">2024-11-20</div>
                  <div>~</div>
                  <div className="end-time">2024-12-20</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col bill">
            <div className="card p-3 border-primary">
              <div className="row border-bottom border-primary mb-2 pb-2">
                <div className="col-6 text-primary">
                  <img src="./assets/diamond.svg" alt />
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
                  <button className="btn btn-primary w-50" type="button">
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
                  <button className="btn btn-primary w-50">結帳</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

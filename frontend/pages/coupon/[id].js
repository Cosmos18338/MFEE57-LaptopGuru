import React from 'react'
import { Nav, Tab } from 'react-bootstrap'
import LeftAside from '@/components/dashboard/leftAside'
// import FileManagementTable from '@/components/dashboard/userInfoEdit'
import CardExample from '@/components/bootstrap/cards'
import Coupon from '@/components/coupon'
import UserProfile from '@/components/dashboard/userInfoEdit'

export default function CouponPage() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <LeftAside />
        <div className="col-md-9">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="coupon-record"
          >
            <Nav
              variant="tabs"
              className="mb-3"
              fill
              style={{ '--bs-nav-link-color': '#805AF5' }}
            >
              <Nav.Item>
                <Nav.Link eventKey="home">會員中心</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="shopping-record">購買清單</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="lease-record">租賃清單</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="coupon-record">優惠券</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="blog-record">文章</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="activity-record">活動</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="group-record">揪團</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="home">
                <div>
                  <UserProfile />
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="shopping">
                <div>
                  <h4>購買清單</h4>
                  <CardExample />
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="coupon-record">
                <div className="container">
                  {/* 篩選器區域 */}
                  <div className="filter-section mb-4">
                    <div className="d-flex align-items-center">
                      <span className="me-3">狀態篩選</span>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        style={{
                          color: '#805AF5',
                          borderColor: '#805AF5',
                          '&:hover': {
                            backgroundColor: '#805AF5',
                            color: 'white',
                          },
                        }}
                      >
                        未使用
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        style={{
                          color: '#805AF5',
                          borderColor: '#805AF5',
                          '&:hover': {
                            backgroundColor: '#805AF5',
                            color: 'white',
                          },
                        }}
                      >
                        已使用
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{
                          color: '#805AF5',
                          borderColor: '#805AF5',
                          '&:hover': {
                            backgroundColor: '#805AF5',
                            color: 'white',
                          },
                        }}
                      >
                        已過期
                      </button>
                    </div>
                  </div>

                  {/* 優惠券網格 */}
                  <div className="row g-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div key={index} className="col-md-6">
                        <Coupon />
                      </div>
                    ))}
                  </div>

                  {/* 分頁 */}
                  <div className="pagination-section mt-4">
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-center">
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="coupon-record">
                <div className="container">
                  <div className="discount-code-section mb-4">
                    <div className="d-flex align-items-center">
                      <div
                        className="input-group"
                        style={{ maxWidth: '400px' }}
                      >
                        <span
                          className="input-group-text"
                          style={{ backgroundColor: '#805AF5', color: 'white' }}
                        >
                          折扣碼
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="請輸入您的折扣碼"
                          aria-label="Discount code"
                        />
                        <button
                          className="btn btn-primary"
                          type="button"
                          style={{
                            backgroundColor: '#805AF5',
                            borderColor: '#805AF5',
                          }}
                        >
                          使用
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 優惠券網格 */}
                  <div className="row g-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div key={index} className="col-md-6">
                        <Coupon />
                      </div>
                    ))}
                  </div>

                  {/* 分頁 */}
                  <div className="pagination-section mt-4">
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-center">
                        <li className="page-item">
                          <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  )
}

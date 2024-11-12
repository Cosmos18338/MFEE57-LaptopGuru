import React from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { FaPenFancy } from 'react-icons/fa'
import { useAuth } from '@/hooks/use-auth'
import CardExample from '@/components/bootstrap/cards'
import UserProfile from '@/components/dashboard/userInfoEdit'
import MembershipLevels from './membership-levels'
import EventManagement from '@/components/event/EventManagement'
import GroupManagement from '@/components/group/GroupManagement'
import CouponQuery from '@/components/coupon/no-coupon-query-components'
import CouponList from '../coupon/test'

export default function Dashboard() {
  const { auth, setAuth } = useAuth()

  return (
    <div className="container">
      <div className="row">
        <Tab.Container id="dashboard-tabs" defaultActiveKey="home">
          {/* Left Sidebar */}
          <div className="col-md-3">
            <div className="text-center mb-4">
              <img
                src={
                  auth?.userData?.image_path ||
                  'https://via.placeholder.com/70x70'
                }
                alt="Profile"
                className="rounded-circle img-fluid mb-3"
                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
              />
              <h5 className="mb-2">{auth?.userData?.name}</h5>
              <button
                className="btn btn-outline-primary btn-sm mb-3"
                style={{ color: '#805AF5', borderColor: '#805AF5' }}
              >
                <FaPenFancy />
                編輯個人簡介
              </button>
            </div>

            {/* 左側導航 - 與上方導航連動 */}
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="favorites" className="text-center">
                  收藏清單
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="membership" className="text-center">
                  會員等級
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          {/* Main Content Area */}
          <div className="col-md-9">
            {/* 上方導航 - 與左側導航連動 */}
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

            {/* 共用的內容區域 */}
            <Tab.Content>
              <Tab.Pane eventKey="home">
                <div className="row justify-content-end">
                  <UserProfile />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="shopping-record">
                <div>
                  <h4>購買清單</h4>
                  <CardExample />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="lease-record">
                <div>
                  <h4>租賃清單</h4>
                  <p>這裡是租賃清單的內容。</p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="coupon-record">
                <div>
                  <h4>優惠券</h4>
                  <p>這裡是優惠券的內容。</p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="blog-record">
                <div>
                  <h4>文章列表</h4>
                  <p>這裡是文章列表的內容。</p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="activity-record">
                <div>
                  <h4>活動列表</h4>
                  <EventManagement />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="group-record">
                <div>
                  <h4>揪團列表</h4>
                  <GroupManagement />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="favorites">
                <div>
                  <h4>收藏清單</h4>
                  <p>這裡是收藏清單的內容。</p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="membership">
                <div>
                  <MembershipLevels />
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </div>
  )
}

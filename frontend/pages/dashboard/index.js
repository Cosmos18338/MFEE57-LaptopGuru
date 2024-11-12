import React, { useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { FaPenFancy } from 'react-icons/fa';
import { useAuth } from '@/hooks/use-auth';
import CardExample from '@/components/bootstrap/cards';
import UserProfile from '@/components/dashboard/userInfoEdit';
import MembershipLevels from './membership-levels';
import CouponList from '../coupon/test';

export default function Test1() {
  const { auth, setAuth } = useAuth();
  const [activeKey, setActiveKey] = useState('home');

  // 定義不同頁籤對應的左側導航配置
  const sideNavConfigs = {
    'home': [
      { key: 'favorites', label: '收藏清單' },
      { key: 'membership', label: '會員等級' }
    ],
    'shopping-record': [
      { key: 'all-orders', label: '全部訂單' },
      { key: 'processing', label: '處理中' },
      { key: 'completed', label: '已完成' }
    ],
    'coupon-record': [
      { key: 'available', label: '可使用' },
      { key: 'used', label: '已使用' },
      { key: 'expired', label: '已過期' }
    ],
    'blog-record': [
      { key: 'my-posts', label: '我的文章' },
      { key: 'drafts', label: '草稿' }
    ],
    'activity-record': [
      { key: 'upcoming', label: '即將參加' },
      { key: 'past', label: '歷史活動' }
    ],
    'group-record': [
      { key: 'my-groups', label: '我的揪團' },
      { key: 'joined', label: '已參加' }
    ]
  };

  const getCurrentSideNav = () => {
    return sideNavConfigs[activeKey] || [];
  };

  return (
    <div className="container">
      <div className="row">
        <Tab.Container 
          id="dashboard-tabs" 
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
        >
          {/* Left Sidebar */}
          <div className="col-md-3">
            <div className="text-center">
              <img
                src={auth?.userData?.image_path || 'https://via.placeholder.com/70x70'}
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

            {/* 左側導航 - 動態根據上方選擇改變 */}
            <Nav className="flex-column">
              {getCurrentSideNav().map((item) => (
                <Nav.Item key={item.key}>
                  <Nav.Link eventKey={item.key} className="text-center">
                    {item.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>

          {/* Main Content Area */}
          <div className="col-md-9">
            {/* 上方導航 */}
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

            {/* 內容區域 */}
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
              <Tab.Pane eventKey="coupon-record">
                <div>
                  <h4>優惠券</h4>
                  <CouponList />
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
                  <p>這裡是活動的內容。</p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="group-record">
                <div>
                  <h4>揪團列表</h4>
                  <p>這裡是揪團的內容。</p>
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
  );
}
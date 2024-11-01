import React , { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss' // 假設你有一個樣式檔案
import MembershipLevels from '@/pages/dashboard/membership-levels'
import LeftAside from '@/components/dashboard/leftAside'
import CardExample from '@/components/bootstrap/cards'
import UserProfile from '@/components/dashboard/userInfoEdit'



export default function Dashboard() {
 
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <LeftAside />
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className={`mb-5 col-md-9 $primary`}
          fill
        >
          <Tab className="align-items-center" eventKey="home" title="會員中心">
            <div>
              <UserProfile />
            </div>
          </Tab>
          <Tab eventKey="shopping-record" title="購買清單">
            <div>
              <h4>購買清單components\bootstrap\cards.js</h4>
              <CardExample/>
            </div>
          </Tab>
          <Tab eventKey="lease-record" title="租賃清單">
            <div className='col-6'>
              <h4>Link Tab Content</h4>
              <p>這裡是另一個連結對應的內容。</p>
            </div>
          </Tab>
          <Tab eventKey="coupon-record" title="優惠券">
            <div>
              <h4>Link Tab Content</h4>
              <p>這裡是另一個連結對應的內容。</p>
            </div>
          </Tab>
          <Tab eventKey="blog-record" title="文章">
            <div>
              <h4>Link Tab Content</h4>
              <p>這裡是另一個連結對應的內容。</p>
            </div>
          </Tab>
          <Tab eventKey="activity-record" title="活動">
            <div>
              <h4>Link Tab Content</h4>
              <p>這裡是活動。</p>
            </div>
          </Tab>
          <Tab eventKey="group-record" title="揪團">
           
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import FileManagementTable from '@/components/dashboard/userInfoEdit'
import MembershipLevels from '@/pages/dashboard/membership-levels'
import LeftAside from '@/components/dashboard/leftAside'
import CardExample from '@/components/bootstrap/cards'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { auth } = useAuth() // 從 auth context 獲取用戶資訊
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      // 確保有 user_id 才發送請求
      // ?.是一種可選鏈 (Optional Chaining) 運算符。它讓你在訪問一系列嵌套屬性時更安全、更簡潔。例如，auth?.userData?.user_id (最後一個是屬性)表示如果 auth 或 userData 是 null 或 undefined，則直接返回 undefined 而不會拋出錯誤。
      if (!auth?.userData?.user_id) return

      try {
        const response = await fetch(
          `http://localhost:3005/api/dashboard/${auth.userData.user_id}`,
          {
            credentials: 'include', // 添加這個確保送出 cookie
          }
        )
        const result = await response.json()

        if (result.status === 'success') {
          // 改用 result 而不是 response
          setData(result.data)
        } else {
          console.error('獲取資料失敗:', result.message)
        }
      } catch (error) {
        console.error('無法取得資料:', error)
      }
    }

    fetchData()
  }, [auth?.userData?.user_id]) // 相依於 user_id 的變化

  // 可以添加載入中的狀態顯示

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
              <FileManagementTable />
            </div>
          </Tab>
          <Tab eventKey="shopping-record" title="購買清單">
            <div>
              <h4>購買清單components\bootstrap\cards.js</h4>
              <CardExample />
            </div>
          </Tab>
          <Tab eventKey="lease-record" title="租賃清單">
            <div className="col-6">
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
          <Tab eventKey="group-record" title="揪團"></Tab>
        </Tabs>
      </div>
    </div>
  )
}

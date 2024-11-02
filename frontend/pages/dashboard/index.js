import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import styles from '@/styles/dashboard.module.scss'
import MembershipLevels from '@/pages/dashboard/membership-levels'
import LeftAside from '@/components/dashboard/leftAside'
import CardExample from '@/components/bootstrap/cards'
import UserProfile from '@/components/dashboard/userInfoEdit'
import { useAuth } from '@/hooks/use-auth' // 假設你有這個 hook

export default function Dashboard() {
  const [data, setData] = useState(null) // 添加 state
  const { auth } = useAuth() // 從 auth context 獲取用戶資訊
  
  useEffect(() => {
    const fetchData = async () => {
      // 確保有 userId 才發送請求
      if (!auth?.userData?.id) return

      try {
        const response = await fetch(
          `http://localhost:3005/api/dashboard/${auth.userData.id}`,
          {
            credentials: 'include', // 添加這個確保送出 cookie
          }
        )
        const result = await response.json()
        
        if (result.status === 'success') { // 改用 result 而不是 response
          setData(result.data)
        } else {
          console.error('獲取資料失敗:', result.message)
        }
      } catch (error) {
        console.error('無法取得資料:', error)
      }
    }

    fetchData()
  }, [auth?.userData?.id]) // 相依於 userId 的變化

  // 可以添加載入中的狀態顯示
  if (!auth?.userData?.id) {
    return <div>請先登入...</div>
  }

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
              <UserProfile data={data} /> {/* 將資料傳遞給子組件 */}
            </div>
          </Tab>
          <Tab eventKey="shopping-record" title="購買清單">
            <div>
              <h4>購買清單components\bootstrap\cards.js</h4>
              <CardExample />
            </div>
          </Tab>
          {/* 其他 Tab 保持不變 */}
        </Tabs>
      </div>
    </div>
  )
}
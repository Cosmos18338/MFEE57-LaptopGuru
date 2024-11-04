import { useState } from 'react'
import EventCard from '@/components/event/EventCard'
import Carousel from '@/components/event/Carousel'
import EventNavbar from '@/components/event/EventNavbar'

// 分頁標籤組件
const EventTabs = () => {
  const [activeTab, setActiveTab] = useState('所有活動')
  const tabs = ['所有活動', '進行中', '報名中', '已結束']

  return (
    <div className="event-nav-container">
      <ul className="nav nav-underline justify-content-center gap-5">
        {tabs.map((tab) => (
          <li key={tab} className="nav-item">
            <a
              className={`nav-link event-nav-link ${
                activeTab === tab ? 'active' : ''
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setActiveTab(tab)
              }}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
      <div className="event-nav-line" />
    </div>
  )
}

// 分頁導航組件
const Pagination = () => {
  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 30

  // 生成頁碼數組
  const generatePaginationItems = () => {
    let items = []

    // 添加第一頁
    items.push(1)

    // 當前頁附近的頁碼
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    // 添加省略號
    if (start > 2) {
      items.push('...')
    }

    // 添加中間的頁碼
    for (let i = start; i <= end; i++) {
      items.push(i)
    }

    // 添加省略號
    if (end < totalPages - 1) {
      items.push('...')
    }

    // 添加最後一頁
    if (totalPages > 1) {
      items.push(totalPages)
    }

    return items
  }

  // 處理頁面切換
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="event-pagination-container">
      <ul className="event-pagination-list">
        {/* 上一頁按鈕 */}
        <li
          className={`event-pagination-item ${
            currentPage === 1 ? 'disabled' : ''
          }`}
        >
          <button
            className="event-pagination-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⟨
          </button>
        </li>

        {/* 頁碼 */}
        {generatePaginationItems().map((item, index) => (
          <li
            key={`page-${index}`}
            className={`event-pagination-item ${
              item === currentPage ? 'active' : ''
            } ${item === '...' ? 'disabled' : ''}`}
          >
            <button
              className="event-pagination-link"
              onClick={() => item !== '...' && handlePageChange(item)}
              disabled={item === '...'}
            >
              {item}
            </button>
          </li>
        ))}

        {/* 下一頁按鈕 */}
        <li
          className={`event-pagination-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <button
            className="event-pagination-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ⟩
          </button>
        </li>
      </ul>
    </div>
  )
}

// 主要組件
export default function Event() {
  return (
    <>
      <Carousel />
      <div className="event-wrapper">
        <EventNavbar />
        <EventTabs />

        <main>
          <div className="event-container" style={{ maxWidth: 1440 }}>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center mx-auto">
              {[...Array(12)].map((_, index) => (
                <EventCard key={index} />
              ))}
            </div>
            <Pagination />
          </div>
        </main>
      </div>
    </>
  )
}

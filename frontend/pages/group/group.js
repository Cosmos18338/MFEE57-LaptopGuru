import React, { useState } from 'react'
import Link from 'next/link'
import EventButton from '@/components/event/EventButton'
import GroupBanner from '@/components/group/GroupBanner'
import GroupDetailModal from '@/components/group/GroupDetailModal'
import GroupJoin from '@/components/group/GroupJoin'

const Group = () => {
  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 30

  // Modal 狀態
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)

  // 詳情 Modal 控制函數
  const handleOpenModal = (groupData) => {
    setSelectedGroup(groupData)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGroup(null)
    document.body.style.overflow = 'unset'
  }

  // 申請 Modal 控制函數
  const handleOpenJoinModal = (groupData) => {
    // 如果是從詳情 Modal 來的，groupData 已經設置過了
    if (!groupData) {
      setIsModalOpen(false)
    } else {
      setSelectedGroup(groupData)
    }
    setIsJoinModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false)
    if (!isModalOpen) {
      setSelectedGroup(null)
    }
    document.body.style.overflow = 'unset'
  }

  // 生成頁碼數組
  const generatePaginationItems = () => {
    let items = []
    items.push(1)
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    if (start > 2) {
      items.push('...')
    }

    for (let i = start; i <= end; i++) {
      items.push(i)
    }

    if (end < totalPages - 1) {
      items.push('...')
    }

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

  // 模擬群組數據
  const mockGroups = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: `英雄聯盟政大盃第${index + 1}屆`,
    date: '2024/08/23 13:00',
    currentMembers: 3,
    maxMembers: 5,
    description: '這是一個很棒的活動，歡迎大家來參加！',
    users: [
      { id: 1, name: '用戶1', avatar: '/api/placeholder/40/40' },
      { id: 2, name: '用戶2', avatar: '/api/placeholder/40/40' },
      { id: 3, name: '用戶3', avatar: '/api/placeholder/40/40' },
    ],
  }))

  return (
    <div className="group-wrapper">
      <div className="group-container">
        {/* 導航區域 */}
        <nav className="group-nav-section">
          <div className="group-nav-container">
            <h1 className="group-nav-title">揪團列表</h1>
            <Link href="/group/groupCreat" style={{ textDecoration: 'none' }}>
              <EventButton>開團</EventButton>
            </Link>
          </div>
        </nav>

        {/* 內容區域 */}
        <div className="group-content">
          <div className="group-banner-grid">
            {mockGroups.map((group) => (
              <div key={group.id}>
                <GroupBanner
                  groupData={group}
                  onOpenDetail={() => handleOpenModal(group)}
                  onOpenJoin={() => handleOpenJoinModal(group)}
                />
              </div>
            ))}
          </div>

          {/* 分頁導航 */}
          <nav className="group-pagination-container">
            <ul className="group-pagination-list">
              {/* 上一頁按鈕 */}
              <li
                className={`group-pagination-item ${
                  currentPage === 1 ? 'disabled' : ''
                }`}
              >
                <button
                  className="group-pagination-link"
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
                  className={`group-pagination-item ${
                    item === currentPage ? 'active' : ''
                  } ${item === '...' ? 'disabled' : ''}`}
                >
                  <button
                    className="group-pagination-link"
                    onClick={() => item !== '...' && handlePageChange(item)}
                    disabled={item === '...'}
                  >
                    {item}
                  </button>
                </li>
              ))}

              {/* 下一頁按鈕 */}
              <li
                className={`group-pagination-item ${
                  currentPage === totalPages ? 'disabled' : ''
                }`}
              >
                <button
                  className="group-pagination-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ⟩
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal 組件 */}
      {isModalOpen && (
        <GroupDetailModal
          onClose={handleCloseModal}
          groupData={selectedGroup}
          onJoin={() => handleOpenJoinModal()}
        />
      )}

      {/* 申請加入 Modal */}
      {isJoinModalOpen && (
        <GroupJoin onClose={handleCloseJoinModal} groupData={selectedGroup} />
      )}
    </div>
  )
}

export default Group

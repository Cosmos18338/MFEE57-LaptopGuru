import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import Dropdown from '../event/Dropdown'
import styles from './GroupNavbar.module.css'

const GroupNavbar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
  }

  return (
    <nav className={`navbar ${styles.groupNavbar} navbar-dark`}>
      <div className={styles.containerFluid}>
        <div className={styles.dropdownWrapper}>
          <Dropdown title="最新建立" items={['最新建立', '最早建立']} />
          {/* 如果有關聯的活動，就顯示活動篩選 */}
          <Dropdown title="活動篩選" items={['所有揪團', '相關活動揪團']} />
        </div>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.inputGroup}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="搜尋群組"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton} type="submit">
              <IoSearch className={styles.searchIcon} />
            </button>
          </div>
        </form>
      </div>
    </nav>
  )
}

export default GroupNavbar

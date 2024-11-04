import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import Dropdown from './Dropdown'
import styles from './EventNavbar.module.css'

const EventNavbar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
  }

  return (
    <nav className={`navbar ${styles.eventNavbar} navbar-dark`}>
      <div className={styles.containerFluid}>
        <div className={styles.dropdownWrapper}>
          <Dropdown title="全部遊戲" items={['遊戲 1', '遊戲 2', '遊戲 3']} />
          <Dropdown title="平台" items={['平台 1', '平台 2', '平台 3']} />
          <Dropdown title="個人/團隊" items={['個人', '團隊']} />
        </div>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.inputGroup}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="搜尋活動"
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

export default EventNavbar

import React, { useState, useEffect } from 'react'
import { IoSearch } from 'react-icons/io5'
import Dropdown from './Dropdown'
import styles from './EventNavbar.module.css'
import axios from 'axios'

const EventNavbar = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [gameTypes, setGameTypes] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [selectedType, setSelectedType] = useState('全部遊戲')
  const [selectedPlatform, setSelectedPlatform] = useState('平台')
  const [selectedTeamType, setSelectedTeamType] = useState('個人/團隊')

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const typesResponse = await axios.get(
          'http://localhost:3005/api/events/filters/types'
        )
        if (typesResponse.data.code === 200) {
          setGameTypes(typesResponse.data.data)
        }

        const platformsResponse = await axios.get(
          'http://localhost:3005/api/events/filters/platforms'
        )
        if (platformsResponse.data.code === 200) {
          setPlatforms(platformsResponse.data.data)
        }
      } catch (error) {
        console.error('Error fetching filters:', error)
      }
    }

    fetchFilters()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    updateFilters(searchTerm)
  }

  const handleSearchInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    updateFilters(value)
  }

  const updateFilters = (searchValue) => {
    if (onFilterChange) {
      onFilterChange({
        type: selectedType === '全部遊戲' ? null : selectedType,
        platform: selectedPlatform === '平台' ? null : selectedPlatform,
        teamType: selectedTeamType === '個人/團隊' ? null : selectedTeamType,
        search: searchValue.trim() || null,
      })
    }
  }

  const handleTypeChange = (type) => {
    setSelectedType(type)
    updateFilters(searchTerm)
  }

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform)
    updateFilters(searchTerm)
  }

  const handleTeamTypeChange = (teamType) => {
    setSelectedTeamType(teamType)
    updateFilters(searchTerm)
  }

  return (
    <nav className={`navbar ${styles.eventNavbar} navbar-dark`}>
      <div className={styles.containerFluid}>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            title={selectedType}
            items={['全部遊戲', ...gameTypes]}
            onSelect={handleTypeChange}
          />
          <Dropdown
            title={selectedPlatform}
            items={['平台', ...platforms]}
            onSelect={handlePlatformChange}
          />
          <Dropdown
            title={selectedTeamType}
            items={['個人/團隊', '個人', '團隊']}
            onSelect={handleTeamTypeChange}
          />
        </div>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.inputGroup}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="搜尋活動"
              value={searchTerm}
              onChange={handleSearchInputChange}
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

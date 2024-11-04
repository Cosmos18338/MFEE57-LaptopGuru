import { useState } from 'react'
import styles from './Dropdown.module.css'

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.dropdown}>
      <button
        className={`${styles.dropdownButton} ${styles.eventBtnNav}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {title}
        <span className={styles.dropdownArrow}></span>
      </button>

      {isOpen && (
        <ul className={`${styles.dropdownMenu} ${styles.show}`}>
          {items.map((item, index) => (
            <li key={index} className={styles.dropdownItem}>
              <a
                href="#"
                className={styles.dropdownLink}
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(false)
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown

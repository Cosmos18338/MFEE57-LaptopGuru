import { MdDateRange } from 'react-icons/md'
import { IoAccessibility } from 'react-icons/io5'
import { FaFire } from 'react-icons/fa'
import EventButton from './EventButton'
import styles from './EventCard.module.css'

export default function EventCard() {
  return (
    <div className="col" style={{ maxWidth: '280px' }}>
      <div className={`${styles.card} shadow-sm h-100`}>
        <img
          src="https://images.pexels.com/photos/18091667/pexels-photo-18091667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className={styles.cardImg}
          alt="活動圖片"
        />
        <div className={`${styles.cardBody} bg-dark text-white`}>
          <h5 className={styles.cardTitle}>英雄聯盟政大杯第十屆</h5>
          <div className={`d-flex flex-column gap-2 ${styles.infoGroup}`}>
            <div className="d-flex align-items-center gap-2">
              <MdDateRange className={styles.smallIcon} />
              <small>2024/08/23 13:00</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <IoAccessibility className={styles.smallIcon} />
              <small>團隊</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaFire className={styles.smallIcon} />
              <small>48/64</small>
            </div>
          </div>
          <div className="mt-auto">
            <EventButton>活動詳情</EventButton>
          </div>
        </div>
      </div>
    </div>
  )
}

import styles from './PlayerInfo.module.css'

export default function PlayerInfo({ number }) {
  return (
    <div className={styles['eventRegistration-member']}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className={styles['eventRegistration-label']}>
            隊員{number}姓名
          </label>
          <input
            type="text"
            className={`form-control ${styles['eventRegistration-input']}`}
            placeholder="請輸入隊員姓名"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label
            htmlFor={`gameId-${number}`}
            className={styles['eventRegistration-label']}
          >
            遊戲ID
          </label>
          <input
            type="text"
            id={`gameId-${number}`}
            className={`form-control ${styles['eventRegistration-input']}`}
            placeholder="請輸入遊戲ID"
            required
          />
        </div>
      </div>
    </div>
  )
}

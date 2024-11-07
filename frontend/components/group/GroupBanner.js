import styles from "./GroupBanner.module.css";
import EventButton from "../event/EventButton";

export default function GroupBanner({ groupData, onOpenDetail, onOpenJoin }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <img
            src="https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="遊戲圖片"
            className={styles.image}
          />
          <div className={styles.text}>
            <div className={styles.title}>{groupData.title}</div>
            <div className={styles.subtitle}>
              <span>小火龍</span>
              <span className="mx-2">|</span>
              <span>3小時前發起揪團</span>
            </div>
          </div>
          <div className={styles.actions}>
            <EventButton onClick={onOpenDetail}>詳情</EventButton>
            <EventButton onClick={onOpenJoin}>申請</EventButton>
          </div>
        </div>
      </div>
    </div>
  );
}
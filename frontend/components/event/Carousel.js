import { useState } from 'react'
import styles from './Carousel.module.css'

const carouselData = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'THE CHOSEN ONE',
    description: 'TEAMFIGHT TACTICS 週賽事',
    alt: 'TeamFight Tactics',
  },
]

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % carouselData.length)
  }

  const prevSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + carouselData.length) % carouselData.length
    )
  }

  const goToSlide = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className={styles.eventCarouselContainer}>
      <div className={styles.eventCarousel}>
        <div className={styles.carouselIndicators}>
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.indicatorButton} ${
                activeIndex === index ? styles.active : ''
              }`}
            />
          ))}
        </div>

        <div className={styles.carouselInner}>
          {carouselData.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.carouselItem} ${
                activeIndex === index ? styles.active : ''
              }`}
              style={{ display: activeIndex === index ? 'block' : 'none' }}
            >
              <img src={item.image} alt={item.alt} />
              <div className={styles.carouselCaption}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.carouselControl} ${styles.carouselControlPrev}`}
          onClick={prevSlide}
        >
          <span className={styles.carouselControlPrevIcon} />
          <span className={styles.visuallyHidden}>Previous</span>
        </button>
        <button
          className={`${styles.carouselControl} ${styles.carouselControlNext}`}
          onClick={nextSlide}
        >
          <span className={styles.carouselControlNextIcon} />
          <span className={styles.visuallyHidden}>Next</span>
        </button>
      </div>
    </div>
  )
}

export default Carousel

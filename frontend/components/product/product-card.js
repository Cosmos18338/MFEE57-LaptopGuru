import React, { useState, useEffect } from 'react'
import styles from '@/styles/product-card.module.scss'

export default function ProductCard({ product_id = 1 }) {
  // 從後端撈取資料
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      if (product_id) {
        try {
          const response = await fetch(
            `http://localhost:3005/api/products/card/${product_id}`
          )
          const result = await response.json()
          setData(result.data.product)
        } catch (error) {
          console.error('Error fetching data', error)
        }
      }
    }
    fetchProduct()
  }, [product_id]) // 加入依賴陣列，確保在 product_id 改變時重新執行

  // 切換收藏狀態的範例函數
  const toggleHeart = () => {
    console.log('Heart icon toggled')
  }

  // 加入購物車的範例函數
  const showCartAlert = () => {
    alert('Added to cart')
  }

  return (
    <div className={styles.product_card}>
      <div className={styles.product_card_img}>
        <input
          type="checkbox"
          id="productCompareCheck"
          className={styles.product_compare_checkbox}
        />
        <label
          htmlFor="productCompareCheck"
          className={styles.product_compare_label}
        ></label>
        <span className={styles.product_compare_text}>比較</span>
        <img
          src={
            data
              ? `/data/${data.product_img_path}`
              : '/images/product/product.png'
          }
          alt="Product"
        />
      </div>
      <div className={styles.product_card_content}>
        <div className={styles.product_text}>
          <div>{data ? data.product_name : 'Loading...'}</div>
          <div>{data ? data.model : ''}</div>
        </div>
        <div className={styles.product_icons}>
          <input
            type="checkbox"
            id="heartCheckbox"
            className={styles.product_collection_checkbox}
          />
          <svg
            className={styles.product_collection_icon}
            onClick={toggleHeart}
            width={20}
            height={20}
            viewBox="0 0 32 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.0102 4.82806C19.0093 1.32194 24.0104 0.378798 27.768 3.58936C31.5255 6.79991 32.0545 12.1679 29.1037 15.965C26.6503 19.122 19.2253 25.7805 16.7918 27.9356C16.5196 28.1768 16.3834 28.2972 16.2247 28.3446C16.0861 28.386 15.9344 28.386 15.7958 28.3446C15.6371 28.2972 15.5009 28.1768 15.2287 27.9356C12.7952 25.7805 5.37022 19.122 2.91682 15.965C-0.0339811 12.1679 0.430418 6.76615 4.25257 3.58936C8.07473 0.412578 13.0112 1.32194 16.0102 4.82806Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <img
            onClick={showCartAlert}
            src="/images/product/cart.svg"
            alt="cart"
          />
        </div>
      </div>
      <div className={styles.price_button}>
        <span className={styles.price}>
          {data ? `$${data.list_price}` : '$0'}
        </span>
        <span className={styles.arrow}>→</span>
      </div>
    </div>
  )
}

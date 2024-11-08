import React from 'react'
import styles from '@/styles/product-lease.module.scss'
import BackToTop from '@/components/BackToTop/BackToTop'
import Header from '@/components/layout/default-layout/header'
import Footer from '@/components/layout/default-layout/my-footer'
import NextBreadCrumbLight from '@/components/common/next-breadcrumb-light'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/product/product-card'

export default function Detail() {
  // 從網址列的參數取得商品ID，並透過ID取得商品資料
  const router = useRouter()
  const { pid } = router.query
  const [data, setData] = useState(null)
  const [isLoading, setIsLoding] = useState(true)
  // 狀態顯示訊息

  const [alertMessage, setAlertMessages] = useState([]) // 使用陣列儲存訊息

  // 新增訊息到陣列
  const handleShowMessage = (message) => {
    setAlertMessages((prevMessages) => [...prevMessages, message])
    setTimeout(() => {
      // 1 秒後移除最早的訊息
      setAlertMessages((prevMessages) => prevMessages.slice(1))
    }, 1000)
  }

  useEffect(() => {
    async function fetchProduct(pid) {
      //抓取商品資料
      try {
        const response = await fetch(
          `http://localhost:3005/api/products/${pid}`
        )
        const result = await response.json()
        setData(result.data.product)
        setIsLoding(false)
      } catch (error) {
        //如果發生錯誤，重新導向商品列表
        router.push('/product/list')
      }
    }

    if (pid) {
      fetchProduct(pid)
    }
  }, [pid])

  // 取得相關商品
  const [relatedProducts, setRelatedProducts] = useState(null)
  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const response = await fetch(
          `http://localhost:3005/api/products/related/${pid}`
        )
        const result = await response.json()
        setRelatedProducts(result.data.randomRelatedProducts)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    if (pid) {
      fetchRelatedProducts()
    }
  }, [pid])
  return (
    <>
      <Header />
      <div className={styles.customBody}>
        <div className={styles.customContainer}>
          <nav className={`${styles.breadcrumb}`}>
            <NextBreadCrumbLight bgClass="transparent" isHomeIcon="true" />
          </nav>
          <section className={styles.col1}>
            <div className={styles.menu}>
              <div className={styles.square}>
                <Image
                  src={
                    isLoading
                      ? '' // 加載中，不顯示圖片
                      : data?.product_detail_img?.[0] // 若有圖片路徑，顯示第一張
                      ? `/product/${data.product_detail_img[0].product_img_path}`
                      : `/product/${data?.product_img[0].product_img_path}`
                  }
                  height={400}
                  width={500}
                  alt="Product"
                />
                <div className={`${styles.carouselBtn} ${styles.leftBtn}`}>
                  <Image
                    src="/images/lease/array_left.svg"
                    width={20}
                    height={20}
                    alt="Previous"
                  />
                </div>
                <div className={`${styles.carouselBtn} ${styles.rightBtn}`}>
                  <Image
                    src="/images/lease/array_right.svg"
                    width={20}
                    height={20}
                    alt="Next"
                  />
                </div>
              </div>
              <div className={styles.menu2}>
                <div className={styles.list}>
                  {!isLoading &&
                    data?.product_detail_img?.[1]?.product_img_path && (
                      <Image
                        src={`/product/${data.product_detail_img[1].product_img_path}`}
                        alt="product"
                        width={120}
                        height={120}
                      />
                    )}
                </div>
                <div className={styles.list}>
                  {!isLoading &&
                    data?.product_detail_img?.[2]?.product_img_path && (
                      <Image
                        src={`/product/${data.product_detail_img[2].product_img_path}`}
                        alt="product"
                        width={120}
                        height={120}
                      />
                    )}
                </div>
                <div className={styles.list}>
                  {!isLoading &&
                    data?.product_detail_img?.[3]?.product_img_path && (
                      <Image
                        src={`/product/${data.product_detail_img[3].product_img_path}`}
                        alt="product"
                        width={120}
                        height={120}
                      />
                    )}
                </div>
              </div>
            </div>

            <div className={styles.productInfo}>
              <div className={styles.productInfo2}>
                <div className={styles.brand}>
                  <span>{isLoading ? 'Loading...' : data?.product_brand}</span>
                  <div className={styles.icon}>
                    <Image
                      className={styles.cart}
                      src="/images/lease/cart.svg"
                      alt="Cart"
                      width={20}
                      height={20}
                    />
                    <Image
                      className={styles.heart}
                      src="/images/lease/heart.svg"
                      alt="Favorite"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>

                <span className={styles.title}>
                  {isLoading ? 'Loading...' : data?.product_name}
                </span>

                <div className={styles.project}>
                  <div className={styles.project2}>
                    <span className={styles.price}>
                      {isLoading ? 'Loading...' : data?.list_price}
                    </span>
                  </div>
                </div>

                <div className={styles.quantityContainer}>
                  <div className={styles.quantity}>
                    <span className={styles.quantityLabel}>購買數量</span>
                    <div className={styles.quantitySelector}>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="99"
                        defaultValue={1}
                        className={styles.quantityInput}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button className={styles.rentButton}>購買</button>
                  <div className={styles.articleCheckbox}>
                    <input type="checkbox" id="customCheck" />
                    <label htmlFor="customCheck" style={{ color: 'white' }}>
                      &nbsp;&nbsp;加入比較
                    </label>
                  </div>
                </div>

                <div className={styles.description}>
                  <p>CPU : {isLoading ? 'Loading...' : data?.product_CPU}</p>
                  <p>記憶體：{isLoading ? 'Loading...' : data?.product_RAM}</p>
                  <p>
                    硬碟：
                    {isLoading
                      ? 'Loading...'
                      : data?.product_hardisk_type +
                        ' ' +
                        data?.product_hardisk_volume}
                  </p>
                  {!isLoading && data?.product_OS && (
                    <p>作業系統： {data.product_OS}</p>
                  )}
                  <p>型號：{isLoading ? 'Loading...' : data?.model}</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.col2}>
            <div className={styles.productSpecs}>
              <div className={styles.title2}>產品規格</div>
              <ul>
                {!isLoading && data?.product_CPU && (
                  <li>處理器： {data.product_CPU}</li>
                )}
                {!isLoading && data?.product_RAM && (
                  <li>記憶體： {data.product_RAM}</li>
                )}
                {!isLoading &&
                  data?.product_hardisk_type &&
                  data?.product_hardisk_volume && (
                    <li>
                      硬碟： {data.product_hardisk_type}{' '}
                      {data.product_hardisk_volume}
                    </li>
                  )}
                {!isLoading && data?.product_OS && (
                  <li>作業系統： {data.product_OS}</li>
                )}
                {!isLoading &&
                  data?.product_display_card &&
                  (data.discrete_display_card == 'yes' ? (
                    <li>顯示卡： {data.product_display_card}</li>
                  ) : (
                    <li>顯示晶片：{data.product_display_card}</li>
                  ))}
                {!isLoading && data?.product_wireless && (
                  <li>無線網路： {data.product_wireless}</li>
                )}
                {!isLoading && data?.product_camera && (
                  <li>攝影機： {data.product_camera}</li>
                )}
                {!isLoading && data?.product_keyboard && (
                  <li>鍵盤： {data.product_keyboard}</li>
                )}
                {!isLoading && data?.product_cardreader && (
                  <li>讀卡機： {data.product_cardreader}</li>
                )}
                {!isLoading && data?.['product_I/O'] && (
                  <li>I/O： {data['product_I/O']}</li>
                )}
                {!isLoading && data?.product_color && (
                  <li>顏色： {data.product_color}</li>
                )}
                {!isLoading && data?.product_power && (
                  <li>電源： {data.product_power}</li>
                )}
                {!isLoading && data?.product_weight && (
                  <li>重量： {data.product_weight}</li>
                )}
                {!isLoading && data?.product_size && (
                  <li>尺寸： {data.product_size}</li>
                )}
                <li>2年全球保固 + 首年完美保固</li>
              </ul>
            </div>
          </section>

          <section className={styles.col3}>
            <div className={styles.relatedProducts}>
              <span className={styles.diamond}>◇</span>
              <span className={styles.title3}>相關商品</span>
            </div>
            <div className={styles.relatedProductsList}>
              {relatedProducts?.map((product) => (
                <div key={product.product_id}>
                  <ProductCard
                    onSendMessage={handleShowMessage}
                    product_id={product.product_id}
                  />
                </div>
              ))}
            </div>
          </section>
          <BackToTop />
        </div>
        {/* 顯示所有的訊息 */}
        <div className="alert-container">
          {alertMessage.map((msg, index) => (
            <div
              key={index}
              className="alert alert-success alert-dismissible fade show"
              style={{
                zIndex: 9999,
                position: 'fixed',
                top: `${20 + index * 60}px`, // 每次增加 60px，避免重疊
                right: '20px',
                width: 'auto',
              }}
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
Detail.getLayout = (page) => page

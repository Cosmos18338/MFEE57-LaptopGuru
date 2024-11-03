import { useEffect } from 'react'
import styles from '@/styles/product.module.scss'
import NextBreadCrumb from '@/components/common/next-breadcrumb'
export default function List() {
  // Toggle the side navigation
  useEffect(() => {
    // fix next issue
    if (typeof window !== 'undefined') {
      const sidebarToggle = document.body.querySelector('#sidebarToggle')

      if (sidebarToggle) {
        // 在localStorage中儲存目前sidebar情況
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
          document.body.classList.toggle('sb-sidenav-toggled')
        }

        sidebarToggle.addEventListener('click', (event) => {
          event.preventDefault()

          document.body.classList.toggle('sb-sidenav-toggled')

          localStorage.setItem(
            'sb|sidebar-toggle',
            document.body.classList.contains('sb-sidenav-toggled')
          )
        })
      }
    }
  }, [])

  return (
    <>
      <div className={`${styles.product_container}`}>
        <div className={`${styles.product_banner}`}>
          <div className={`${styles.product_text_container}`}>
            <h1 className={`${styles.product_banner_title}`}>Products</h1>
            <div className={`${styles.product_banner_content}`}>
              各種筆電官方品牌發文
              <br />
              最新的官方品牌情報在 GURU！
            </div>
          </div>
        </div>
        <nav className={`${styles.product_breadcrumb}`}>
          <NextBreadCrumb />
        </nav>
        <input
          type="checkbox"
          id="product_aside_toggle"
          className={`${styles.product_aside_toggle}`}
        />
        <div className={`${styles.product_aside_toggle_wrapper}`}>
          <label
            htmlFor="product_aside_toggle"
            className={`${styles.product_aside_toggle_title}`}
          >
            Menu
          </label>
          <label
            htmlFor="product_aside_toggle"
            className={`${styles.product_aside_toggle_logo}`}
          >
            ▼
          </label>
        </div>
        <div className="d-flex align-items-start">
          {/* 側邊欄 */}
          <aside className={`${styles.product_aside}`}>
            <div className={`${styles.product_aside_content}`}>
              <input
                type="text"
                className={`${styles.product_search}`}
                placeholder="Search"
              />
              <img
                src="/images/product/search.svg"
                className="
              product_search_icon"
              />
            </div>
            <div className={`${styles.product_slider_container}`}>
              <span className={`${styles.product_slider_title}`}>價格範圍</span>
              <input
                type="range"
                min={5000}
                max={200000}
                defaultValue={5000}
                className={`${styles.product_slider}`}
                id="slider-1"
              />
              <div id="price_tip-1" className={`${styles.price_tip}`}>
                5000
              </div>
              <input
                type="range"
                min={5000}
                max={200000}
                defaultValue={200000}
                className={`${styles.product_slider}`}
                id="slider-2"
              />
              <div id="price_tip-2" className={`${styles.price_tip}`}>
                200000
              </div>
            </div>
            {/* 選單 */}
            <div className={`${styles.product_list_container}`}>
              {/* 選單控制區 */}
              <input
                type="checkbox"
                id="menu-toggle1"
                className={`${styles.menu_toggle}`}
              />
              <div className={`${styles.menu_toggle_wrapper}`}>
                <label
                  htmlFor="menu-toggle1"
                  className={`${styles.menu_title}`}
                >
                  品牌
                </label>
                <label htmlFor="menu-toggle1" className={`${styles.menu_icon}`}>
                  ▼
                </label>
              </div>
              {/* 摺疊選單內容 */}
              <div className={`${styles.menu_content}`}>
                <ul>
                  <li>
                    <a href="">ACER</a>
                  </li>
                  <li>
                    <a href="">ASUS</a>
                  </li>
                  <li>
                    <a href="">DELL</a>
                  </li>
                  <li>
                    <a href="">GIGABYTE</a>
                  </li>
                  <li>
                    <a href="">HP</a>
                  </li>
                  <li>
                    <a href="">MSI</a>
                  </li>
                  <li>
                    <a href="">RAZER</a>
                  </li>
                  <li>
                    <a href="">ROG</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.product_list_container}`}>
              {/* 選單控制區 */}
              <input
                type="checkbox"
                id="menu-toggle2"
                className={`${styles.menu_toggle}`}
              />
              <div className={`${styles.menu_toggle_wrapper}`}>
                <label
                  htmlFor="menu-toggle2"
                  className={`${styles.menu_title}`}
                >
                  用途
                </label>
                <label htmlFor="menu-toggle2" className={`${styles.menu_icon}`}>
                  ▼
                </label>
              </div>
              {/* 摺疊選單內容 */}
              <div className={`${styles.menu_content}`}>
                <ul>
                  <li>
                    <a href="">文書</a>
                  </li>
                  <li>
                    <a href="">商務</a>
                  </li>
                  <li>
                    <a href="">電競</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.product_list_container}`}>
              {/* 選單控制區 */}
              <input
                type="checkbox"
                id="menu-toggle3"
                className={`${styles.menu_toggle}`}
              />
              <div className={`${styles.menu_toggle_wrapper}`}>
                <label
                  htmlFor="menu-toggle3"
                  className={`${styles.menu_title}`}
                >
                  螢幕尺寸
                </label>
                <label htmlFor="menu-toggle3" className={`${styles.menu_icon}`}>
                  ▼
                </label>
              </div>
              {/* 摺疊選單內容 */}
              <div className={`${styles.menu_content}`}>
                <ul>
                  <li>
                    <a href="">14吋</a>
                  </li>
                  <li>
                    <a href="">15吋</a>
                  </li>
                  <li>
                    <a href="">15.6吋</a>
                  </li>
                  <li>
                    <a href="">16吋</a>
                  </li>
                  <li>
                    <a href="">17吋</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.product_list_container}`}>
              {/* 選單控制區 */}
              <input
                type="checkbox"
                id="menu-toggle4"
                className={`${styles.menu_toggle}`}
              />
              <div className={`${styles.menu_toggle_wrapper}`}>
                <label
                  htmlFor="menu-toggle4"
                  className={`${styles.menu_title}`}
                >
                  顯卡
                </label>
                <label htmlFor="menu-toggle4" className={`${styles.menu_icon}`}>
                  ▼
                </label>
              </div>
              {/* 摺疊選單內容 */}
              <div className={`${styles.menu_content}`}>
                <ul>
                  <li>
                    <a href="">4050</a>
                  </li>
                  <li>
                    <a href="">4060</a>
                  </li>
                  <li>
                    <a href="">4070</a>
                  </li>
                  <li>
                    <a href="">4080</a>
                  </li>
                  <li>
                    <a href="">4090</a>
                  </li>
                  <li>
                    <a href="">其他</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.product_list_container}`}>
              {/* 選單控制區 */}
              <input
                type="checkbox"
                id="menu-toggle5"
                className={`${styles.menu_toggle}`}
              />
              <div className={`${styles.menu_toggle_wrapper}`}>
                <label
                  htmlFor="menu-toggle5"
                  className={`${styles.menu_title}`}
                >
                  處理器
                </label>
                <label htmlFor="menu-toggle5" className={`${styles.menu_icon}`}>
                  ▼
                </label>
              </div>
              {/* 摺疊選單內容 */}
              <div className={`${styles.menu_content}`}>
                <ul>
                  <li>
                    <a href="">i3</a>
                  </li>
                  <li>
                    <a href="">i5</a>
                  </li>
                  <li>
                    <a href="">i7</a>
                  </li>
                  <li>
                    <a href="">其他</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.product_list_container}`}>
              {/* 選單控制區 */}
              <input
                type="checkbox"
                id="menu-toggle6"
                className={`${styles.menu_toggle}`}
              />
              <div className={`${styles.menu_toggle_wrapper}`}>
                <label
                  htmlFor="menu-toggle6"
                  className={`${styles.menu_title}`}
                >
                  記憶體
                </label>
                <label htmlFor="menu-toggle6" className={`${styles.menu_icon}`}>
                  ▼
                </label>
              </div>
              {/* 摺疊選單內容 */}
              <div className={`${styles.menu_content}`}>
                <ul>
                  <li>
                    <a href="">8G</a>
                  </li>
                  <li>
                    <a href="">16G</a>
                  </li>
                  <li>
                    <a href="">32G</a>
                  </li>
                  <li>
                    <a href="">64G</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.product_list_container}`}>
              {/* 選單控制區 */}
              <input
                type="checkbox"
                id="menu-toggle7"
                className={`${styles.menu_toggle}`}
              />
              <div className={`${styles.menu_toggle_wrapper}`}>
                <label
                  htmlFor="menu-toggle7"
                  className={`${styles.menu_title}`}
                >
                  硬碟容量
                </label>
                <label htmlFor="menu-toggle7" className={`${styles.menu_icon}`}>
                  ▼
                </label>
              </div>
              {/* 摺疊選單內容 */}
              <div className={`${styles.menu_content}`}>
                <ul>
                  <li>
                    <a href="">256G</a>
                  </li>
                  <li>
                    <a href="">512G</a>
                  </li>
                  <li>
                    <a href="">1T</a>
                  </li>
                  <li>
                    <a href="">2T</a>
                  </li>
                  <li>
                    <a href="">其他</a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
          {/* 產品列表 */}
          <main className={`${styles.product_list}`}>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
            <div className={`${styles.product_card}`}>
              <div className={`${styles.product_card_img}`}>
                <input
                  type="checkbox"
                  id="productCompareCheck"
                  className={`${styles.product_compare_checkbox}`}
                />
                <label
                  htmlFor="productCompareCheck"
                  className={`${styles.product_compare_label}`}
                >
                  &nbsp;
                </label>
                <span className={`${styles.product_compare_text}`}>比較</span>
                <img src="/images/product/product.png" />
              </div>
              <div className={`${styles.product_card_content}`}>
                <div className={`${styles.product_text}`}>
                  <div>Katana 15</div>
                  <div>B13VGK-1201TW...</div>
                </div>
                <div className={`${styles.product_icons}`}>
                  <input
                    type="checkbox"
                    id="heartCheckbox"
                    className={`${styles.product_collection_checkbox}`}
                  />
                  <svg
                    className={`${styles.product_collection_icon}`}
                    onclick="toggleHeart()"
                    width={20}
                    height={20}
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
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
                    onClick="showCartAlert()"
                    src="/images/product/cart.svg"
                    alt="cart"
                  />
                </div>
              </div>
              <div className={`${styles.price_button}`}>
                <span className={`${styles.price}`}>$50,000</span>
                <span className={`${styles.arrow}`}>→</span>
              </div>
            </div>
          </main>
        </div>
        <div className={`${styles.product_pagination}`}>
          <ul className={`${styles.product_pagination}`}>
            {/* 左箭頭 */}
            <li className={`${styles.page_item}`}>
              <a
                className={`${styles.product_page_link}`}
                href="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">&lt;</span>
              </a>
            </li>
            {/* 頁碼 */}
            <li className={`${styles.product_page_item}`}>
              <a className={`${styles.product_page_link}`} href="">
                1
              </a>
            </li>
            <li className={`${styles.product_page_item}`}>
              <a className={`${styles.product_page_link}`} href="">
                2
              </a>
            </li>
            <li className={`${styles.product_page_item}`}>
              <a className={`${styles.product_page_link}`} href="">
                ...
              </a>
            </li>
            <li className={`${styles.product_page_item}`}>
              <a className={`${styles.product_page_link}`} href="">
                29
              </a>
            </li>
            <li className={`${styles.product_page_item}`}>
              <a className={`${styles.product_page_link}`} href="">
                30
              </a>
            </li>
            {/* 右箭頭 */}
            <li className={`${styles.product_page_item}`}>
              <a
                className={`${styles.product_page_link}`}
                href="#"
                aria-label="Next"
              >
                <span aria-hidden="true">&gt;</span>
              </a>
            </li>
          </ul>
        </div>
        <div
          id="cartAlertContainer"
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        ></div>
      </div>
    </>
  )
}

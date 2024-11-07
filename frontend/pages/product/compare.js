import { useEffect } from 'react'
import styles from '@/styles/compare.module.scss'
import NextBreadCrumbLight from '@/components/common/next-breadcrumb-light'
import Header from '@/components/layout/default-layout/header'
import MyFooter from '@/components/layout/default-layout/my-footer'
import Image from 'next/image'
export default function Compare() {
  return (
    <>
      <Header />
      <div className={`${styles.compare_container}`}>
        <nav className={`${styles.compare_breadcrumb}`}>
          <NextBreadCrumbLight isHomeIcon={true} bgClass="transparent" />
        </nav>
        <main className={`${styles.container} ${styles.active}`}>
          <div className={`${styles.compare_box}`}>
            <div className={`${styles.compare_plus_icon}`}>+</div>
          </div>
          <div className={`${styles.compare_card} ${styles.active}`}>
            <Image
              src="/images/product/product.png"
              alt="Product Image"
              className={`${styles.compare_image}`}
              width={300}
              height={300}
            />
            <div className={`${styles.compare_specifications}`}>
              <p>
                16" Mini LED WQXGA (2560x1600, 16:10, 240Hz, 3ms, DCI-P3 100%)
                顯示器，支援 14" 觸控 SecondArt Pad (3840x1100 60Hz)
              </p>
              <p>AMD Ryzen 9 7945HX (16-core, up to 5.4GHz, 64MB L3 Cache)</p>
              <p>64GB (2x32GB) DDR5-5600 SO-DIMM (Max: 64GB)</p>
              <p>硬碟: 2TB PCIe 4.0 NVMe M.2 SSD (RAID 0)</p>
              <p>作業系統: Windows 11 Home</p>
              <p>
                顯示晶片: NVIDIA GeForce RTX 4090 16GB GDDR6 (搭載 MUX 模式)
              </p>
              <p>
                無線連接: Wi-Fi 6E (802.11ax) (Triple band) 2*2 + Bluetooth 5.2
              </p>
              <p>1080P FHD@30FPS Camera</p>
              <p>RGB 鍵盤背光燈</p>
              <p>支援 NumberPad</p>
              <p>Card reader (microSD (UHS-II, 312MB/s))</p>
              <p>尺寸: 35.5 x 26.6 x 2.25 - 2.97 cm</p>
              <p>重量: 2.6 Kg</p>
            </div>
          </div>
          <div className={`${styles.compare_box}`}>
            <div className={`${styles.compare_plus_icon}`}>+</div>
          </div>
          {/* Product Card 2 */}
          <div className={`${styles.compare_card}  ${styles.active}`}>
            <Image
              src="/images/product/product.png"
              alt="Product Image"
              className={`${styles.compare_image}`}
              width={300}
              height={300}
            />
            <div className={`${styles.compare_specifications}`}>
              <p>
                16" Mini LED WQXGA (2560x1600, 16:10, 240Hz, 3ms, DCI-P3 100%)
                顯示器，支援 14" 觸控 SecondArt Pad (3840x1100 60Hz)
              </p>
              <p>AMD Ryzen 9 7945HX (16-core, up to 5.4GHz, 64MB L3 Cache)</p>
              <p>64GB (2x32GB) DDR5-5600 SO-DIMM (Max: 64GB)</p>
              <p>硬碟: 2TB PCIe 4.0 NVMe M.2 SSD (RAID 0)</p>
              <p>作業系統: Windows 11 Home</p>
              <p>
                顯示晶片: NVIDIA GeForce RTX 4090 16GB GDDR6 (搭載 MUX 模式)
              </p>
              <p>
                無線連接: Wi-Fi 6E (802.11ax) (Triple band) 2*2 + Bluetooth 5.2
              </p>
              <p>1080P FHD@30FPS Camera</p>
              <p>RGB 鍵盤背光燈</p>
              <p>支援 NumberPad</p>
              <p>Card reader (microSD (UHS-II, 312MB/s))</p>
              <p>尺寸: 35.5 x 26.6 x 2.25 - 2.97 cm</p>
              <p>重量: 2.6 Kg</p>
            </div>
          </div>
        </main>
      </div>
      <MyFooter />
    </>
  )
}
Compare.getLayout = (page) => page

import { useState, useContext, createContext, useRef, useEffect } from 'react'
// 可自訂載入動畫元件
import { DefaultLoader, LoaderText } from './components'
import { useRouter } from 'next/router'
import { LoadingSpinner } from '@/components/dashboard/loading-spinner'
const LoaderContext = createContext(null)

/**
 * 延遲ms秒用，可以回傳值x，手動控制關閉有用
 */
export function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms))
  }
}

/**
 * 延遲ms秒用，手動控制關閉有用(相當於setTimeout的Promise版)
 */
export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 全站的Context狀態
// loader是元件，可以放於全站版面上，要用時用showLoader控制
// 4. |- showLoader/hideLoader (手動控制方法)
// close 代表幾秒後關閉
// 1. |- global (控制是否全域顯示)
export const LoaderProvider = ({
  children,
  close = 2,
  global = true,
  CustomLoader = LoadingSpinner,
  // 3. |- CustomLoader (可自訂載入元件)
}) => {
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleChangeStart = () => {
      if (global) {
        setShow(true)
      }
    }

    const handleChangeEnd = () => {
      // 2. auto close
      if (close && global) {
        console.log('Starting close timer:', close * 1000, 'ms');

        timeout(close * 1000).then(() => setShow(false))
      }
    }

    router.events.on('routeChangeStart', handleChangeStart) // 路由開始變化時
    router.events.on('routeChangeComplete', handleChangeEnd) // 路由變化完成時
    router.events.on('routeChangeError', handleChangeEnd) // 路由變化發生錯誤時

    return () => {
      router.events.off('routeChangeStart', handleChangeStart)
      router.events.off('routeChangeComplete', handleChangeEnd)
      router.events.off('routeChangeError', handleChangeEnd)
    }
  }, [])

  return (
    <LoaderContext.Provider
      value={{
        showLoader: () => {
          setShow(true)
          //2.   |- close (自動關閉時間)
          // auto close
          if (close) { // 如果有設定 close
            timeout(close * 1000)// 等待 close 秒
            .then(() => setShow(false)) // 然後關閉 loader
          }
        },
        hideLoader: () => (!close ? setShow(false) : null),
        loading: show,
        delay,
        loader: () => <CustomLoader show={show} />,
        loaderText: (text) => <LoaderText text={text} show={show} />,
      }}
    >
      {/* // close 是傳入的秒數（預設是 2）
            // close * 1000 轉換成毫秒
            // 例如：
            // close = 2，表示 2秒
            // 2 * 1000 = 2000 毫秒 */}
      {children}
    </LoaderContext.Provider>
  )
}

// 配合context的元件
export const useLoader = () => {
  const context = useContext(LoaderContext)

  if (!context) {
    throw new Error('useLoader must be used within LoadingProvider')
  }

  return context
}

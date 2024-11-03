import { useState, useCallback, useEffect } from 'react'

export const useJumpingLetters = () => {
  const [activeLetters, setActiveLetters] = useState(new Set())

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .jump-letter__container {
        font-family: Montserrat, "Noto Sans TC", sans-serif;
        font-weight: bold;
        color: #ffffff;
        display: flex; // 新增
        justify-content: center; // 新增
        gap: 0.5rem;// 新增：控制單字間距
      }

      .jump-letter__alphabet {
        display: inline-block;
        transform-origin: center bottom;
      }

      .jump-letter__alphabet.is-active {
        animation: jump-letter 1.5s cubic-bezier(0.165, 0.85, 0.45, 1);
      }
    
      /* 為每個位置的字母設定不同的顏色 */
      .jump-letter__alphabet:nth-child(5n+1).is-active {
        animation-name: jump-letter-pink;
      }
      .jump-letter__alphabet:nth-child(5n+2).is-active {
        animation-name: jump-letter-light-purple;
      }
      .jump-letter__alphabet:nth-child(5n+3).is-active {
        animation-name: jump-letter-green;
      }
      .jump-letter__alphabet:nth-child(5n+4).is-active {
        animation-name: jump-letter_linear_1;
      }
      .jump-letter__alphabet:nth-child(5n+5).is-active {
        animation-name: jump-letter-cream;
      }

      @keyframes jump-letter-pink {
        0%, 100% {
          transform: translateY(0) scale(1, 1);
          color: #ffffff;
        }
        25%, 75% {
          transform: translateY(0) scale(1.2, 0.8);
          text-shadow: -5px 5px 5px rgba(0, 0, 0, .5);
          color: #ffffff;
        }
        50% {
          transform: translateY(-50px) scale(0.8, 1.2);
          text-shadow: -50px 50px 20px rgba(0, 0, 0, .5);
          color: #CD88AF;  /* 粉色 */
        }
      }

      @keyframes jump-letter-light-purple {
        0%, 100% {
          transform: translateY(0) scale(1, 1);
          color: #ffffff;
        }
        25%, 75% {
          transform: translateY(0) scale(1.2, 0.8);
          text-shadow: -5px 5px 5px rgba(0, 0, 0, .5);
          color: #ffffff;
        }
        50% {
          transform: translateY(-50px) scale(0.8, 1.2);
          text-shadow: -50px 50px 20px rgba(0, 0, 0, .5);
          color: #8F78AD;  /* 淺紫色 */
        }
      }

      @keyframes jump-letter-green {
        0%, 100% {
          transform: translateY(0) scale(1, 1);
          color: #ffffff;
        }
        25%, 75% {
          transform: translateY(0) scale(1.2, 0.8);
          text-shadow: -5px 5px 5px rgba(0, 0, 0, .5);
          color: #ffffff;
        }
        50% {
          transform: translateY(-50px) scale(0.8, 1.2);
          text-shadow: -50px 50px 20px rgba(0, 0, 0, .5);
          color: #AA8E39;  /* 土黃 */
        }
      }

      @keyframes jump-letter_linear_1 {
        0%, 100% {
          transform: translateY(0) scale(1, 1);
          color: #ffffff;
        }
        25%, 75% {
          transform: translateY(0) scale(1.2, 0.8);
          text-shadow: -5px 5px 5px rgba(0, 0, 0, .5);
          color: #ffffff;
        }
        50% {
          transform: translateY(-50px) scale(0.8, 1.2);
          text-shadow: -50px 50px 20px rgba(0, 0, 0, .5);
          color: #867DB0;  /* purple */
        }
      }

      @keyframes jump-letter-cream {
        0%, 100% {
          transform: translateY(0) scale(1, 1);
          color: #ffffff;
        }
        25%, 75% {
          transform: translateY(0) scale(1.2, 0.8);
          text-shadow: -5px 5px 5px rgba(0, 0, 0, .5);
          color: #ffffff;
        }
        50% {
          transform: translateY(-50px) scale(0.8, 1.2);
          text-shadow: -50px 50px 20px rgba(0, 0, 0, .5);
          color: #cec6be;  /* 米色 */
        }
      }

      /* 自定義樣式類 */
      .welcome-text {
        font-size: 2rem;
        margin-bottom: 1rem;
        text-align: center; 
        width: 100%;
      }

      .company-name {
        font-size: 3.5rem;
        font-weight: 800;
        text-align: center; 
        width: 100%;
      }
    `

    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const handleMouseEnter = useCallback((index) => {
    setActiveLetters((prev) => new Set(prev).add(index))
  }, [])

  const handleAnimationEnd = useCallback((index) => {
    setActiveLetters((prev) => {
      const newSet = new Set(prev)
      newSet.delete(index)
      return newSet
    })
  }, [])

  const renderJumpingText = useCallback(
    (text, className = '') => {
      // 將文字以空格分割成單字陣列
      const words = text.split(' ')

      return (
        <div className={`jump-letter__container ${className}`}>
          {words.map((word, wordIndex) => (
            <>
              <div key={wordIndex}>
                {/* 如果不是第一個字，前面加空格 */}
                {wordIndex > 0 && <span>&nbsp;</span>}

                {/* 處理每個字母 */}
                {word.split('').map((letter, letterIndex) => (
                  <span
                    key={`${wordIndex}-${letterIndex}`}
                    className={`jump-letter__alphabet ${
                      activeLetters.has(`${wordIndex}-${letterIndex}`)
                        ? 'is-active'
                        : ''
                    }`}
                    onMouseEnter={() =>
                      handleMouseEnter(`${wordIndex}-${letterIndex}`)
                    }
                    onAnimationEnd={() =>
                      handleAnimationEnd(`${wordIndex}-${letterIndex}`)
                    }
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </>
          ))}
        </div>
      )
    },
    [activeLetters, handleMouseEnter, handleAnimationEnd]
  )

  return { renderJumpingText }
}

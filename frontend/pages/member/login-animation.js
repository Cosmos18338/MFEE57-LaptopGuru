import React, { useState } from 'react'

const LoginPage = () => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // 處理登入邏輯
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 筆記本外觀 */}
        <div
          className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-500 ${
            isFlipped ? 'scale-105' : ''
          }`}
        >
          {/* 筆記本上方裝飾 */}
          <div className="h-4 bg-pink-200 flex justify-between items-center px-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="text-xs text-pink-700">Login Notes</div>
          </div>

          {/* 筆記內容區 */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 標題裝飾 */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-700 flex items-center justify-center">
                  <span className="text-pink-500 mr-2">📝</span>
                  Welcome Back!
                </h2>
                <div className="mt-2 h-1 w-16 bg-pink-200 mx-auto rounded-full"></div>
              </div>

              {/* 輸入框 */}
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    className="w-full p-3 border-b-2 border-gray-200 focus:border-pink-300 outline-none transition-colors duration-300 bg-transparent"
                    placeholder="Email"
                    onFocus={() => setIsFlipped(true)}
                    onBlur={() => setIsFlipped(false)}
                  />
                  <span className="absolute right-3 top-3 text-gray-400">
                    ✉️
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    className="w-full p-3 border-b-2 border-gray-200 focus:border-pink-300 outline-none transition-colors duration-300 bg-transparent"
                    placeholder="Password"
                    onFocus={() => setIsFlipped(true)}
                    onBlur={() => setIsFlipped(false)}
                  />
                  <span className="absolute right-3 top-3 text-gray-400">
                    🔑
                  </span>
                </div>
              </div>

              {/* 登入按鈕 */}
              <button
                type="submit"
                className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                Sign In ✨
              </button>

              {/* 底部裝飾 */}
              <div className="text-center mt-4 text-sm text-gray-500">
                <a href="#" className="text-pink-500 hover:text-pink-600">
                  Forgot Password?
                </a>
                <div className="mt-2">
                  Need an account?{' '}
                  <a href="#" className="text-pink-500 hover:text-pink-600">
                    Sign Up
                  </a>
                </div>
              </div>
            </form>
          </div>

          {/* 底部裝飾線 */}
          <div className="h-2 bg-pink-100"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

import React, { useState } from 'react'

const ArticleBrandSearch = () => {
  const [selectedBrands, setSelectedBrands] = useState([])

  // 自我解說
  //創建 handleCheckboxChange 事件，去接受 value 改變的事件
  // 當 checkbox 被 checked 的時候，e.target 的方法把 value 提取出來，例如 acer；
  // 如果checked發生了  if (checked){
  // 構建 URL 的請求，將網址加入上述的 value (acer)
  // prev 會創建新的陣列，並測試 brand 是否不等於 !==  value

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target

    if (checked) {
      setSelectedBrands((prev) => {
        const updatedBrands = [...prev, value]
        fetchArticles(updatedBrands) // 使用更新後的品牌
        return updatedBrands
      })
    } else {
      setSelectedBrands((prev) => {
        const updatedBrands = prev.filter((brand) => brand !== value)
        fetchArticles(updatedBrands) // 使用更新後的品牌
        return updatedBrands
      })
    }
  }

  const fetchArticles = async (brands) => {
    const url = `/article/article-detail?brands=${brands.join('&brands=')}`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brands }), // 傳送更新後的品牌
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log(data) // 在這裡處理回傳的資料
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }

  return (
    <>
      <div className="ArticleBrandSearch container bg-transparent">
        <form id="brandForm">
          <div className="row justify-content-between gap-3">
            <div className="ArticleCheckbox text-nowrap col-2">
              <input
                type="checkbox"
                id="customCheck1"
                value="Acer"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="customCheck1" className="ArticleCheckboxLabel">
                &nbsp;&nbsp;Acer
              </label>
            </div>
            <div className="ArticleCheckbox text-nowrap col-2">
              <input
                type="checkbox"
                id="customCheck2"
                value="Asus"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="customCheck2" className="ArticleCheckboxLabel">
                &nbsp;&nbsp;Asus
              </label>
            </div>
            <div className="ArticleCheckbox text-nowrap col-2">
              <input
                type="checkbox"
                id="customCheck3"
                value="Gigabyte"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="customCheck3" className="ArticleCheckboxLabel">
                &nbsp;&nbsp;Gigabyte
              </label>
            </div>
            <div className="ArticleCheckbox text-nowrap col-2">
              <input
                type="checkbox"
                id="customCheck4"
                value="HP"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="customCheck4" className="ArticleCheckboxLabel">
                &nbsp;&nbsp;HP
              </label>
            </div>
            <div className="ArticleCheckbox text-nowrap col-2">
              <input
                type="checkbox"
                id="customCheck5"
                value="MSI"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="customCheck5" className="ArticleCheckboxLabel">
                &nbsp;&nbsp;MSI
              </label>
            </div>
            <div className="ArticleCheckbox text-nowrap col-2">
              <input
                type="checkbox"
                id="customCheck6"
                value="Razer"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="customCheck6" className="ArticleCheckboxLabel">
                &nbsp;&nbsp;Razer
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ArticleBrandSearch

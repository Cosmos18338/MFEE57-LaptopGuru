import React from 'react'
import ArticleSectionContainer from '@/components/blog/bloghomepage/articlehomepage-mainarea'

export default function ArticleDetailMainArea() {
  return (
    <>
      <ArticleSectionContainer />
      <div>
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        <main className="BlogMain">
          <div className="BlogSearchBox">
            <form className="form-inline my-2 my-lg-0 d-flex justify-content-center">
              <input
                className="form-control BlogSearchInputStyle"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn" type="submit">
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </form>
          </div>
        </main>
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        <div className="BlogTypeSearch bg-transparent">
          <form action>
            <div className="d-flex justify-content-around gap-3 flex-wrap">
              <div className="BlogTypeCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck7" value="購買心得" />
                <label htmlFor="customCheck7" className="BlogTypeCheckboxLabel">
                  &nbsp;&nbsp;購買心得
                </label>
              </div>
              <div className="BlogTypeCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck8" value="開箱文" />
                <label htmlFor="customCheck8" className="BlogTypeCheckboxLabel">
                  &nbsp;&nbsp;開箱文
                </label>
              </div>
              <div className="BlogTypeCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck9" value="疑難雜症" />
                <label htmlFor="customCheck9" className="BlogTypeCheckboxLabel">
                  &nbsp;&nbsp;疑難雜症
                </label>
              </div>
              <div className="BlogTypeCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck10" value="活動心得" />
                <label
                  htmlFor="customCheck10"
                  className="BlogTypeCheckboxLabel"
                >
                  &nbsp;&nbsp;活動心得
                </label>
              </div>
            </div>
          </form>
        </div>
        {/* 紫線 */}
        <div className="PurpleLine" />
        {/* 紫線 */}
        <div className="ArticleBrandSearch bg-transparent">
          <form action>
            <div className="row justify-content-between gap-3">
              <div className="ArticleCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck1" value="Acer" />
                <label htmlFor="customCheck1" className="ArticleCheckboxLabel">
                  &nbsp;&nbsp;Acer
                </label>
              </div>
              <div className="ArticleCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck2" value="Asus" />
                <label htmlFor="customCheck2" className="ArticleCheckboxLabel">
                  &nbsp;&nbsp;Asus
                </label>
              </div>
              <div className="ArticleCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck3" value="Gigabyte" />
                <label htmlFor="customCheck3" className="ArticleCheckboxLabel">
                  &nbsp;&nbsp;Gigabyte
                </label>
              </div>
              <div className="ArticleCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck4" value="HP" />
                <label htmlFor="customCheck4" className="ArticleCheckboxLabel">
                  &nbsp;&nbsp;HP
                </label>
              </div>
              <div className="ArticleCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck5" value="MSI" />
                <label htmlFor="customCheck5" className="ArticleCheckboxLabel">
                  &nbsp;&nbsp;MSI
                </label>
              </div>
              <div className="ArticleCheckbox text-nowrap col-2">
                <input type="checkbox" id="customCheck6" value="Raser" />
                <label htmlFor="customCheck6" className="ArticleCheckboxLabel">
                  &nbsp;&nbsp;Raser
                </label>
              </div>
            </div>
          </form>
        </div>
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* 搜尋列 */}
        {/* BlogCard */}
        <div className="ArticleSmallTitle text-nowrap">
          <p className>
            <i className="fa-solid fa-diamond TitleDiamond" /> 最新資訊
          </p>
        </div>
        <div className="position-relative">
          <div className="d-flex flex-column align-items-center justify-content-center gap-5">
            <div className="row">
              <div className="col-md-12 col-lg-6 mb-3">
                <div className="card d-flex flex-row BlogCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top w-50 h-100 BlogCardImg"
                    alt="..."
                  />
                  <div className="card-body w-50 h-100">
                    <div className="BlogCardBodyContent">
                      <div className="row">
                        <p className="BlogCardTitle">
                          文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                        </p>
                        <h7 className="card-text mb-4 BlogCardContent">
                          文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                        </h7>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text BlogCardType">版主：Jack</p>
                        <p>
                          <i className="fa-brands fa-readme" />
                          &nbsp;123
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>type</p>
                        <p>時間</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 mb-3">
                <div className="card d-flex flex-row BlogCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top w-50 h-100 BlogCardImg"
                    alt="..."
                  />
                  <div className="card-body w-50 h-100">
                    <div className="BlogCardBodyContent">
                      <div className="row">
                        <p className="BlogCardTitle">
                          文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                        </p>
                        <h7 className="card-text mb-4 BlogCardContent">
                          文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                        </h7>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text BlogCardType">版主：Jack</p>
                        <p>
                          <i className="fa-brands fa-readme" />
                          &nbsp;123
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>type</p>
                        <p>時間</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-6 mb-3">
                <div className="card d-flex flex-row BlogCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top w-50 h-100 BlogCardImg"
                    alt="..."
                  />
                  <div className="card-body w-50 h-100">
                    <div className="BlogCardBodyContent">
                      <div className="row">
                        <p className="BlogCardTitle">
                          文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                        </p>
                        <h7 className="card-text mb-4 BlogCardContent">
                          文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                        </h7>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text BlogCardType">版主：Jack</p>
                        <p>
                          <i className="fa-brands fa-readme" />
                          &nbsp;123
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>type</p>
                        <p>時間</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 mb-3">
                <div className="card d-flex flex-row BlogCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top w-50 h-100 BlogCardImg"
                    alt="..."
                  />
                  <div className="card-body w-50 h-100">
                    <div className="BlogCardBodyContent">
                      <div className="row">
                        <p className="BlogCardTitle">
                          文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                        </p>
                        <h7 className="card-text mb-4 BlogCardContent">
                          文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                        </h7>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text BlogCardType">版主：Jack</p>
                        <p>
                          <i className="fa-brands fa-readme" />
                          &nbsp;123
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>type</p>
                        <p>時間</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-6 mb-3">
                <div className="card d-flex flex-row BlogCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top w-50 h-100 BlogCardImg"
                    alt="..."
                  />
                  <div className="card-body w-50 h-100">
                    <div className="BlogCardBodyContent">
                      <div className="row">
                        <p className="BlogCardTitle">
                          文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                        </p>
                        <h7 className="card-text mb-4 BlogCardContent">
                          文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                        </h7>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text BlogCardType">版主：Jack</p>
                        <p>
                          <i className="fa-brands fa-readme" />
                          &nbsp;123
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>type</p>
                        <p>時間</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6 mb-3">
                <div className="card d-flex flex-row BlogCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top w-50 h-100 BlogCardImg"
                    alt="..."
                  />
                  <div className="card-body w-50 h-100">
                    <div className="BlogCardBodyContent">
                      <div className="row">
                        <p className="BlogCardTitle">
                          文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                        </p>
                        <h7 className="card-text mb-4 BlogCardContent">
                          文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                        </h7>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text BlogCardType">版主：Jack</p>
                        <p>
                          <i className="fa-brands fa-readme" />
                          &nbsp;123
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>type</p>
                        <p>時間</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 小卡片製作 */}
        {/* 小卡片製作 */}
        {/* 小卡片製作 */}
        {/* 小卡片製作 */}
        {/* 小卡片製作 */}
        {/* 小卡片製作 */}
        {/* 小卡片製作 */}
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        <div className="">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        {/* 頁數 nav */}
        <div className="ProductPosts text-nowrap d-flex justify-content-between">
          <p className>
            <i className="fa-solid fa-diamond" />  商品相關貼文
          </p>
          <p>
            <i className="fa-solid fa-play" />
             查看更多
          </p>
        </div>
        <div className="position-relative">
          <div className="BlogSmallerCardEightGroup">
            {/* 八個一組的 BlogCard */}
            {/* 四個一組的 BlogCard */}
            <div className="BlogSmallerCardFourGroup">
              {/* 兩個一組的 BlogCard */}
              <div className="BlogSmallerCardTwoGroup">
                <div className="card BlogSmallerCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top BlogHomePageSmallerCardImg"
                    alt="..."
                  />
                  <div className="card-body BlogHomePageSmallerCardBody p-4">
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyTitle"
                    >
                      文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </p>
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyContent"
                    >
                      文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                    </p>
                  </div>
                </div>
                <div
                  className="card"
                  style={{ width: '21rem', height: '10rem', border: 'none' }}
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top BlogHomePageSmallerCardImg"
                    alt="..."
                  />
                  <div className="card-body BlogHomePageSmallerCardBody p-4">
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyTitle"
                    >
                      文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </p>
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyContent"
                    >
                      文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                    </p>
                  </div>
                </div>
              </div>
              {/* 兩個一組的 BlogCard */}
              {/* 兩個一組的 BlogCard */}
              <div className="BlogSmallerCardTwoGroup">
                <div className="card BlogSmallerCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top BlogHomePageSmallerCardImg"
                    alt="..."
                  />
                  <div className="card-body BlogHomePageSmallerCardBody p-4">
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyTitle"
                    >
                      文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </p>
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyContent"
                    >
                      文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                    </p>
                  </div>
                </div>
                <div
                  className="card"
                  style={{ width: '21rem', height: '10rem', border: 'none' }}
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top BlogHomePageSmallerCardImg"
                    alt="..."
                  />
                  <div className="card-body BlogHomePageSmallerCardBody p-4">
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyTitle"
                    >
                      文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </p>
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyContent"
                    >
                      文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                    </p>
                  </div>
                </div>
              </div>
              {/* 兩個一組的 BlogCard */}
            </div>
            {/* 四個一組的 BlogCard */}
            {/* 四個一組的 BlogCard */}
            {/* 兩個一組的 BlogCard */}
            <div className="BlogSmallerCardFourGroup">
              <div className="BlogSmallerCardTwoGroup">
                <div className="card BlogSmallerCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top BlogHomePageSmallerCardImg"
                    alt="..."
                  />
                  <div className="card-body BlogHomePageSmallerCardBody p-4">
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyTitle"
                    >
                      文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </p>
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyContent"
                    >
                      文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                    </p>
                  </div>
                </div>
                <div
                  className="card"
                  style={{ width: '21rem', height: '10rem', border: 'none' }}
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top BlogHomePageSmallerCardImg"
                    alt="..."
                  />
                  <div className="card-body BlogHomePageSmallerCardBody p-4">
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyTitle"
                    >
                      文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </p>
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyContent"
                    >
                      文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                    </p>
                  </div>
                </div>
              </div>
              {/* 兩個一組的 BlogCard */}
              {/* 兩個一組的 BlogCard */}
              <div className="BlogSmallerCardTwoGroup">
                <div className="card BlogSmallerCard">
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top BlogHomePageSmallerCardImg"
                    alt="..."
                  />
                  <div className="card-body BlogHomePageSmallerCardBody p-4">
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyTitle"
                    >
                      文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </p>
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyContent"
                    >
                      文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                    </p>
                  </div>
                </div>
                <div
                  className="card"
                  style={{ width: '21rem', height: '10rem', border: 'none' }}
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
                    className="card-img-top BlogHomePageSmallerCardImg"
                    alt="..."
                  />
                  <div className="card-body BlogHomePageSmallerCardBody p-4">
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyTitle"
                    >
                      文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題
                    </p>
                    <p
                      style={{ fontSize: '1.5rem', color: '#fff' }}
                      className="card-text BlogHomePageSmallerCardBodyContent"
                    >
                      文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容
                    </p>
                  </div>
                </div>
              </div>
              {/* 兩個一組的 BlogCard */}
            </div>
            {/* 四個一組的 BlogCard */}
          </div>
          {/* 八個一組的 BlogCard */}
          <div className="SmallCircleWidgetToLeft">
            <i className="fa-solid fa-angles-right" />
          </div>
          <div className="SmallCircleWidgetToRight">
            <i className="fa-solid fa-angles-right" />
          </div>
        </div>
        <div className="ChangePageDiamondDiv">
          {/* 換頁 */}
          <i className="fa-solid fa-diamond ChangePageDiamond" />
          <i className="fa-solid fa-diamond ChangePageDiamond" />
          <i className="fa-solid fa-diamond ChangePageDiamond" />
        </div>
      </div>
    </>
  )
}

import React, { useState, useEffect } from 'react'

// 現在缺少 ArticleViews 欄位
export default function ArticleDetailSmallerCard({
  ArticleBrand,
  ArticleTitle,
  ArticleContent,
  ArticleType,
  ArticleCreatedDate,
}) {
  return (
    <>
      <div className="card d-flex flex-row bg-dark ArticleSmallerCard">
        <img
          src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
          className="card-img-top w-50 h-100 ArticleSmallerCardImg"
          alt="..."
        />
        <div className="ArticleSmallerCardHeadHover">
          <p className="ArticleSmallerCardHeadHoverP">{ArticleBrand}</p>
        </div>
        <div className="card-body w-50 h-100 ArticleSmallerCardBody">
          <div className="ArticleSmallerCardBodyContent">
            <div className="d-flex">
              <div className="row">
                <p className="ArticleSmallerCardTitle">{ArticleTitle}</p>
                <h7 className="card-text mb-4 ArticleSmallerCardContent">
                  {ArticleContent}
                </h7>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="card-text ArticleSmallerCardType">
                版主可能要去除喔
              </p>
              <p>
                <i className="fa-brands fa-readme" />
                &nbsp;ArticleViews閱覽數可能要新增
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>{ArticleType}</p>
              <p>{ArticleCreatedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

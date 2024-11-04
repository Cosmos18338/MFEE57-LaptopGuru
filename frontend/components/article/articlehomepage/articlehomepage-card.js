import React, { useState, useEffect } from 'react'

export default function ArticleHomePageCard({
  ArticleBrand,
  ArticleTitle,
  ArticleContent,
  ArticleType,
  ArticleCreatedDate,
}) {
  return (
    <>
      <div className="card ArticleCardStyle">
        <div className="ArticleCardHead">
          <img
            className="card-img-top ArticleCardImg"
            src="https://th.bing.com/th/id/OIP.V5ThX7OGGxexxzFbYvHtBwHaFJ?rs=1&pid=ImgDetMain"
            alt="Card image cap"
          />
          <div className="HoverBrand">
            <p className="CardBrandHover">{ArticleBrand}</p>
          </div>
        </div>
        <div className="card-body d-flex row m-1">
          <p className="card-text m-0 CardBrand">{ArticleBrand}</p>
          <h6 className="card-title mb-3 ArticleCardTitle">{ArticleTitle}</h6>
          <h7 className="card-text mb-3 ArticleCardContent">
            {ArticleContent}
          </h7>
          <div className="d-flex justify-content-between">
            <p className="card-text ArticleCardType">{ArticleType}</p>
            <p className="card-text ArticleCreatedTime">{ArticleCreatedDate}</p>
          </div>
        </div>
      </div>
    </>
  )
}

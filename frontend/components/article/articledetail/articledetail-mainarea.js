import React, { useState, useEffect } from 'react'

export default function ArticleDetailMainArea(props) {
  return (
    <>
      <div className="ArticleSectionContainer">
        <div className="d-flex">
          <div className="row">
            <div className="ArticleSectionTitle">
              <p className="text-light">Article</p>
            </div>
            <div className="ArticleSectionIntroduction">
              <p className="text-light h5">
                各種筆電官方品牌發文 <br />
                最新的官方品牌情報在 GURU！
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

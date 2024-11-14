import React, { useState, useEffect } from 'react'

export default function BlogDetailMainArea(props) {
  return (
    <>
      <div className=" container-fluid ArticleSectionContainer h-100">
        <div className="d-flex">
          <div className="row">
            <div className="ArticleSectionTitle">
              <p className="text-light">Blog</p>
            </div>
            <div className="ArticleSectionIntroduction">
              <p className="text-light h5">
                購買筆電的完美體驗 <br />
                GURU！
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

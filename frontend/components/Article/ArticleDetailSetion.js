import { useCart } from '@/hooks/use-cart-state'
import { useEffect, useState } from 'react'

const ArticleSection = () => {
  return (
    <section className="container-fluid ArticleSectionContainer">
      <div className="container">
        <div className="row d-flex">
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
    </section>
  )
}

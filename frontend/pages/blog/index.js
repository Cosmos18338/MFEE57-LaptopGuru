import React from 'react'
import BlogDetailMainArea from '@/components/blog/bloghomepage/articlehomepage-mainarea'
import BlogHomepageSearchbox from '@/components/blog/bloghomepage/bloghomepage-searchbox'
import BloghomepageTypesearch from '@/components/blog/bloghomepage/bloghomepage-typesearch'
import BloghomepageBrandCardGroup from '@/components/blog/bloghomepage/bloghomepage-brandcardgroup'

export default function ArticleDetailMainArea() {
  return (
    <>
      {/* 不要急 */}
      {/* 引入 main、搜尋欄、購買心得的格子、品牌搜尋欄、部落格最新的card6張、部落格品牌的 card*/}
      <BlogDetailMainArea />
      {/* 購買心得好像那欄還沒弄進來 */}
      <BloghomepageTypesearch />
      <BlogHomepageSearchbox />
      <div>這是部落格首頁</div>
      {/* 還有個部落格品牌的 card */}
      <BloghomepageBrandCardGroup />
    </>
  )
}

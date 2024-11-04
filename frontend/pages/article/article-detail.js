import React from 'react'
import ArticleDetailMainArea from '@/components/Article/articledetail/articledetail-mainarea'
import ArticleDetailSection from '@/components/Article/articledetail/articledetail-section'
import ArticleDetailSmallerCardGroup from '@/components/Article/articledetail/articledetail-smallercard-group'

export default function ArticleDetail() {
  return (
    <>
      <ArticleDetailMainArea />
      <ArticleDetailSection />
      <ArticleDetailSmallerCardGroup />
    </>
  )
}

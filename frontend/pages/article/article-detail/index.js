import React from 'react'
import ArticleDetailMainArea from '@/components/article/articledetail/articledetail-mainarea'
import ArticleDetailSection from '@/components/article/articledetail/articledetail-section'
import ArticleDetailSmallerCardGroup from '@/components/article/articledetail/articledetail-smallercard-group'

export default function ArticleDetail() {
  return (
    <>
      <ArticleDetailMainArea />
      <ArticleDetailSection />
      <ArticleDetailSmallerCardGroup />
    </>
  )
}

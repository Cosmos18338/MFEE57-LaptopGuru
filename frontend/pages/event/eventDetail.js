import React from 'react'
import EventButton from '@/components/event/EventButton'

const EventDetail = () => {
  const eventInfo = {
    title: '英雄聯盟政大盃第十屆',
    status: '報名中',
    date: '2024/08/23 13:00',
    registration: {
      start: '2024/08/16 19:15',
      end: '2024/08/23 11:00',
    },
    platform: 'PC',
    teamLimit: '30/32',
    prize: '總獎池 萬元獎金+滑鼠',
    image:
      'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: [
      '本屆英雄聯盟政大盃是與Planet以及acer贊助舉辦的一場校園盛事，旨在希望更多人重拾一起打英雄聯盟的熱情。',
      '本屆比賽並無限制參賽資格，無論你是否為政大學生，只要你們對英雄聯盟召喚峽谷保有熱情，請盡管踴躍地報名吧！比賽無參賽費用，人齊開打，一起煥揚出激烈的火花吧！',
    ],
    rules: [
      '隊伍隊長報名時請將遊戲ID填寫為隊伍的名稱',
      '比賽日程中(8/23-8/25)將填在17:00-22:00完成比賽，若有協調上的問題可以在賽事DC群組提出',
      '由於賽程較緊湊，32強及16強(8/23)、8強及4強(8/24)皆在同一天，煩請隊長在比賽結束時善於回應賽事，方便賽隊伍確認下一輪的對手以及協調',
      '有任何疑問都請各位在賽事DC的問題詢問中提出',
      '回合1為32強，回合2為16強，依此類推。',
    ],
  }

  return (
    <div className="eventDetail-wrapper">
      <div className="container">
        <nav className="navbar navbar-dark eventDetail-navbar mb-4">
          <div className="container-fluid">
            <span className="navbar-brand h1">{eventInfo.title}</span>
            <EventButton>{eventInfo.status}</EventButton>
          </div>
        </nav>

        <div className="container container-lg mb-4 eventDetail-content">
          <div className="row gy-4">
            {/* 左側資訊 */}
            <div className="col-12 col-md-4 order-md-1 order-2">
              <div className="eventDetail-infoBox">
                <dl className="eventDetail-infoList mb-0">
                  <dt>活動日期</dt>
                  <dd>{eventInfo.date}</dd>
                  <dt>報名期間</dt>
                  <dd>
                    開始：{eventInfo.registration.start}
                    <br />
                    結束：{eventInfo.registration.end}
                  </dd>
                  <dt>平台</dt>
                  <dd>{eventInfo.platform}</dd>
                  <dt>隊伍上限</dt>
                  <dd>{eventInfo.teamLimit}</dd>
                  <dt>獎勵</dt>
                  <dd>{eventInfo.prize}</dd>
                </dl>
                <div className="d-grid gap-2">
                  <EventButton>報名參加</EventButton>
                  <EventButton>開團找人</EventButton>
                  <EventButton>揪團列表</EventButton>
                </div>
              </div>
            </div>

            {/* 右側內容 */}
            <div className="col-12 col-md-8 order-md-2 order-1">
              <img
                src={eventInfo.image}
                alt="活動圖片"
                className="eventDetail-image mb-4"
              />
              <div className="eventDetail-infoBox">
                <h2 className="h5 mb-3">活動介紹</h2>
                {eventInfo.description.map((paragraph, index) => (
                  <p key={`desc-${index}`}>{paragraph}</p>
                ))}
              </div>
              <div className="eventDetail-infoBox">
                <h2 className="h5 mb-3">規則</h2>
                <ul className="eventDetail-rulesList">
                  {eventInfo.rules.map((rule, index) => (
                    <li key={`rule-${index}`}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail

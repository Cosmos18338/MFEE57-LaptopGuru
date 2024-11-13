import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function MembershipLevels() {
  const { auth } = useAuth();
  const level_chinese = auth?.userData?.level;
  const calculateMembershipLevel = (totalSpent) => {
    if (totalSpent >= 100000) return 4;      // 鑽石
    if (totalSpent >= 70000) return 3;       // 金牌
    if (totalSpent >= 40000) return 2;       // 銀牌
    if (totalSpent >= 20000) return 1;       // 銅牌
    return 0;                                // 一般會員
  };

const getMembershipLevel = (level_chinese) => {
  switch (level_chinese) {
    case 0:
      return '剛註冊';
    case 1:
      return '銅牌會員';
    case 2:
      return '銀牌會員';
    case 3:
      return '金牌會員';
    case 4:
      return '鑽石會員';
    default:
      return '未知等級';
  }
};
  // 計算進度百分比
  const calculateProgress = () => {
    if (totalSpent <= maxStandardSpent) {
      return (totalSpent / maxStandardSpent) * 100;
    }
    // 超過100000的情況
    return 100 + ((totalSpent - maxStandardSpent) / maxStandardSpent) * 20; // 額外增加20%空間
  };

  // 決定顏色
  const getVariant = () => {
    if (totalSpent >= 100000) return "info";
    if (totalSpent >= 70000) return "success";
    if (totalSpent >= 40000) return "warning";
    if (totalSpent >= 20000) return "danger";
    return "secondary";
  };

 
  
  const levels = [
    {
      name: '銅牌會員',
      benefits:
        '可於文章區發表文章、參加活動、包膜優惠價(打95折，價值1,000的包膜等於省50元)',
    },
    {
      name: '銀牌會員',
      benefits:
        '可於文章區發表文章、參加活動、包膜優惠價(打95折，價值1,000的包膜等於省50元)',
    },
    {
      name: '金牌會員',
      benefits:
        '可於文章區發表文章、參加活動、送免費新機包膜服務、三節打95折(等於購買30,000的電腦可省500)、電腦包客製化姓名刺繡服務(價值120元)',
    },
    {
      name: '鑽石會員',
      benefits:
        '可於文章區發表文章、參加活動、免費包膜服務(價值1,000)、日後購買新機免費升級延長保固半年、生日禮(抽獎券-可抽筆電支架)',
    },
  ];

  return (
    <>

    <div
      className="container-fluid py-5"
      style={{
        background: 'linear-gradient(135deg, #6C4CCE 0%, #805AF5 100%)',
      }}
    >
      <div className="row mb-4">
        <div className="col">
          <h2 className="text-white mb-0">
            <span className="diamond"></span>
            會員等級
          </h2>
          <div className="col-">
            <h3 className="text-white">目前是{getMembershipLevel(level_chinese)}~</h3> {/* 顯示等級名稱 */}
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {levels.map((level, index) => (
          <div key={index} className="col">
            <div className="membership-card p-4 d-flex flex-column">
              <h3 className="text-white mb-3">{level.name}</h3>
              <p className="text-white flex-grow-1">{level.benefits}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style jsx>{`
        .membership-card {
          background: linear-gradient(180deg, #6c4cce 0%, #000000 100%);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          height: 100%;
        }
        .membership-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          transform: rotate(-45deg);
          pointer-events: none;
        }
        .diamond {
          width: 12px;
          height: 12px;
          background-color: #805af5;
          transform: rotate(45deg);
          display: inline-block;
          margin-right: 8px;
        }
      `}</style>
    </>
  );
}

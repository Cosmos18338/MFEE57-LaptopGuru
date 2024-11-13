// Coupon 元件
export default function Coupon2({
  coupon_id,          // 加入這個
  coupon_code,
  coupon_content,
  coupon_discount,
  discount_method,
  coupon_start_time,
  coupon_end_time,
}) {

  // 判斷折扣方式並格式化顯示文字
  const getDiscountText = () => {
    if (discount_method === 1) {
      return `折扣 ${coupon_discount} 元`
    } else {
      return `打 ${coupon_discount} 折`
    }
  }

  return (
    <div className="coupon-wrapper">
      <img className="coupon-bg" src="/coupon_3.svg" alt="coupon background" />
      <div className="coupon-content">
        <h2 className="store-name2">GURU Laptop</h2>
        <p className="offer-text2">{coupon_content}</p>
        <div className="coupon-code2">優惠券代碼：{coupon_code}</div>
        <div className="coupon_discount2">
          {getDiscountText()} {/* 使用判斷後的折扣文字 */}
        </div>
        <div className="expiry-date2">
          期限：{coupon_end_time}前
        </div>
      </div>
    </div>
  )
}
export default function MyFooter() {
  return (
    <footer>
      <div className="conatiner p-5">
        <div className="row m-3 border-bottom border-light">
          <div className="col-5">
            <div className="footer-logo">
              <img src="/logo.svg" alt="網站 Logo" />
            </div>
          </div>
          <div className="col">
            <div className="text-light mb-2">關於我們</div>
            <div className="text-light mb-2">加入我們</div>
            <div className="text-light">最新優惠</div>
          </div>
          <div className="col">
            <div className="text-light mb-2">產品列表</div>
            <div className="text-light mb-2">租賃規則</div>
            <div className="text-light">比看看!</div>
          </div>
          <div className="col">
            <div className="text-light mb-2">最新文章</div>
            <div className="text-light mb-2">來揪團</div>
          </div>
          <div className="mb-4" />
        </div>
        <div className="row p-3">
          <div className="col">
            <img src="/Icon-fb.svg" alt="Facebook 圖標" className="me-3" />
            <img src="/Icon-ig.svg" alt="Instagram 圖標" />
          </div>
          <div className="col text-light text-end">© 2024 Hello, Inc.</div>
        </div>
      </div>
    </footer>
  )
}

import { Nav, Tab } from 'react-bootstrap'
import { FaPenFancy } from 'react-icons/fa'
import MembershipLevels from '@/components/dashboard/membership-levels' // 假設這是你的會員等級組件

const LeftAside = () => {
  return (
    <Tab.Container id="left-tabs" defaultActiveKey="collection">
      <div className="col-2">
        <div className="text-center mb-4">
          <img
            src="https://via.placeholder.com/70x70"
            alt="Profile"
            className="rounded-circle img-fluid mb-3"
            style={{ width: '70px', height: '70px' }}
          />
          <h5 className="mb-2">萊歐斯·托登</h5>
          <button
            className="btn btn-outline-primary btn-sm mb-3"
            style={{ color: '#805AF5', borderColor: '#805AF5' }}
          >
            <FaPenFancy />
            編輯個人簡介
          </button>
        </div>

        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="collection" className="text-center">
              收藏清單
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="membership" className="text-center">
              會員等級
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {/* 對應的內容區域 */}
      <Tab.Content>
        <Tab.Pane eventKey="collection">
          <h3>收藏清單內容</h3>
          {/* 收藏清單的組件 */}
        </Tab.Pane>
        <Tab.Pane eventKey="membership">
          <MembershipLevels />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  )
}

export default LeftAside

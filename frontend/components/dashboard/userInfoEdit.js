import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import { taiwanData } from '@/components/dashboard/test-address'
import AddressCompo from '@/components/dashboard/test-address'
import { useAuth } from '@/hooks/use-auth'


export default function UserProfile() {
  const { auth } = useAuth()
  const [editableUser, setEditableUser] = useState({
    name: auth.userData?.name || '',
    password: auth.userData?.password || '******',
    gender: auth.userData?.gender || '男',
    birthdate: auth.userData?.birthdate || '',
    phone: auth.userData?.phone || '',
    email: auth.userData?.email || '',
    country: auth.userData?.country || '',
    city: auth.userData?.city || '',
    district: auth.userData?.district || '',
    road_name: auth.userData?.road_name || '',
    detailed_address: auth.userData?.detailed_address || '',
  })

  useEffect(() => {
    if (auth.userData) {
      setEditableUser({
        name: auth.userData.name,
        password: auth.userData.password,
        gender: auth.userData.gender,
        birthdate: auth.userData.birthdate,
        phone: auth.userData.phone,
        email: auth.userData.email,
        country: auth.userData.country,
        city: auth.userData.city,
        district: auth.userData.district,
        road_name: auth.userData.road_name,
        detailed_address: auth.userData.detailed_address,
      })
    }
  }, [auth.userData])

  const [user, setUser] = useState({
    name: '',
    password: '******',
    gender: '男',
    birthdate: '',
    phone: '0900000000',
    country: '',
    city: '',
    district: '',
    road_name: '',
    detailed_address: '',
    email: '@gmail.com',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`/api/dashboard/${user_id}`, user)

        const result = await response.json()
        if (result.status === 'success') {
          setData(result.users)
        }
      } catch (error) {
        console.error('無法取得資料:', error)
      }
    }
    fetchData()
  }, [])

  const [profilePic, setProfilePic] = useState(
    'https://via.placeholder.com/220x220'
  )
  const [showpassword, setShowpassword] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedRoad, setSelectedRoad] = useState('')
  const [areaList, setAreaList] = useState([])
  const [roadList, setRoadList] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)//紀錄選擇的圖檔，初始值用null

  // useEffect(() => {
  //   const city = taiwanData.find(city => city.CityName === selectedCity);
  //   setAreaList(city ? city.AreaList : []);
  //   setRoadList([]);
  // }, [selectedCity]);

  // useEffect(() => {
  //   const area = areaList.find(area => area.AreaName === selectedArea);
  //   setRoadList(area ? area.RoadList : []);
  // }, [selectedArea, areaList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

// 第一種方法較適合，因為可以直接把 File 物件傳給後端
const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    // 檢查檔案大小
    if (file.size > 5 * 1024 * 1024) { // 例如限制5MB
      alert('檔案太大')
      return
    }
    
    // 檢查檔案類型
    if (!file.type.startsWith('image/')) {
      alert('請上傳圖片檔案')
      return
    }

    setSelectedImg(file)
    
    // 使用 FormData 傳送到後端
    const formData = new FormData()
    formData.append('image', file)
    
    // 發送到後端
    axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 表單驗證
      if (!user.name || !user.email) {
        Swal.fire('請填寫必要欄位');
        return;
      }
     
      // 更新使用者
      const response = await axios.put(`/api/users/${user.id}`, {
        name: user.name,
        email: user.email,
        // 其他要更新的欄位...
      });
  
      if (response.status === 200) {
        Swal.fire('使用者資料更新成功');
        // 可能需要更新本地狀態或重新導向
        // setUser(response.data);
        // router.push('/dashboard');
      }
    } catch (error) {
      console.error('更新失敗:', error);
      Swal.fire(error.response?.data?.message || '更新失敗，請稍後再試');
    }
  };
  
  const handleDeactivate = async () => {
    try {
      // 建議加入確認對話框
      const isConfirmed = window.confirm('確定要停用此使用者嗎？請至聯繫克服以重新使用帳號');
      
      if (!isConfirmed) {
        return;
      }
  
      // 軟刪除/停用使用者
      const response = await axios.patch(`/api/users/${user.id}/deactivate`, {
        isActive: false,
        deactivatedAt: new Date().toISOString()
      });
  
      if (response.status === 200) {
        Swal.fire('使用者已停用');
        // 可能需要更新使用者列表或重新導向
        // router.push('/users');
      }
    } catch (error) {
      console.error('停用失敗:', error);
      Swal.fire(error.response?.data?.message || '停用失敗，請稍後再試');
    }
  };

  // const handleAddressUpdate = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prevUser) => ({ ...prevUser, address: `${selectedCity} ${selectedArea} ${selectedRoad} ${value}` }));
  // };

  const handleProfilePicSubmit = (e) => {
    e.preventDefault()
    // Handle profile picture upload here
    setUploadStatus('頭像更新成功！')
  }

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          {/* LeftAside 左邊側欄 */}
            {/* <div className="col-md-2"></div> */}


          {/* Main Content (User Profile) */}
          <div className="">{/* <div className="col-md-9"></div> */}

            <div className="card">
              <div
                className="card-header d-flex align-items-center"
                style={{ backgroundColor: '#805AF5', color: 'white' }}
              >
                <div
                  className="bg-white"
                  style={{
                    width: '12px',
                    height: '12px',
                    transform: 'rotate(45deg)',
                    marginRight: '8px',
                  }}
                ></div>
                <h5 className="mb-0">檔案管理</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Form Section */}
                  <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                      {/* 使用者資料 */}

                      <div className="mb-3 row">
                        <label
                          htmlFor="name"
                          className="col-sm-3 col-form-label"
                        >
                          使用者名稱
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={editableUser.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="password"
                          className="col-sm-3 col-form-label"
                        >
                          密碼修改
                        </label>
                        <div className="col-sm-9">
                          <input
                            type={showpassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            name="password"
                            value={editableUser.password}
                            onChange={handleInputChange}
                          />
                          <input
                            type="checkbox"
                            id="showpassword"
                            checked={showpassword}
                            onChange={() => setShowpassword(!showpassword)}
                            className="form-check-input"
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="gender"
                          className="col-sm-3 col-form-label"
                        >
                          性別
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={editableUser.gender}
                            onChange={handleInputChange}
                          >
                            <option value="male">男</option>
                            <option value="female">女</option>
                            <option value="undisclosed">不公開</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="birthdate"
                          className="col-sm-3 col-form-label"
                        >
                          生日
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="date"
                            className="form-control"
                            id="birthdate"
                            name="birthdate"
                            value={editableUser.birthdate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          htmlFor="phone"
                          className="col-sm-3 col-form-label"
                        >
                          手機號碼
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={editableUser.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* 地址選擇 */}
                      <AddressCompo />
                      {/* 新的地址onChange沒有handleinput change */}
                      {/* 電子郵件 */}
                      <div className="mb-3 row">
                        <label
                          htmlFor="email"
                          className="col-sm-3 col-form-label"
                        >
                          電子郵件
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={editableUser.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            backgroundColor: '#805AF5',
                            borderColor: '#805AF5',
                          }}
                        >
                          更新
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            backgroundColor: '#805AF5',
                            borderColor: '#805AF5',
                          }}
                          onClick={handleDeactivate}
                        >
                          停用
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Profile Picture Section */}
                  <div className="col-md-4">
                    <form onSubmit={handleProfilePicSubmit}>
                      <div className="text-center">
                        <img
                          src={profilePic}
                          alt="Profile"
                          className="rounded-circle img-fluid mb-3"
                          style={{ width: '220px', height: '220px' }}
                        />
                        <div className="mb-3">
                          <label
                            htmlFor="profile-pic-upload"
                            className="btn btn-outline-primary"
                            style={{ color: '#805AF5', borderColor: '#805AF5' }}
                          >
                            大頭照
                          </label>
                          <input
                            id="profile-pic-upload"
                            type="file"
                            accept="image/*"
                            className="d-none"
                            value={user.image_path}
                            onChange={handleImageChange}

                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            backgroundColor: '#805AF5',
                            borderColor: '#805AF5',
                          }}
                        >
                          更新
                        </button>

                       

                        {/* 顯示上傳狀態 */}
                        {uploadStatus && (
                          <div className="alert alert-success mt-3">
                            {uploadStatus}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

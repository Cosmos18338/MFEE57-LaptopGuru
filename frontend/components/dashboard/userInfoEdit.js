import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { taiwanData } from '@/components/dashboard/test-address'
import axios from 'axios'
import { useAuth } from '@/hooks/use-auth'
import $ from 'jquery'
// 導入縣市資料
// import { taiwanData, groupCitiesByRegion } from '@/data/address/data.js'

export default function UserProfile() {
  const { auth, setAuth } = useAuth()
  const { userData } = auth
  const [profilePic, setProfilePic] = useState(
    'https://via.placeholder.com/220x220'
  )
  const [showpassword, setShowpassword] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  useEffect(() => {
    // Initialize city and area lists based on user data
    if (userData.city) {
      $('#city').val(userData.city).trigger('change')
    }
    if (userData.district) {
      $('#district').val(userData.district).trigger('change')
    }
    if (userData.road_name) {
      $('#roadList').val(userData.road_name)
    }
  }, [userData])

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setProfilePic(e.target.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission here
    try {
      const response = await axios.put(`/api/dashboard/${userId}`, user)
      if (response.data.status === 'success') {
        alert('更新成功！')
      }
    } catch (error) {
      console.error('更新失敗:', error)
      alert('更新失敗！')
    }
  }

  // const handleAddressUpdate = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prevUser) => ({ ...prevUser, address: `${selectedCity} ${selectedArea} ${selectedRoad} ${value}` }));
  // };

  const handleProfilePicSubmit = (e) => {
    e.preventDefault()
    // Handle profile picture upload here
    setUploadStatus('頭像更新成功！')
  }
  const handleDeactivate = async () => {
    if (window.confirm('確定要停用帳號嗎？')) {
      try {
        const response = await axios.delete(`/api/dashboard/${user_id}`)
        if (response.data.status === 'success') {
          alert('帳號已停用')
          // 導向登出
          window.location.href = '/logout'
        }
      } catch (error) {
        console.error('停用失敗:', error)
        alert('停用失敗！')
      }
    }
  }
  useEffect(() => {
    // $(document).ready(function () {
    const citySelect = $('#city')
    const districtSelect = $('#district')
    const roadSelect = $('#roadList') // 新增的路選單

    // 按區域分組的縣市數據
    const groupedCities = {
      北部區域: [
        { CityName: '台北市', CityEngName: 'Taipei City' },
        { CityName: '新北市', CityEngName: 'New Taipei City' },
        { CityName: '基隆市', CityEngName: 'Keelung City' },
        { CityName: '新竹市', CityEngName: 'Hsinchu City' },
        { CityName: '桃園市', CityEngName: 'Taoyuan City' },
        { CityName: '新竹縣', CityEngName: 'Hsinchu County' },
      ],
      中部區域: [
        { CityName: '台中市', CityEngName: 'Taichung City' },
        { CityName: '苗栗縣', CityEngName: 'Miaoli County' },
        { CityName: '彰化縣', CityEngName: 'Changhua County' },
        { CityName: '南投縣', CityEngName: 'Nantou County' },
        { CityName: '雲林縣', CityEngName: 'Yunlin County' },
      ],
      南部區域: [
        { CityName: '高雄市', CityEngName: 'Kaohsiung City' },
        { CityName: '台南市', CityEngName: 'Tainan City' },
        { CityName: '嘉義市', CityEngName: 'Chiayi City' },
        { CityName: '嘉義縣', CityEngName: 'Chiayi County' },
        { CityName: '屏東縣', CityEngName: 'Pingtung County' },
      ],
      東部區域: [
        { CityName: '宜蘭縣', CityEngName: 'Yilan County' },
        { CityName: '花蓮縣', CityEngName: 'Hualien County' },
        { CityName: '台東縣', CityEngName: 'Taitung County' },
      ],
      離島區域: [
        { CityName: '金門縣', CityEngName: 'Kinmen County' },
        { CityName: '連江縣', CityEngName: 'Lienchiang County' },
        { CityName: '澎湖縣', CityEngName: 'Penghu County' },
      ],
    }

    // 動態載入分組的縣市
    for (const group in groupedCities) {
      const optgroup = $('<optgroup>').attr('label', group)
      groupedCities[group].forEach((city) => {
        optgroup.append(
          $('<option>')
            .val(city.CityName)
            .text(`${city.CityName} (${city.CityEngName})`)
        )
      })
      citySelect.append(optgroup)
    }

    // 當選擇國家時，啟用縣市選擇
    $('#country').on('change', function () {
      const selectedCountry = $(this).val()
      if (selectedCountry === '台灣') {
        citySelect.prop('disabled', false) // 啟用縣市下拉選單
      } else {
        citySelect
          .prop('disabled', true)
          .empty()
          .append('<option value="">請選擇縣市</option>') // 禁用並清空縣市下拉選單
        districtSelect
          .prop('disabled', true)
          .empty()
          .append('<option value="">請選擇鄉鎮市區</option>') // 禁用並清空鄉鎮市區下拉選單
        roadSelect
          .prop('disabled', true)
          .empty()
          .append('<option value="">請選擇居住街道</option>') // 禁用並清空街道下拉選單
      }
    })

    // 當選擇縣市時，動態載入鄉鎮市區
    citySelect.on('change', function () {
      const selectedCity = $(this).val()
      districtSelect
        .prop('disabled', false)
        .empty()
        .append('<option value="">請選擇鄉鎮市區</option>')
      roadSelect
        .prop('disabled', true)
        .empty()
        .append('<option value="">請選擇居住街道</option>') // 禁用街道選單

      // 根據選擇的縣市顯示相對應的鄉鎮市區
      const city = taiwanData.find((city) => city.CityName === selectedCity)
      if (city) {
        city.AreaList.forEach((area) => {
          districtSelect.append(
            $('<option>')
              .val(area.AreaName)
              .text(`${area.AreaName} (${area.ZipCode})`)
          )
        })
      }
    })

    // 當選擇鄉鎮市區時，動態載入對應的道路
    districtSelect.on('change', function () {
      const selectedArea = $(this).val()
      roadSelect
        .prop('disabled', false)
        .empty()
        .append('<option value="">請選擇居住街道</option>')

      // 根據選擇的鄉鎮市區顯示相對應的道路
      const selectedCity = citySelect.val() // 獲取選擇的縣市
      const city = taiwanData.find((city) => city.CityName === selectedCity) // 找到選擇的城市

      if (city) {
        const area = city.AreaList.find(
          (area) => area.AreaName === selectedArea
        ) // 找到選擇的區域
        if (area && area.RoadList) {
          // 確保找到的區域有 RoadList
          area.RoadList.forEach((road) => {
            roadSelect.append(
              $('<option>').val(road.RoadName).text(road.RoadName) // 假設 RoadName 是街道名稱
            )
          })
        } else {
          console.error('選擇的區域沒有對應的街道資料')
        }
      } else {
        console.error('未找到對應的城市')
      }
    })
    // }) // 確保結束大括號在這裡
  }, [])

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          {/* LeftAside 左邊側欄 */}
          <div className="col-md-2"></div>

          {/* Main Content (User Profile) */}
          <div className="col-md-9">
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
                          htmlFor="username"
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
                            value={userData.name}
                            onChange={(e) => {
                              setAuth(e.target.value)
                            }}
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
                            type="showpassword?'text':'password'"
                            className="form-control"
                            id="password"
                            name="password"
                            value={userData.password}
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
                          <input
                            type="text"
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={userData.gender}
                          />
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
                            value={userData.birthdate}
                            onChange={(e) => setAuth(e.target.value)}
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
                            value={userData.phone}
                          />
                        </div>
                      </div>
                      {/* 地址選擇 */}
                      <div>
                        <h2 className="mb-4">選擇國家、縣市與鄉鎮</h2>

                        {/* 國家選單 */}
                        <div className="mb-3 row">
                          <label
                            htmlFor="country"
                            className="col-sm-2 col-form-label"
                          >
                            國家:
                          </label>
                          <div className="col-sm-10">
                            <select
                              id="country"
                              className="form-select"
                              name="country"
                              value={userData.country}
                            >
                              <option value>請選擇國家</option>
                              <option value="台灣">台灣</option>
                              <option value="美國">美國</option>
                              <option value="加拿大">加拿大</option>
                              <option value="日本">日本</option>
                              <option value="韓國">韓國</option>
                              {/* 可以繼續添加更多國家 */}
                            </select>
                          </div>
                        </div>
                        {/* 縣市選單 */}
                        <div className="mb-3 row">
                          <label
                            htmlFor="city"
                            className="col-sm-2 col-form-label"
                          >
                            縣市:
                          </label>
                          <div className="col-sm-10">
                            <select
                              id="city"
                              name="city"
                              value={userData.city}
                              className="form-select"
                              disabled
                            >
                              <option value>請選擇縣市</option>
                            </select>
                          </div>
                        </div>
                        {/* 鄉鎮市區選單 */}
                        <div className="mb-3 row">
                          <label
                            htmlFor="district"
                            className="col-sm-2 col-form-label"
                          >
                            鄉鎮市區:
                          </label>
                          <div className="col-sm-10">
                            <select
                              id="district"
                              name="district"
                              value={userData.district}
                              className="form-select"
                              disabled
                            >
                              <option value>請選擇鄉鎮市區</option>
                            </select>
                          </div>
                        </div>
                        {/* 街道選單 */}
                        <div className="mb-3 row">
                          <label
                            htmlFor="road_name"
                            className="col-sm-2 col-form-label"
                          >
                            路:
                          </label>
                          <div className="col-sm-10">
                            <select
                              id="roadList"
                              name="road_name"
                              className="form-select"
                              disabled
                              value={userData.road_name}
                            >
                              <option value>請選擇居住街道</option>
                            </select>
                          </div>
                        </div>
                        {/* 詳細地址輸入 */}
                        <div className="mb-3 row">
                          <label
                            htmlFor="detailed_address"
                            className="col-sm-2 col-form-label"
                          >
                            詳細地址:
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              id="address"
                              value={userData.detailed_address}
                              name="detailed_address"
                              className="form-control"
                              placeholder="巷弄門牌"
                              required
                              autoComplete="address-level4"
                            />
                            <div className="form-text">
                              請輸入詳細地址（例如：1號、2樓、A棟）
                            </div>
                          </div>
                        </div>
                        {/* 備註欄位 */}
                        <div className="mb-3 row">
                          <label
                            htmlFor="remarks"
                            className="col-sm-2 col-form-label"
                          >
                            備註:
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              id="remarks"
                              name="remarks"
                              className="form-control"
                              rows={3}
                              placeholder="輸入備註"
                              value={userData.remarks}
                            />
                            <div className="form-text">
                              地址假如都不在以上選單的話，請填寫於備註
                            </div>
                          </div>
                        </div>
                      </div>
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
                            value={userData.email}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            backgroundColor: '#805AF5',
                            borderColor: '#805AF5',
                          }}
                        >
                          儲存
                        </button>
                        <button
                          type="submit"
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
                            value={userData.image_path}
                            onChange={handleProfilePicChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            backgroundColor: '#805AF5',
                            borderColor: '#805AF5',
                          }}
                        >
                          更新大頭照
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

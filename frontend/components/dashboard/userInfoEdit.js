import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftAside from '@/components/dashboard/leftAside'; // 假設 LeftAside 也是一部分
import styles from '@/styles/dashboard.module.scss'; // 引入你自己的樣式

export default function UserProfile() {
  const [user, setUser] = useState({
    username: '萊歐斯·托登',
    password: '**********',
    gender: '男',
    birthday: '1862/11/26',
    phone: '09000000000000000',
    address: '100台北市中正區重慶南路一段122號',
    email: 'Laios Touden@gmail.com',
  });

  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/220x220');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setProfilePic(e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', user);
  };

  const handleProfilePicSubmit = (e) => {
    e.preventDefault();
    // Handle profile picture upload here
    setUploadStatus('頭像更新成功！');
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        {/* LeftAside 左邊側欄 */}
        <div className="col-md-2">&nbsp</div>

        {/* Main Content (User Profile) */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-header d-flex align-items-center" style={{ backgroundColor: '#805AF5', color: 'white' }}>
              <div className="bg-white" style={{ width: '12px', height: '12px', transform: 'rotate(45deg)', marginRight: '8px' }}></div>
              <h5 className="mb-0">檔案管理</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Form Section */}
                <div className="col-md-8">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 row">
                      <label htmlFor="username" className="col-sm-3 col-form-label">使用者名稱</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="username" name="username" value={user.username} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="password" className="col-sm-3 col-form-label">密碼修改</label>
                      <div className="col-sm-9">
                        <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="gender" className="col-sm-3 col-form-label">性別</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="gender" name="gender" value={user.gender} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="birthday" className="col-sm-3 col-form-label">生日</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="birthday" name="birthday" value={user.birthday} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="phone" className="col-sm-3 col-form-label">手機號碼</label>
                      <div className="col-sm-9">
                        <input type="tel" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="address" className="col-sm-3 col-form-label">地址</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" id="address" name="address" value={user.address} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="email" className="col-sm-3 col-form-label">電子郵件</label>
                      <div className="col-sm-9">
                        <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#805AF5', borderColor: '#805AF5' }}>儲存</button>
                    </div>
                  </form>
                </div>

                {/* Profile Picture Section */}
                <div className="col-md-4">
                  <form onSubmit={handleProfilePicSubmit}>
                    <div className="text-center">
                      <img src={profilePic} alt="Profile" className="rounded-circle img-fluid mb-3" style={{ width: '220px', height: '220px' }} />
                      <div className="mb-3">
                        <label htmlFor="profile-pic-upload" className="btn btn-outline-primary" style={{ color: '#805AF5', borderColor: '#805AF5' }}>
                          大頭照
                        </label>
                        <input
                          id="profile-pic-upload"
                          type="file"
                          accept="image/*"
                          className="d-none"
                          onChange={handleProfilePicChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#805AF5', borderColor: '#805AF5' }}>更新大頭照</button>

                      {/* 顯示上傳狀態 */}
                      {uploadStatus && <div className="alert alert-success mt-3">{uploadStatus}</div>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

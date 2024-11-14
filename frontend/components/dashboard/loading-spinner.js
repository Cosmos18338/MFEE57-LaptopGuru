// components/dashboard/LoadingSpinner.js
import React from 'react';
import { PacmanLoader } from "react-spinners";

const LoadingSpinner = ({ loading = true }) => {
  if (!loading) return null;
  
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-black bg-opacity-25" style={{ zIndex: 9999 }}>
      <PacmanLoader
        color="#805AF5"  // 你可以換成 "#e8e4e4" 或其他顏色
        loading={loading}
        size={25}       // Pacman 的大小
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default LoadingSpinner;
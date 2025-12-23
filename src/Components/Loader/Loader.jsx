// components/Loader/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <style>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* تمام ارتفاع صفحه */
          width: 100%;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #3b82f6; /* رنگ اصلی اسپینر */
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

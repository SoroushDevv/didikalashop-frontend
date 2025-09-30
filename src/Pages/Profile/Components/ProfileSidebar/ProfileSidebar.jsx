import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ProfileMenu from "../ProfileMenuSection/ProfileMenu";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import { removeAuthToken } from "../../../../Utils/AuthUtils";
import { removeLocalStorage } from "../../../../Utils/StorageUtils";
import LogoutIcon from '@mui/icons-material/Logout';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import "./ProfileSidebar.css"



export default function ProfileSidebar() {
  const { currentUser, loading, error } = useCurrentUser();

  console.log(currentUser)
  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }
  if (error) {
    return <div>خطا: {error}</div>;
  }
  if (!currentUser) {
    return <div>کاربر یافت نشد</div>;
  }






  return (
    <div className="profile-sidebar">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-header-top">
            <div className="profile-avatar">
              <img src="/img/profile-pic/def-avatar.jpg" alt="avatar" />
            </div>
            <div className="profile-info">
              <span className="profile-username">{currentUser.username}</span>
              <span className="profile-phone">{currentUser.phone}</span>
            </div>
          </div>

          <div className="profile-score">
            <span className="score-label">امتیاز شما:</span>
            <span className="score-value">
              {currentUser.score ? currentUser.score : 1}
            </span>
          </div>

          <div className="profile-actions">
            <div className="action-item">
              <a href="/profile/change-pass">
                <KeyOutlinedIcon/>
                <span>تغییر رمز</span>
              </a>
            </div>
            <div className="action-item">

              <a
                href="#"
                onClick={() => {
                  removeLocalStorage("authToken");
                  Navigate("/");
                }}
              >
               <LogoutIcon/>
               <span>خروج از حساب</span>
                
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-banner">
        <Link to="">
          <img
            src="/img/banner/sidebar-banner-3.jpg"
            alt="sidebar banner"
          />
        </Link>
      </div>

      <div className="profile-menu-wrapper">
        <ProfileMenu />
      </div>
    </div>

  );
}

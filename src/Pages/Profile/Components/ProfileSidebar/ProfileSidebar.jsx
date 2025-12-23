import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import ProfileMenu from "../ProfileMenuSection/ProfileMenu";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import { removeAuthToken } from "../../../../Utils/AuthUtils";
import { removeLocalStorage } from "../../../../Utils/StorageUtils";
import LogoutIcon from '@mui/icons-material/Logout';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import Loader from "../../../../Components/Loader/Loader";


export default function ProfileSidebar() {
  const { currentUser, loading, error } = useCurrentUser();

  const Navigate = useNavigate()
  if (loading) {
    return <Loader/>;
  }
  if (error) {
    return <div>خطا: {error}</div>;
  }
  if (!currentUser) {
    return <div>کاربر یافت نشد</div>;
  }


 const handleUserExit = () => {

  localStorage.removeItem("authToken")
  Navigate("/")
 }



  return (

    <div className="w-full   my-0 mx-2 font-sans text-[#333]">
      <div className="hidden  md:block md:bg-white md:border md:rounded-2xl md:shadow-md md:p-5 md:mb-5">
        <div className="flex flex-col justify-center">
          <div className="w-full flex justify-between items-center gap-3 mb-3">
            <div className="h-full w-auto flex-1">
              <img src="/img/profile-pic/def-avatar.jpg" alt="avatar" />
            </div>
            <div className="flex flex-col justify-start items-start gap-2 flex-2 w-full h-full ">
              <span className="text-bold text-[1.1rem]">{currentUser?.firstname ? currentUser.firstname + " " + currentUser.lastname : currentUser.username}</span>
              <span className="font-[1rem] text-[#777] mt-1">{currentUser.phone}</span>
            </div>
          </div>

          <div className="flex justify-between w-full mt-2 py-2 px-3 bg-[#f8f9fa] border rounded-lg">
            <span className="font-bold text-[#555]">امتیاز شما:</span>
            <span className="font-bold text-[#4c6ef5]">
              {currentUser.score ? currentUser.score : 1}
            </span>
          </div>

          <div className="flex justify-around gap-7 mt-5">
     
            <div className="h-10 w-auto transition-all duration-200 ease-in-out py-1 px-2 hover:text-white rounded-md hover:bg-brand-primary hover:transition-all hover:duration-200 hover:ease-in-out h-10 w-auto">
              <a href="/profile/change-pass">
                <KeyOutlinedIcon/>
                <span>تغییر رمز</span>
              </a>
            </div>
            <div className="h-10 w-auto transition-all duration-200 ease-in-out py-1 px-2 hover:text-white rounded-md hover:bg-brand-primary hover:transition-all hover:duration-200 hover:ease-in-out h-10 w-auto">
              <a href="#" onClick={() => handleUserExit()}>
               <LogoutIcon/>
               <span>خروج از حساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block sidebar-banner">
        <Link to="">
          <img
          className="w-full block border rounded-xl mb-5 shadow-md"
            src="/img/banner/sidebar-banner-3.jpg"
            alt="sidebar banner"
          />
        </Link>
      </div>
      <div className="w-full bg-white border rounded-2xl p-3 shadow-md">
        <ProfileMenu />
      </div>
    </div>

  );
}

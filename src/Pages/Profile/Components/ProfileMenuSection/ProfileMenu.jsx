import React, { useEffect,useState } from 'react'
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import LogoutIcon from '@mui/icons-material/Logout';




export default function ProfileMenu() {

  const [windowWidth,setWindowWidth] = useState(window.innerWidth)


  useEffect(()=>{

   const handleResizeWindowWidth = () => {
        setWindowWidth(window.innerWidth)
   }

   window.addEventListener("resize",handleResizeWindowWidth)


   return () => {
     window.removeEventListener("resize", handleResizeWindowWidth)
   }


  },[windowWidth])

  const activeElemHandler = (e) => {
    e.preventDefault()
    let sideItems = document.querySelectorAll(".profile-side-menu__item")
    sideItems.forEach(item => {
      item.classList.remove("active")

    })
    e.target.classList.add("active")
  }


  return (

    <div className="bg-white border border-solid border-[#e0e0e0] rounded-2xl shadow-md font-sans text-[#333] p-4">
      <div className="font-semibold text-base mb-3">
        <span className='inline-block text-[#444]'>حساب کاربری شما</span>
      </div>
      <div className="profile-menu">
        <ul className='list-none m-0 p-0'>
          <li className="mb-2" onClick={e => activeElemHandler(e)}>
            <NavLink to={"/profile"} className={`profile-menu-tab`} end>
              <AccountCircleIcon className="profile-menu-icon" />
              <span>پروفایل</span>
            </NavLink>
          </li>
          <li className="mb-2" onClick={e => activeElemHandler(e)}>
            <NavLink  to={`${windowWidth < 771 ? "/mobile-profile/orders" : "/profile/orders" }`} className="profile-menu-tab">
              <ShoppingCartOutlinedIcon className="profile-menu-icon group-hover:text-white" />
              <span>همه سفارش ها</span>
            </NavLink>
          </li>
          <li className="mb-2" onClick={e => activeElemHandler(e)}>
            <NavLink  to={`${windowWidth < 771 ? "/mobile-profile/order-returns" : "/profile/order-returns" }`} className="profile-menu-tab">
              <KeyboardReturnOutlinedIcon className="profile-menu-icon group-hover:text-white" />
              <span>درخواست مرجوعی</span>
            </NavLink>
          </li>
          <li className="mb-2" onClick={e => activeElemHandler(e)}>
            <NavLink  to={`${windowWidth < 771 ? "/mobile-profile/favorites" : "/profile/favorites" }`} className="profile-menu-tab">
              <FavoriteBorderOutlinedIcon className="profile-menu-icon group-hover:text-white" />
              <span>لیست علاقمندی ها</span>
            </NavLink>
          </li>
          <li className="mb-2" onClick={e => activeElemHandler(e)}>
            <NavLink  to={`${windowWidth < 771 ? "/mobile-profile/comments" : "/profile/comments" }`} className="profile-menu-tab">
              <ReplyAllOutlinedIcon className="profile-menu-icon group-hover:text-white" />
              <span>نقد و نظرات</span>
            </NavLink>
          </li>
          <li className="mb-2" onClick={e => activeElemHandler(e)}>
            <NavLink  to={`${windowWidth < 771 ? "/mobile-profile/addresses" : "/profile/addresses" }`} className="profile-menu-tab">
              <LocationOnOutlinedIcon className="profile-menu-icon group-hover:text-white" />
              <span>آدرس ها</span>
            </NavLink>
          </li>
          <li className="mb-2" onClick={e => activeElemHandler(e)}>
            <NavLink  to={`${windowWidth < 771 ? "/mobile-profile/user-info" : "/profile/user-info" }`} className="profile-menu-tab">
              <EditOutlinedIcon className="profile-menu-icon group-hover:text-white" />
              <span>اطلاعات شخصی</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

import React from 'react'
import "./ProfileMenu.css"
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

  const activeElemHandler = (e) => {
    e.preventDefault()
    let sideItems = document.querySelectorAll(".profile-side-menu__item")
    sideItems.forEach(item => {
      item.classList.remove("active")

    })
    e.target.classList.add("active")
  }


  return (
    <div className="profile-menu-section">
      <div className="menu-label">
        <span>حساب کاربری شما</span>
      </div>

      <div className="profile-menu">
        <ul>
          <li onClick={e => activeElemHandler(e)}>
            <NavLink to="/profile" end>
              <AccountCircleIcon />
              <span>پروفایل</span>
            </NavLink>
          </li>
          <li onClick={e => activeElemHandler(e)}>
            <NavLink to="/profile/orders">
              <ShoppingCartOutlinedIcon />
              <span>همه سفارش ها</span>
            </NavLink>
          </li>
          <li onClick={e => activeElemHandler(e)}>
            <NavLink to="/profile/order-returns">
              <KeyboardReturnOutlinedIcon />
              <span>درخواست مرجوعی</span>
            </NavLink>
          </li>
          <li onClick={e => activeElemHandler(e)}>
            <NavLink to="/profile/favorite">
              <FavoriteBorderOutlinedIcon />
              <span>لیست علاقمندی ها</span>
            </NavLink>
          </li>
          <li onClick={e => activeElemHandler(e)}>
            <NavLink to="/profile/comments">
              <ReplyAllOutlinedIcon />
              <span>نقد و نظرات</span>
            </NavLink>
          </li>
          <li onClick={e => activeElemHandler(e)}>
            <NavLink to="/profile/addresses">
              <LocationOnOutlinedIcon />
              <span>آدرس ها</span>
            </NavLink>
          </li>
          <li onClick={e => activeElemHandler(e)}>
            <NavLink to="/profile/user-info">
              <EditOutlinedIcon />
              <span>اطلاعات شخصی</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>

  )
}

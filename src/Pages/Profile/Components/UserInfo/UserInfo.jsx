import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserInfo.css";
import ShowSwal from "./../../../../Components/ShowSwal/ShowSwal";
import {
  Button,
  Link,
} from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { getAuthToken } from "../../../../Utils/AuthUtils";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import useUserCart from "./../../../../Hooks/useUserCart";
import OrdersTable from "./../../../../Components/Table/OrdersTable";
import Portal from "../../../../Components/Portal/Portal";
import EditInfoModal from "./../../../../Components/Modal/EditInfoModal/EditInfoModal";

export default function UserInfo() {
  const { currentUser, loading, error, refreshData } = useCurrentUser();
  const { shoppingCart } = useUserCart();

  const [showModal, setShowModal] = useState(false);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات کاربر</p>;
  if (!currentUser) return <p>کاربر یافت نشد</p>;

  return (
   <div className="user-info">
  <div className="user-info__grid">
    {/* نام و نام خانوادگی */}
    <div className="user-info__card">
      <div className="user-info__details">
        <div className="user-info__label-row">
          <p className="user-info__label">نام و نام خانوادگی</p>
        </div>
        <p className="user-info__value">
          {currentUser.firstname} {currentUser.lastname}
        </p>
      </div>
      <div className="user-info__edit" onClick={() => setShowModal(true)}>
        <ModeEditOutlinedIcon />
      </div>
    </div>

    {/* شهر */}
    <div className="user-info__card">
      <div className="user-info__details">
        <div className="user-info__label-row">
          <p className="user-info__label">شهر</p>
        </div>
        <p className="user-info__value">
          {currentUser.city ? currentUser.city : "شهر"}
        </p>
      </div>
      <div className="user-info__edit" onClick={() => setShowModal(true)}>
        <ModeEditOutlinedIcon />
      </div>
    </div>

    {/* شماره موبایل */}
    <div className="user-info__card">
      <div className="user-info__details">
        <div className="user-info__label-row">
          <p className="user-info__label">شماره موبایل</p>
          {currentUser.phoneVerified && (
            <span className="user-info__verified">تاییدشده</span>
          )}
        </div>
        <p className="user-info__value">{currentUser.phone}</p>
      </div>
      <div className="user-info__edit" onClick={() => setShowModal(true)}>
        <ModeEditOutlinedIcon />
      </div>
    </div>

    {/* ایمیل */}
    <div className="user-info__card">
      <div className="user-info__details">
        <div className="user-info__label-row">
          <p className="user-info__label">ایمیل</p>
        </div>
        <p className="user-info__value">{currentUser.email}</p>
      </div>
      <div className="user-info__edit" onClick={() => setShowModal(true)}>
        <ModeEditOutlinedIcon />
      </div>
    </div>
  </div>

  {showModal && (
    <Portal>
      <EditInfoModal
        onClose={() => setShowModal(false)}
        user={currentUser}
        onUpdate={refreshData}
      />
    </Portal>
  )}
</div>

  );
}

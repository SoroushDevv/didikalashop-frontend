import React from "react";
import { CircularProgress } from "@mui/material";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import useUserOrders from "./../../../../Hooks/useUserOrders";
import "./ProfileFirstPageContent.css";

export default function ProfileFirstPageContent() {
  const { currentUser } = useCurrentUser();
  const { userOrders = [], loading: ordersLoading, error: ordersError } = useUserOrders();

  console.log("orders :" , userOrders)
  const inProgressCount = Array.isArray(userOrders)
    ? userOrders.filter((o) => o.isActive).length
    : 0;
  const deliveredCount = Array.isArray(userOrders)
    ? userOrders.filter((o) => !o.isActive).length
    : 0;

  return (
    <div className="profile-summary">
      <div className="profile-summary__header">
        <h2 className="profile-summary__title">سفارش‌های من</h2>
        <span className="profile-summary__status">
          {ordersLoading
            ? "در حال بارگذاری..."
            : ordersError
            ? "خطا در دریافت سفارش‌ها"
            : `${userOrders.length} سفارش`}
        </span>
      </div>

      <div className="profile-summary__boxes">
        {/* در حال انجام */}
        <div className="order-box order-box--progress">
          <img
            className="order-box__icon"
            src="/img/png/proccessing.png"
            alt="in-progress"
          />
          <div>
            <p className="order-box__label">در حال انجام</p>
            {ordersLoading ? (
              <CircularProgress size={20} />
            ) : (
              <p className="order-box__count">{inProgressCount}</p>
            )}
          </div>
        </div>

        {/* تحویل شده */}
        <div className="order-box order-box--delivered">
          <img
            className="order-box__icon"
            src="/img/png/delivered.png"
            alt="delivered"
          />
          <div>
            <p className="order-box__label">تحویل شده</p>
            {ordersLoading ? (
              <CircularProgress size={20} />
            ) : (
              <p className="order-box__count">{deliveredCount}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

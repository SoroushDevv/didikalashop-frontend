import React from "react";
import { CircularProgress } from "@mui/material";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import useUserOrders from "./../../../../Hooks/useUserOrders";

export default function ProfileFirstPageContent() {
  const { currentUser } = useCurrentUser();
  const { userOrders = [], loading: ordersLoading, error: ordersError } = useUserOrders();

  const inProgressCount = Array.isArray(userOrders)
    ? userOrders.filter((o) => o.isActive).length
    : 0;

  const deliveredCount = Array.isArray(userOrders)
    ? userOrders.filter((o) => !o.isActive).length
    : 0;

  return (
    <div className="w-full max-w-2xl mx-auto bg-base-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between border-b border-gray-light pb-3 mb-5">
        <h2 className="text-lg font-semibold text-brand-secondary">سفارش‌های من</h2>
        <span className="text-sm text-gray-medium">
          {ordersLoading
            ? "در حال بارگذاری..."
            : ordersError
            ? "خطا در دریافت سفارش‌ها"
            : `${userOrders.length} سفارش`}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 bg-gray-bg rounded-xl p-4 border border-gray-light hover:shadow-md transition">
          <img
            src="/img/png/proccessing.png"
            alt="in-progress"
            className="w-10 h-10"
          />
          <div>
            <p className="text-sm text-gray-text mb-1">در حال انجام</p>
            {ordersLoading ? (
              <CircularProgress size={20} />
            ) : (
              <p className="text-xl font-bold text-brand-primary">{inProgressCount}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-bg rounded-xl p-4 border border-gray-light hover:shadow-md transition">
          <img
            src="/img/png/delivered.png"
            alt="delivered"
            className="w-10 h-10"
          />
          <div>
            <p className="text-sm text-gray-text mb-1">تحویل شده</p>
            {ordersLoading ? (
              <CircularProgress size={20} />
            ) : (
              <p className="text-xl font-bold text-success">{deliveredCount}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

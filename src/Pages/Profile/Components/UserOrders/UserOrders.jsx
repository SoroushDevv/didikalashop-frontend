import React, { useEffect, useState } from "react";
import "./UserOrders.css"
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import ShowSwal from "../../../../Components/ShowSwal/ShowSwal";
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";
import Products from "../../../Products/Products";
import useUserOrders from "../../../../Hooks/useUserOrders";

// TabPanel کامپوننت کمکی
function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

export default function OrdersPage() {
  const [tab, setTab] = useState(0);
  const { currentUser } = useCurrentUser();
  const[userOrders,setUserOrders] = useState([])
  const {orders,loading,error} = useUserOrders()


  const handleChange = (e, newValue) => setTab(newValue);

  // فیلتر سفارش‌ها برای کاربر فعلی
  useEffect(() => {

    const handleUpdateUserOrders = () => {


      const purchasedOrders = JSON.parse(localStorage.getItem("purchasedOrders"))

      if (!currentUser) return;


      purchasedOrders ? setUserOrders(purchasedOrders) : setUserOrders([])

    }
    handleUpdateUserOrders()

  }, [currentUser, loading]);


  // فیلتر سفارش‌ها بر اساس تب
  const activeOrders = userOrders.filter((o) => o.isActive === 1);
  const deliveredOrders = userOrders.filter((o) => o.isActive === 0);


  return (
   <div className="orders-section">
  {/* تب‌ها */}
  <div className="orders-section__tabs">
    <button className={`orders-section__tab ${tab === 0 ? "active" : ""}`} onClick={() => setTab(0)}>
      جاری
    </button>
    <button className={`orders-section__tab ${tab === 1 ? "active" : ""}`} onClick={() => setTab(1)}>
      تحویل شده
    </button>
  </div>

  {/* TabPanel جاری */}
  {tab === 0 && (
    <div className="orders-section__panel">
      {activeOrders.length > 0 ? (
        activeOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-card__header">
              <p className="order-card__date">
                {typeof order.date === "string" && order.date.includes("T")
                  ? order.date.split("T")[0]
                  : new Date(order.date).toISOString().split("T")[0]} - {order.hour}
              </p>
            </div>

            <div className="order-card__body">
              <div className="order-card__info">
                <p>کد سفارش: {order.id}</p>
                <p>تعداد: {order.quantity}</p>
                <p>رنگ: {order.color}</p>
              </div>
              <p className="order-card__price">{order.price.toLocaleString("fa-IR")} تومان</p>
            </div>

            <div className="order-card__footer">
              <button className="order-card__button" onClick={() => ShowSwal({ title: "فاکتور صادر نشده است ", text: "برای پیگیری به پشتیبانی تیکت بزنید :)", icon: "info" })}>
                مشاهده فاکتور
              </button>
            </div>
          </div>
        ))
      ) : (
        <ErrorMessage msg={"سفارشی در این بخش وجود ندارد"}/>
      )}
    </div>
  )}

  {/* TabPanel تحویل شده */}
  {tab === 1 && (
    <div className="orders-section__panel">
      {deliveredOrders.length > 0 ? (
        deliveredOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-card__header">
              <p className="order-card__date">
                {typeof order.date === "string" && order.date.includes("T")
                  ? order.date.split("T")[0]
                  : new Date(order.date).toISOString().split("T")[0]} - {order.hour}
              </p>
            </div>

            <div className="order-card__body">
              <div className="order-card__info">
                <p>کد سفارش: {order.id}</p>
                <p>تعداد: {order.quantity}</p>
                <p>رنگ: {order.color}</p>
              </div>

              <div className="order-card__image-wrapper">
                {Products.map((product) =>
                  product.id === order.productID ? (
                    <img
                      key={product.id}
                      src={order.image || "/placeholder.png"}
                      alt={order.color}
                      className="order-card__image"
                    />
                  ) : null
                )}
              </div>

              <p className="order-card__price">{order.price.toLocaleString("fa-IR")} تومان</p>
            </div>

            <div className="order-card__footer">
              <button className="order-card__button">مشاهده فاکتور</button>
            </div>
          </div>
        ))
      ) : (
        <ErrorMessage msg={"سفارشی در این بخش وجود ندارد"}/>
      )}
    </div>
  )}
</div>

  );
}

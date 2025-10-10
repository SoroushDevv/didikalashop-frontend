import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CompletePayment.css";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import { useCart } from "../../../../Contexts/CartContext";

export default function CompletePayment() {
  const { currentUser, loading, error } = useCurrentUser();
  const { order } = useCart();

  const [finalOrder, setFinalOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // گرفتن سفارش نهایی از سرور
  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchOrder = async () => {
      setIsReady(false);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/orders/user/${currentUser.id}`
        );
        console.log("response :", res.data);

        // اگر سرور لیستی از سفارش‌ها برگردوند، آخرین سفارش رو انتخاب کن
        const latestOrder = Array.isArray(res.data)
          ? res.data[res.data.length - 1]
          : res.data;

        setFinalOrder(latestOrder);
      } catch (err) {
        console.log("error : ", err);
      } finally {
        setIsReady(true);
      }
    };

    fetchOrder();
  }, [currentUser]);

  // محاسبه مجموع قیمت سفارش جاری از context
  useEffect(() => {
    if (order?.items?.length > 0) {
      const total = order.items.reduce(
        (acc, item) => acc + item.payablePrice * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [order]);

  if (loading || !isReady) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات کاربر</p>;

  return (
    <main className="complete-payment">
      <div className="container">
        <div className="order-info">
          <div className="alert-box">
            <div className="icon-success">
              <i className="mdi mdi-check-bold"></i>
            </div>
            <div className="alert-title">
              <h4>
                سفارش{" "}
                <span className="highlight-success">
                  DDC-{finalOrder?.orderId || "----"}
                </span>{" "}
                با موفقیت ثبت شد.
              </h4>
            </div>
            <p className="alert-text">
              سفارش نهایتاً تا یک روز آماده ارسال خواهد شد.
            </p>
          </div>

          <section className="details">
            <h4>
              کد سفارش: <span>{finalOrder?.id}</span>
            </h4>
            <p>سفارش شما تکمیل شد</p>

            <div className="info-grid">
              <p>
                نام تحویل گیرنده:{" "}
                <span>
                  {currentUser?.firstname + " " + currentUser?.lastname}
                </span>
              </p>
              <p>
                شماره تماس:{" "}
                <span>{currentUser?.phone || "091*******"}</span>
              </p>
              <p>
                تعداد مرسوله:{" "}
                <span>{finalOrder?.items?.length || 0}</span>
              </p>
              <p>
                مبلغ کل:{" "}
                <span style={{ margin: "5px 10px" }}>
                  {totalPrice.toLocaleString()}
                </span>
                تومان
              </p>
              <p>
                روش پرداخت: <span>پرداخت اینترنتی (موفق)</span>
              </p>
              <p>
                وضعیت سفارش: <span>پرداخت شد</span>
              </p>
              <p>
                آدرس:{" "}
                {currentUser?.address
                  ? currentUser.address
                  : "آدرس کاربر محرمانه است."}
              </p>
            </div>
          </section>
        </div>

        <section className="recommend">
          <div className="section-header">
            <h2>محصولات پیشنهادی برای شما</h2>
            <a href="#">مشاهده همه</a>
          </div>
          <div className="products">
            <div className="product-card">
              <img src="./assets/img/products/07.jpg" alt="مانتو زنانه" />
              <h5>مانتو زنانه</h5>
              <span className="price">157,000 تومان</span>
            </div>
            <div className="product-card">
              <img src="./assets/img/products/017.jpg" alt="کت مردانه" />
              <h5>کت مردانه</h5>
              <span className="price">199,000 تومان</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

import  { useState, useEffect } from "react";
import api from "../../../../api/axios";
import "./CompletePayment.css";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import { useCart } from "../../../../Contexts/CartContext";
import useUserAddresses from "./../../../../Hooks/useUserAddresses"



export default function CompletePayment() {
  const { currentUser, loading, error } = useCurrentUser();
  const { order } = useCart();
  const { userAddresses } = useUserAddresses()
  const [finalOrder, setFinalOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null)
  const [localOrder,setLocalOrder] = useState(null)
  useEffect(() => {

    const address = JSON.parse(localStorage.getItem("shippingAddress"))

    setShippingAddress(address)
  }, [shippingAddress])
  // گرفتن سفارش نهایی از سرور
  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchOrder = async () => {
      setIsReady(false);
      try {
        const res = await api.get(
          `/api/orders/user/${currentUser.id}`
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

    console.log("order:", order)
    const localOrder = JSON.parse(localStorage.getItem("finalledOrder"))

    setLocalOrder(localOrder)
    if (localOrder?.items?.length > 0) {
      const total = localOrder.items.reduce(
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
                سفارش
                <span className="highlight-success">
                  DDC-{finalOrder?.orderID || "----"}
                </span>
                با موفقیت ثبت شد.
              </h4>
            </div>
            <p className="alert-text">
              سفارش نهایتاً تا یک روز آماده ارسال خواهد شد.
            </p>
          </div>

          <section className="details">
            <h4>
              کد سفارش: <span className="highlight-success">
                DDC-{finalOrder?.orderID || "----"}
              </span>
            </h4>
            <p class="success-message">سفارش شما تکمیل شد</p>

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
                  {totalPrice ? totalPrice.toLocaleString() : ""}
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
                {shippingAddress
                  ? shippingAddress
                  : "آدرس کاربر محرمانه است."}
              </p>
            </div>
          </section>
        </div>


      </div>
    </main>
  );
}

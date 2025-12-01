import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import { CheckCircle } from 'lucide-react';
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
  const [localOrder, setLocalOrder] = useState(null)
  const navigate = useNavigate()

  
  useEffect(() => {
    const address = JSON.parse(localStorage.getItem("shippingAddress"))

    setShippingAddress(address)
  }, [])

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchOrder = async () => {
      setIsReady(false);
      try {
        const res = await api.get(
          `/orders/user/${currentUser.id}`
        );

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

  useEffect(() => {
    const localOrder = JSON.parse(localStorage.getItem("finalledOrder"))

    setLocalOrder(localOrder)
    if (localOrder?.items?.length > 0) {
      const total = localOrder.items.reduce(
        (acc, item) => acc + (parseInt((item.price).toLocaleString()) || 0) * (item.quantity || 0),
        0
      );
      setTotalPrice(total);
    }
  }, [order]);

  if (loading || !isReady) return <p className="text-center p-8 text-lg font-bold text-gray-700">در حال بارگذاری...</p>;
  if (error) return <p className="text-center p-8 text-red-600 font-bold">خطا در دریافت اطلاعات کاربر</p>;

  return (
    <main className="bg-gray-50 min-h-screen p-4 sm:p-8 font-inter rtl">
      <div className="max-w-4xl mx-auto rounded-xl shadow-2xl bg-white p-6 sm:p-10">
        <div className="space-y-8">

          <div className="flex items-start p-4 md:p-6 bg-green-50 border-r-8 border-green-500 rounded-xl shadow-lg">
            <div className="flex-shrink-0 text-green-600 ml-4">
              <CheckCircle size={36} className="text-green-500" />
            </div>
            <div className="flex-grow">
              <div className="text-xl font-extrabold text-gray-800 mb-1">
                <h4>
                  سفارش
                  <span className="text-green-600 font-mono mx-2">
                    DDC-{localOrder?.orderCode || "----"}
                  </span>
                  با موفقیت ثبت شد.
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                سفارش نهایتاً تا یک روز کاری آماده ارسال خواهد شد.
              </p>
            </div>
          </div>

          <section className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow-lg">
            <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-100">
              خلاصه سفارش
            </h4>

            <div className="mb-4">
              <span className="text-lg font-semibold text-gray-700">کد سفارش: </span>
              <span className="text-indigo-600 font-mono text-xl">
                DDC-{localOrder?.orderID || "----"}
              </span>
            </div>
            <p className="text-green-600 font-bold mb-6">سفارش شما تکمیل شد</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600 border-t pt-4">

              <p className="flex justify-between items-center md:justify-start">
                <span className="font-medium text-gray-800 min-w-max ml-4">نام تحویل گیرنده:</span>
                <span className="text-gray-700 font-semibold text-right">
                  {currentUser ? currentUser?.firstname + " " + currentUser?.lastname : "کاربر"}
                </span>
              </p>

              <p className="flex justify-between items-center md:justify-start">
                <span className="font-medium text-gray-800 min-w-max ml-4">شماره تماس:</span>
                <span className="text-gray-700 text-right font-mono">
                  {currentUser?.phone || "091*******"}
                </span>
              </p>

              <p className="flex justify-between items-center md:justify-start">
                <span className="font-medium text-gray-800 min-w-max ml-4">تعداد مرسوله:</span>
                <span className="text-gray-700 font-semibold text-right">
                  {localOrder?.items?.length || 0}
                </span>
              </p>

              <p className="flex justify-between items-center md:justify-start">
                <span className="font-medium text-gray-800 min-w-max ml-4">روش پرداخت:</span>
                <span className="text-gray-700 text-right font-semibold">پرداخت اینترنتی (موفق)</span>
              </p>

              <p className="flex justify-between items-center md:justify-start">
                <span className="font-medium text-gray-800 min-w-max ml-4">مبلغ کل:</span>
                <span className="text-green-600 text-xl font-extrabold text-right">
                  {totalPrice ? totalPrice.toLocaleString() : ""}
                </span>
                <span className="text-gray-700 mr-1">تومان</span>
              </p>

              <p className="flex justify-between items-center md:justify-start">
                <span className="font-medium text-gray-800 min-w-max ml-4">وضعیت سفارش:</span>
                <span className="text-green-500 font-extrabold text-right">پرداخت شد</span>
              </p>

              <p className="md:col-span-2 flex flex-col items-start pt-4 border-t border-gray-100 mt-4">
                <span className="font-medium text-gray-800 mb-2">آدرس تحویل:</span>
                <span className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg w-full">
                  {shippingAddress
                    ? shippingAddress
                    : "آدرس کاربر محرمانه است و هنوز وارد نشده."}
                </span>
              </p>
            </div>
          </section>
               <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
            <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto px-10 py-3 bg-indigo-600 text-white font-extrabold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
                بازگشت به صفحه اصلی
            </button>
        </div>
        </div>
      </div>
    </main>
  );
}
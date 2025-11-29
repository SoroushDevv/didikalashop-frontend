import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useCurrentUser } from "../../../Hooks/useCurrentUser";
import useUserOrders from "../../../Hooks/useUserOrders";
import useUserAddresses from "../../../Hooks/useUserAddresses";
import useAllProducts from "../../../Hooks/useAllProducts";
import ShowSwal from "../../../Components/ShowSwal/ShowSwal";

export default function OrdersDetailsMobile() {
  const { userAddresses } = useUserAddresses();
  const Navigate = useNavigate();
  const { orderId } = useParams("orderId");
  const { currentUser } = useCurrentUser();
  const { userOrders = [], loading: orderLoading } = useUserOrders();
  const { products = [] } = useAllProducts();

  const [order, setOrder] = useState();
  const [defaultAddress, setDefaultAddress] = useState();
  const [payablePrice, setPayablePrice] = useState(0);
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const foundOrder = userOrders.find((order) => order.orderID == orderId);
    setOrder(foundOrder || null);
    setDefaultAddress(userAddresses[0]);
  }, [userOrders, orderId]);

  useEffect(() => {
    if (!order || !Array.isArray(order.items)) return;

    const calculatedPrice = order.items.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );
    setPayablePrice(calculatedPrice);

    const productIds = order.items.map((o) => o.productID);
    const mainProducts = products.filter((p) => productIds.includes(p.id));
    setOrderProducts(mainProducts);
  }, [order, products]);

  return (
    <div className="w-full bg-base-white min-h-screen p-4 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-light pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => Navigate("/profile/orders")}
            className="p-1 rounded-full hover:bg-gray-bg transition text-brand-secondary"
          >
            <ArrowForwardOutlinedIcon fontSize="small" />
          </button>
          <div className="w-full text-right mb-4">
            <h2 className="w-full text-xl font-bold text-gray-800 border-b-2 border-[#fa256c] pb-2">
             جزییات سفارش
            </h2>
          </div>
        </div>

        <button
          onClick={() =>
            ShowSwal({
              title: "برای دریافت فاکتور به پشتیبانی پیام دهید",
              icon: "info",
              showConfirmButton: true,
              confirmButtonText: "باش",
            })
          }
          className="text-xs text-brand-primary font-medium hover:underline"
        >
          مشاهده فاکتور
        </button>
      </div>

      <div className="bg-gray-bg rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-medium">کد پیگیری سفارش</span>
          <span className="font-semibold text-gray-text">۴۴۵۲۲۳۶۴۶</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-medium">تاریخ ثبت سفارش</span>
          <span className="font-semibold text-gray-text">
            {order ? order.date.split("T")[0] : "تاریخ"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-medium">تحویل گیرنده</span>
          <span className="font-semibold text-gray-text">
            {currentUser
              ? currentUser.firstname + " " + currentUser.lastname
              : "کاربر"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-medium">شماره موبایل</span>
          <span className="font-semibold text-gray-text">
            {currentUser ? currentUser.phone : "0917*******"}
          </span>
        </div>
        <div className="pt-2">
          <span className="block text-gray-medium">آدرس</span>
          <p className="text-gray-text text-sm leading-relaxed">
            {defaultAddress ? defaultAddress.address : "آدرس کاربر"}
          </p>
        </div>
      </div>

      <div className="bg-gray-bg rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-medium">مبلغ کل سفارش:</span>
          <span className="font-semibold text-brand-secondary">
            {payablePrice ? payablePrice.toLocaleString() : "--"} تومان
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-medium">هزینه ارسال:</span>
          <span className="font-semibold text-brand-secondary">
            ۱۹,۰۰۰ تومان
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-medium">نوع پرداخت:</span>
          <span className="font-semibold text-brand-secondary">
            پرداخت اینترنتی
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {orderProducts.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-gray-bg rounded-xl p-3 border border-gray-light"
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <img
                src={`/img/products/${item.img}`}
                alt="product"
                className="w-full h-full object-cover rounded-lg"
              />
              <span className="absolute -top-2 -left-2 bg-brand-primary text-white text-xs px-2 py-0.5 rounded-full">
                ×{item.quantity}
              </span>
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="text-sm font-semibold text-brand-secondary leading-tight">
                {item.productDesc}
              </h3>
              <p className="text-xs text-gray-medium">
                رنگ: {item.colors?.[0] || "-"}
              </p>
              <p className="text-xs text-gray-medium">
                فروشنده: حاجی ارزونی تهران
              </p>
              <p className="text-xs text-gray-medium">
                گارانتی اصالت و سلامت فیزیکی کالا
              </p>
            </div>

            <div className="text-xs font-semibold text-brand-primary whitespace-nowrap">
              {item.price?.toLocaleString()} تومان
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import useUserOrders from "../../../../Hooks/useUserOrders";
import useUserAddresses from "../../../../Hooks/useUserAddresses";
import useAllProducts from "../../../../Hooks/useAllProducts";
import ShowSwal from "../../../../Components/ShowSwal/ShowSwal";

export default function ProfileOrdersDetails() {
  const { userAddresses } = useUserAddresses();
  const Navigate = useNavigate();
  const params = useParams("orderId");
  const orderId = params.orderId;
  const { currentUser } = useCurrentUser();
  const { userOrders = [], loading: orderLoading } = useUserOrders();
  const { products = [] } = useAllProducts();

  const [order, setOrder] = useState();
  const [defaultAddress, setDefaultAddress] = useState();
  const [payablePrice, setPayablePrice] = useState(0);
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const foundOrder = userOrders.find((o) => o.orderID == orderId);
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

  console.log("products", orderProducts)
  console.log("payable price:", payablePrice.toLocaleString())
  return (
    <div className="w-full max-w-3xl mx-auto bg-base-white rounded-2xl shadow-sm p-6 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-light pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => Navigate("/profile/orders")}
            className="p-2 rounded-full hover:bg-gray-bg text-brand-secondary transition"
          >
            <ArrowForwardOutlinedIcon />
          </button>
          <h2 className="text-lg font-semibold text-brand-secondary">
            جزئیات سفارش
          </h2>
        </div>

        <button
          onClick={() =>
            ShowSwal({
              title: "برای دریافت فاکتور به پشتیبانی پیام دهید",
              text: "",
              icon: "info",
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: "باش",
            })
          }
          className="text-sm font-medium text-brand-primary hover:underline"
        >
          مشاهده فاکتور
        </button>
      </div>

      <div className="bg-gray-bg rounded-xl p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">کد پیگیری سفارش</span>
          <span className="font-semibold text-gray-text">۴۴۵۲۲۳۶۴۶</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">تاریخ ثبت سفارش</span>
          <span className="font-semibold text-gray-text">
            {order ? order.date.split("T")[0] : "تاریخ"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">تحویل گیرنده</span>
          <span className="font-semibold text-gray-text">
            {currentUser
              ? currentUser.firstname + " " + currentUser.lastname
              : "کاربر"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">شماره موبایل</span>
          <span className="font-semibold text-gray-text">
            {currentUser ? currentUser.phone : "0917*******"}
          </span>
        </div>
        <div className="text-sm">
          <span className="block text-gray-medium mb-1">آدرس</span>
          <span className="font-semibold text-gray-text">
            {defaultAddress ? defaultAddress.address : "آدرس کاربر"}
          </span>
        </div>
      </div>

      <div className="bg-gray-bg rounded-xl p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">مبلغ کل سفارش:</span>
          <span className="font-semibold text-brand-secondary">
            {Number(payablePrice) ? Number(payablePrice).toLocaleString("fa-IR") : "--"} تومان
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">هزینه ارسال:</span>
          <span className="font-semibold text-brand-secondary">
            ۱۹,۰۰۰ تومان
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">نوع پرداخت:</span>
          <span className="font-semibold text-brand-secondary">
            پرداخت اینترنتی
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {orderProducts.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 bg-gray-bg rounded-xl p-4 border border-gray-light"
          >
            <div className="relative w-20 h-20 flex-shrink-0">
              <img
                src={`/img/products/${item.img}`}
                alt="product"
                className="w-full h-full object-cover rounded-lg"
              />
              <span className="absolute -top-2 -left-2 bg-brand-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                ×{item.quantity}
              </span>
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="text-sm font-semibold text-brand-secondary">
                {item.productDesc}
              </h3>
              <p className="text-sm text-gray-medium">
                رنگ: {item.colors?.[0] || "-"}
              </p>
              <p className="text-sm text-gray-medium">
                فروشنده: حاجی ارزونی تهران
              </p>
              <p className="text-sm text-gray-medium">
                گارانتی اصالت و سلامت فیزیکی کالا
              </p>
            </div>

            <div className="text-sm font-semibold text-brand-primary whitespace-nowrap">
              {Number(item.price) ? Number(item.price).toLocaleString("fa-IR") : "-"} تومان
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Pages/ErrorMessage/ErrorMessage";
import { useCart } from "../../Contexts/CartContext";
import ShowSwal from "../../Components/ShowSwal/ShowSwal";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const colorMap = {
  مشکی: "#000000",
  سفید: "#FFFFFF",
  آبی: "#0000FF",
  قرمز: "#FF0000",
  "نقره‌ای": "#C0C0C0",
  خاکستری: "#808080",
  زرد: "#FFFF00",
  صورتی: "#FF69B4",
  قهوه‌ای: "#A52A2A",
  شفاف: "transparent",
  چندرنگ: "#FFFFFF",
  بنفش: "#800080",
  سبز: "#008000",
};

const ColorChip = ({ color }) => {
  const hexColor = colorMap[color] || "#FFFFFF";
  const lightColors = ["#FFFFFF", "#FFFF00", "#FF69B4", "#C0C0C0", "transparent"];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <div
        style={{
          backgroundColor: hexColor,
          border: "2px solid #ccc",
          width: 24,
          height: 24,
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        title={color || "نامشخص"}
      >
        <CheckOutlinedIcon
          style={{
            color: lightColors.includes(hexColor) ? "#000" : "#fff",
            fontSize: 12,
            position: "absolute",
          }}
        />
      </div>
      <span>{color || "نامشخص"}</span>
    </Box>
  );
};

export default function LocalOrders() {
  const { order, setOrder, loading, error, triggerUpdate } = useCart();
  const [userOrder, setUserOrder] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [localOff, setLocalOff] = useState(Number(localStorage.getItem("offValue")) || 0);


  useEffect(() => {

    const localOrder = JSON.parse(localStorage.getItem("order"))

    if (localOrder) {
      setUserOrder(localOrder)
    }
  }, [])

  useEffect(() => {
    if (loading || error) return;

    if (!order || !Array.isArray(order.items)) {
      setTotalPrice(0);
      setTotalDiscount(0);
      setPayableAmount(0);
      return;
    }

    const total = order.items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

    const discount = order.items.reduce(
      (sum, item) =>
        sum +
        ((item.price || 0) * (item.product?.discountPercent || 0) / 100) *
        (item.quantity || 1),
      0
    );

    const payable = total - (discount + localOff);
    setTotalPrice(total);
    setTotalDiscount(discount);
    setPayableAmount(payable);
  }, [order, loading, error, localOff]);

  const handleRemoveItem = (productID) => {
    if (!order?.items?.length) return;

    const updatedItems = order.items.filter(
      (item) => item.productID !== productID
    );

    const updatedOrder = { ...order, items: updatedItems };
    setOrder(updatedOrder);
    triggerUpdate()
    ShowSwal({
      title: "محصول حذف شد",
      text: "محصول از سبد خرید حذف گردید.",
      icon: "success",
    });
  };

  const handleClearCart = () => {
    setOrder({ ...order, items: [] });
    triggerUpdate()
    ShowSwal({
      title: "سبد خالی شد",
      text: "سبد خرید با موفقیت خالی شد.",
      icon: "success",
    });
  };

  if (loading) return <div className="text-center loading">در حال دریافت داده‌ها...</div>;
  if (error) return <ErrorMessage msg="داده‌ها در راه مانده‌اند" />;


  if (userOrder == null) return;

  console.log("payable price :", payableAmount)
  const items = userOrder?.items || []


console.log("items:",items)

  return (

    <div className="flex flex-col justify-between transition-all duration-300 ease-in-out py-3 px-2 absolute left-0 top-full bg-white rounded-md shadow-md overflow-hidden w-80 min-h-64">
      <div className="py-1 px-2 border-b-2 gray-light">
        <div className="flex justify-between items-center">
          <Link to="/cart" className="btn-info text-white">
            <span className="text-white">مشاهده سبد خرید</span>
          </Link>
          <div className="bg-brand-primary text-white text-xs font-bold 
                 w-9 h-9 flex items-center justify-center 
                 rounded-full">{items?.length} کالا</div>
        </div>
      </div>

      <ul className="max-h-80 overflow-y-auto list-none py-2 px-0 m-0" tabIndex="1">
        {items.length === 0 ? (
          <ErrorMessage msg="سبد خرید شما خالی است" />
        ) : (
          items.map((item) => (
            <li
              className="flex items-start transition duration-200 ease-in-out py-3 px-4 
                   border-b border-gray-light last:border-b-0"
              key={item.productID}
            >

              <div className="flex justify-between w-full gap-4">

                <div className="flex flex-col flex-1 gap-2">

                  <div className="flex justify-start gap-4 w-full">

                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        className="w-full h-full object-contain"
                        src={`/img/products/${item.product.img || "test"}`}
                        alt={item.title || "عنوان محصول"}
                      />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-1 flex-grow pr-4">
                      <Link
                        to={`/productDetail/${item.product.title}`}
                        className="title-style text-base font-semibold mb-1 hover:text-brand-primary"
                      >
                        {item.product.productDesc || "عنوان محصول"}
                      </Link>
                      <span className="inline-block mt-1">
                        <ColorChip color={item.color} />
                      </span>
                    </div>

                  </div>

                  <div className="flex justify-between items-end pt-2 border-t border-dashed border-gray-light">

                    <div className="flex flex-col gap-1 items-start">

                      <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded">
                        {(item.price * (item.product.discountPercent / 100) || 0).toLocaleString()} تومان <span className="text-gray-text">تخفیف</span>
                      </span>

                      <span className="text-gray-medium text-sm">
                        {item.quantity} ×
                      </span>

                      <span className="text-gray-text font-bold text-base">
                        {(((item.price * item.quantity) - (item.price * (item.product.discountPercent / 100))) || 0).toLocaleString()} تومان
                      </span>
                    </div>

                    <button
                      className="text-gray-medium hover:text-red-600 transition p-1"
                      onClick={() => handleRemoveItem(item.productID)}
                    >
                      <DeleteOutlinedIcon className="text-xl" />
                    </button>

                  </div>

                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className=" bg-white">
        <div className="flex justify-between items-center mb-4">

          <span className="text-base gray-medium">مبلغ قابل پرداخت:</span>
          <p className="m-0">
            <span className="text-base font-bold text-black">
              {payableAmount.toLocaleString()} <span>تومان</span>
            </span>
          </p>
        </div>

        <div className="flex justify-between gap-4">
          <button className=" btn-primary">
            <Link to={items.length ? "/cart" : "#"} >ثبت سفارش</Link>
          </button>
          <button
            className="btn-secondary"
            onClick={handleClearCart}
          >
            خالی کردن سبد
          </button>
        </div>
      </div>
    </div>

  );
}

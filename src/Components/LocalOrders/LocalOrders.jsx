import React, { useState, useEffect } from "react";
import "./LocalOrders.css";
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
  const { order, setOrder, loading, error,triggerUpdate } = useCart();
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
    console.log("order :", order)
console.log("total:",total)
console.log("discount:",discount)
console.log("localOff:",localOff)
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




  return (
    <div className="cart-dropdown">
      <div className="cart-dropdown-header">
        <div className="cart-dropdown-header-link-container">
          <Link to="/cart" className="cart-dropdown-link">
            <span>مشاهده سبد خرید</span>
          </Link>
          <div className="cart-dropdown-count">{items.length} کالا</div>
        </div>
      </div>

      <ul className="cart-dropdown-list" tabIndex="1">
        {items.length === 0 ? (
          <ErrorMessage msg="سبد خرید شما خالی است" />
        ) : (
          items.map((item) => (
            <li className="cart-dropdown-item" key={item.productID}>
              <div className="cart-dropdown-item-wrapper">
                <div className="cart-dropdown-item-content">
                  <Link
                    to={`/productDetail/${item.product.title}`}
                    className="cart-dropdown-item-title"
                  >
                    {item.product.title || "عنوان محصول"}
                  </Link>

                  <div className="cart-dropdown-item-footer">
                    <div className="cart-dropdown-item-props">
                      <span className="cart-dropdown-item-prop">
                        <ColorChip color={item.color} />
                      </span>
                      <span className="cart-dropdown-item-prop">
                        {(item.price * item.quantity|| 0).toLocaleString()} تومان
                      </span>
                      <span className="cart-dropdown-item-prop">
                        {item.quantity} ×
                      </span>
                       <span className="cart-dropdown-item-prop">
                        <span className="discount-amount">تخفیف:</span>
                        {((item.price * item.quantity) - (item.price * (item.product.discountPercent/100))    || 0).toLocaleString()} تومان
                      </span>
                    </div>
                  </div>

                  <button
                    className="cart-dropdown-item-remove"
                    onClick={() => handleRemoveItem(item.productID)}
                  >
                    <DeleteOutlinedIcon />
                  </button>
                </div>

                <div className="cart-dropdown-item-image">
                  <img
                    src={`/img/products/${item.product.img || "test"}`}
                    alt={item.title || "عنوان محصول"}
                  />
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="cart-dropdown-footer">
        <div className="cart-dropdown-total">
          <span className="cart-dropdown-total-text">مبلغ قابل پرداخت:</span>
          <p className="cart-dropdown-total-amount">
            <span className="cart-dropdown-total-number">
              {payableAmount.toLocaleString()} <span>تومان</span>
            </span>
          </p>
        </div>

        <div className="cart-dropdown-actions">
          <button className="cart-dropdown-btn submit-cart">
            <Link to={items.length ? "/cart" : "#"}>ثبت سفارش</Link>
          </button>
          <button
            className="cart-dropdown-btn clear-cart"
            onClick={handleClearCart}
          >
            خالی کردن سبد
          </button>
        </div>
      </div>
    </div>

  );
}

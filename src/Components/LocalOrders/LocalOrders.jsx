import React, { useState, useEffect } from 'react';
import './LocalOrders.css';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../Pages/ErrorMessage/ErrorMessage';
import { useCart } from '../../Contexts/CartContext';
import ShowSwal from '../../Components/ShowSwal/ShowSwal';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

// دیکشنری نگاشت رنگ‌های فارسی به کد هگز
const colorMap = {
  'مشکی': '#000000',
  'سفید': '#FFFFFF',
  'آبی': '#0000FF',
  'قرمز': '#FF0000',
  'نقره‌ای': '#C0C0C0',
  'خاکستری': '#808080',
  'زرد': '#FFFF00',
  'صورتی': '#FF69B4',
  'قهوه‌ای': '#A52A2A',
  'شفاف': 'transparent',
  'چندرنگ': '#FFFFFF',
  'بنفش': '#800080',
  'سبز': '#008000'
};

const ColorChip = ({ color }) => {
  const hexColor = colorMap[color] || '#FFFFFF'; // پیش‌فرض سفید
  const lightColors = ['#FFFFFF', '#FFFF00', '#FF69B4', '#C0C0C0', 'transparent'];

  // لاگ برای دیباگ
  console.log(`Color: ${color}, Hex: ${hexColor}`);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <div
        style={{
          backgroundColor: hexColor,
          border: '2px solid #ccc',
          width: 24,
          height: 24,
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        title={color || 'نامشخص'}
      >
        <CheckOutlinedIcon
          style={{
            color: lightColors.includes(hexColor) ? '#000' : '#fff',
            fontSize: 12,
            position: 'absolute',
          }}
        />
      </div>
      <span>{color || 'نامشخص'}</span>
    </Box>
  );
};

export default function LocalOrders({ height, offLeft }) {
  const { orders, setOrders, loading, error, triggerUpdate } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [payableAmount, setPayablAmount] = useState(0);
  const [localOff, setLocalOff] = useState(localStorage.getItem("offValue"))
  // محاسبه مبلغ کل با استفاده از discountedPrice

  useEffect(() => {
    const calculatePrices = () => {
      if (!orders || !Array.isArray(orders) || orders.length === 0) {
        setTotalPrice(0);
        setTotalDiscount(0);
        setPayablAmount(0);
        return;
      }

      // محاسبه کل قیمت بدون تخفیف
      const totalPrice = orders.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      );

      // محاسبه کل تخفیف
      const totalDiscount = orders.reduce(
        (sum, item) =>
          sum +
          ((item.price || 0) * (item.product?.discount || 0) / 100) * (item.quantity || 1),
        0
      );

      const localOffValue = localStorage.getItem("offValue")
      setLocalOff(localOffValue)

      // محاسبه مبلغ قابل پرداخت
      const payableAmount = totalPrice - (totalDiscount + localOffValue);

      setTotalPrice(totalPrice);
      setTotalDiscount(totalDiscount);
      setPayablAmount(payableAmount);
    };



    calculatePrices();
  }, [orders, localOff]);

  // بررسی خالی بودن محصولات
  useEffect(() => {
    if (orders.length === 0) {
      setTotalPrice(0); // در صورت عدم وجود محصولات، قیمت صفر می‌شود
      setPayablAmount(0);
    }
  }, [orders]);

  // تابع حذف آیتم
  const handleRemoveItem = (orderID) => {
    const updatedCart = orders.filter((order) => order.orderId !== orderID);
    console.log(updatedCart);
    localStorage.setItem('orders', JSON.stringify(updatedCart));
    setOrders(updatedCart);
    triggerUpdate();
  };

  // تابع حذف کل سبد
  const handleClearCart = () => {
    localStorage.removeItem('orders');
    setOrders([]);
    triggerUpdate();
    ShowSwal({
      title: 'موفقیت',
      text: 'سبد خرید با موفقیت خالی شد',
      icon: 'success',
    });
  };

  // بررسی وجود محصولات در localStorage
  const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const hasLocalOrders = localOrders.length > 0;

  return (
    <div className="header-cart-info" style={{ position: "absolute", top: height, left: offLeft }}>
      {loading && <div className="text-center loading">در حال دریافت داده‌ها...</div>}
      {error && <ErrorMessage msg={`داده ها در راه مانده اند .`} />}
      {!loading && !error && (
        <>
          <div className="header-cart-info-header">
            <Link to="/cart" className="header-cart-info-link">
              <span>مشاهده سبد خرید</span>
            </Link>
            <div className="header-cart-info-count">{orders.length} کالا</div>

          </div>
          <ul
            className="header-basket-list"
            tabIndex="1"
            style={{ overflow: 'hidden', outline: 'none' }}
          >
            {orders.length === 0 ? (
              <ErrorMessage msg="سبد خرید شما خالی است" />
            ) : (
              orders.map((order) => (
                <li
                  className="cart-item"
                  key={order.orderId || 'null'}
                >
                  <div className="header-basket-list-item">
                    <div className="header-basket-list-item-content">
                      <Link to={`/productDetail/${order.product.title}`} className="header-basket-list-item-title">
                        {order.product.title || 'عنوان محصول'}
                      </Link>
                      <div className="header-basket-list-item-footer">
                        <div className="header-basket-list-item-props">
                          <span className="header-basket-list-item-props-item">
                            <ColorChip color={order.color} />
                          </span>
                          <span className="header-basket-list-item-props-item">
                            {(order.price || 0).toLocaleString()} تومان
                          </span>
                          <span className="header-basket-list-item-props-item">
                            {order.quantity} x
                          </span>
                        </div>
                      </div>
                      <button className="header-basket-list-item-remove" onClick={() => handleRemoveItem(order.orderId)}>
                        <DeleteOutlinedIcon />
                      </button>
                    </div>
                    <div className="header-basket-list-item-image">
                      <img
                        src={`/img/products/${order.product.img || 'test'}`}
                        alt={order.product.title || 'عنوان محصول'}
                      />
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
          <div className="header-cart-info-footer">
            <div className="header-cart-info-total">
              <span className="header-cart-info-total-text">مبلغ قابل پرداخت:</span>
              <p className="header-cart-info-total-amount">
                <span className="header-cart-info-total-amount-number">
                  {payableAmount.toLocaleString()} <span>تومان</span>
                </span>
              </p>
            </div>
            <div className="header-cart-info-actions">
              <button
                className="header-cart-info-submit submit-cart header-cart-info_btn"
              >
                <Link to={orders.length ? "/cart" : "#"}>
                  ثبت سفارش
                </Link>
              </button>
              <button
                className="header-cart-info-clear header-cart-info_btn"
                onClick={handleClearCart}
              >
                خالی کردن سبد
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
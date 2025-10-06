import React, { useState, useEffect } from 'react';
import './LocalOrders.css';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../Pages/ErrorMessage/ErrorMessage';
import { useCart } from '../../Contexts/CartContext';
import ShowSwal from '../../Components/ShowSwal/ShowSwal';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Co2Sharp } from '@mui/icons-material';

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
  const { order, setOrder, loading, error, triggerUpdate } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [payableAmount, setPayablAmount] = useState(0);
  const [localOff, setLocalOff] = useState(localStorage.getItem("offValue"))



  useEffect(() => {

    if(!order.items) {
      console.log("order items vojood nadarad")
      return;
    }

    console.log("order items:",order.items)
  },[])

  useEffect(() => {
    const calculatePrices = () => {
      if (!order || !Array.isArray(order.items) || order.items.length === 0) {
        setTotalPrice(0);
        setTotalDiscount(0);
        setPayablAmount(0);
        return;
      }

      // محاسبه کل قیمت بدون تخفیف
      const totalPrice = order.items.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
      );

   
      const totalDiscount = order.items.reduce(
        (sum, item) =>
          sum +
          ((item.price || 0) * (item.product?.discount || 0) / 100) * (item.quantity || 1),
        0
      );

      const localOffValue = localStorage.getItem("offValue")
      setLocalOff(localOffValue)

   
      const payableAmount = totalPrice - (totalDiscount + localOffValue);

      setTotalPrice(totalPrice);
      setTotalDiscount(totalDiscount);
      setPayablAmount(payableAmount);
    };

    calculatePrices();
  }, [order.items, localOff]);

  // بررسی خالی بودن محصولات
  useEffect(() => {
    if (order.items.length === 0) {
      setTotalPrice(0); 
      setPayablAmount(0);
    }
  }, [order.items]);

  const handleRemoveItem = (orderID) => {
    const updatedCart = order.items.filter((order) => order.orderId !== orderID);
    console.log(updatedCart);
    localStorage.setItem('order', JSON.stringify(updatedCart));
    setOrder(updatedCart);
    triggerUpdate();
  };

  const handleClearCart = () => {
    localStorage.removeItem('order');
    setOrder([]);
    triggerUpdate();
    ShowSwal({
      title: 'موفقیت',
      text: 'سبد خرید با موفقیت خالی شد',
      icon: 'success',
    });
  };

  const localOrders = JSON.parse(localStorage.getItem("order")) || [];
  const hasLocalOrders = localOrders.length > 0;


  return (
    <div className="navbar-cart-info" >
      {loading && <div className="text-center loading">در حال دریافت داده‌ها...</div>}
      {error && <ErrorMessage msg={`داده ها در راه مانده اند .`} />}
      {!loading && !error && (
        <>
          <div className="navbar-cart-info-link_container">
            <Link to="/cart" className="navbar-cart-info-link">
              <span>مشاهده سبد خرید</span>
            </Link>
            <div className="navbar-cart-info-count">{order.items.length} کالا</div>

          </div>
          <ul
            className="navbar-basket-list"
            tabIndex="1"
            style={{ overflow: 'hidden', outline: 'none' }}
          >
            {order.items.length === 0 ? (
              <ErrorMessage msg="سبد خرید شما خالی است" />
            ) : (
              order.items.map((order) => (
                <li
                  className="cart-item"
                  key={order.orderId || 'null'}
                >
                  <div className="navbar-basket-list-item">
                    <div className="navbar-basket-list-item-content">
                      <Link to={`/productDetail/${order.product.title}`} className="navbar-basket-list-item-title">
                        {order.product.title || 'عنوان محصول'}
                      </Link>
                      <div className="navbar-basket-list-item-footer">
                        <div className="navbar-basket-list-item-props">
                          <span className="navbar-basket-list-item-props-item">
                            <ColorChip color={order.color} />
                          </span>
                          <span className="navbar-basket-list-item-props-item">
                            {(order.price || 0).toLocaleString()} تومان
                          </span>
                          <span className="navbar-basket-list-item-props-item">
                            {order.quantity} x
                          </span>
                        </div>
                      </div>
                      <button className="navbar-basket-list-item-remove" onClick={() => handleRemoveItem(order.orderId)}>
                        <DeleteOutlinedIcon />
                      </button>
                    </div>
                    <div className="navbar-basket-list-item-image">
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
          <div className="navbar-cart-info-footer">
            <div className="navbar-cart-info-total">
              <span className="navbar-cart-info-total-text">مبلغ قابل پرداخت:</span>
              <p className="navbar-cart-info-total-amount">
                <span className="navbar-cart-info-total-amount-number">
                  {payableAmount.toLocaleString()} <span>تومان</span>
                </span>
              </p>
            </div>
            <div className="navbar-cart-info-actions">
              <button
                className="navbar-cart-info-submit submit-cart navbar-cart-info_btn"
              >
                <Link to={order.items.length ? "/cart" : "#"}>
                  ثبت سفارش
                </Link>
              </button>
              <button
                className="navbar-cart-info-clear navbar-cart-info_btn"
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
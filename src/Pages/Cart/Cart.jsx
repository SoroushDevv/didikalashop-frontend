import React, { useState, useEffect } from 'react';
import './Cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ShowSwal from '../../Components/ShowSwal/ShowSwal';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';
import { useCart } from '../../Contexts/CartContext';
import { Box } from '@mui/material';
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

export default function Cart() {

  const { orders, setOrders, loading, error } = useCart();
  const [activeTab, setActiveTab] = useState('orders');
  const [nextListItems, setNextListItems] = useState([]);


  // محاسبه مبالغ
  const totalAmount = orders.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalDiscount = orders.reduce(
    (total, item) =>
      total +
      (item.price * item.quantity - ((item.price - (item.price * (item.product.discountPercent / 100)))).toLocaleString()),
    0
  );

  const payableAmount = totalAmount - totalDiscount;


  console.log("")


  const increaseQuantity = (productID, color) => {
    const item = orders.find(
      (item) => item.productID === productID && item.color === color
    );
    if (!item) {
      ShowSwal({
        title: 'خطا',
        text: 'سفارش با این محصول یافت نشد',
        icon: 'error',
      });
      return;
    }

    // چک کردن موجودی
    if (item.quantity >= item.product.count) {
      ShowSwal({
        title: 'خطا',
        text: 'موجودی محصول کافی نیست',
        icon: 'error',
      });
      return;
    }

    setOrders(
      orders.map((order) =>
        order.productID === productID && order.color === color
          ? { ...order, quantity: order.quantity + 1 }
          : order
      )
    );
  };

  const decreaseQuantity = (productID, color) => {
    const item = orders.find(
      (item) => item.productID === productID && item.color === color
    );
    if (!item) {
      ShowSwal({
        title: 'خطا',
        text: 'سفارش با این محصول یافت نشد',
        icon: 'error',
      });
      return;
    }

    if (item.quantity <= 1) {
      setOrders(
        orders.filter(
          (order) => !(order.productID === productID && order.color === color)
        )
      );
      ShowSwal({
        title: 'موفقیت',
        text: 'سفارش از سبد خرید حذف شد',
        icon: 'success',
      });
      return;
    }

    setOrders(
      orders.map((order) =>
        order.productID === productID && order.color === color
          ? { ...order, quantity: order.quantity - 1 }
          : order
      )
    );
  };

  console.log("orders: ", orders)
  const removeItem = (productID, color) => {
    ShowSwal({
      title: 'آیا از حذف این محصول اطمینان دارید؟',
      text: '',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'بله',
      cancelButtonText: 'خیر',
      onConfirm: () => {
        setOrders(
          orders.filter(
            (order) => !(order.productID === productID && order.color === color)
          )
        );
        ShowSwal({
          title: 'آیتم با موفقیت حذف شد',
          text: '',
          icon: 'success',
        });
      },
    });
  };


  const addAllToCart = () => {
    setOrders([...orders, ...nextListItems]);
    setNextListItems([]);
  };

  if (loading) {
    return <div className="text-center loading">در حال دریافت داده‌ها...</div>;
  }
  if (error) {
    return <div className="text-center error">خطا: {error}</div>;
  }


  return (
    <main className="main-content dt-sl mb-3">
      <div className="container main-container">
        <div className="row mx-0">
          <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 mb-2">
            <nav className="tab-cart-page">
              <div className="nav nav-tabs border-bottom" id="nav-tab" role="tablist">
                <button
                  className={`nav-item nav-link d-inline-flex w-auto ${activeTab === 'orders' ? 'active' : ''
                    }`}
                  onClick={() => setActiveTab('orders')}
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected={activeTab === 'orders'}
                >
                  سبد خرید
                  <span className="count-cart">{orders.length}</span>
                </button>
              </div>
            </nav>
          </div>
          <div className="col-12">
            <div className="tab-content" id="nav-tabContent">
              {/* تب سبد خرید */}
              <div
                className={`tab-pane fade ${activeTab === 'orders' ? 'show active' : ''
                  }`}
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="row">
                  <div className="col-xl-9 col-lg-8 col-12 px-0">
                    <div className="table-responsive checkout-content dt-sl">
                      <div className="checkout-header checkout-header--express">
                        <span className="checkout-header-title">ارسال عادی</span>
                        <span className="checkout-header-extra-info">
                          ({orders.length} کالا)
                        </span>
                      </div>
                      <div className="checkout-section-content-dd-k">
                        <div className="cart-items-dd-k">
                          {orders.length === 0 ? (
                            <p className="text-center">سبد خرید خالی است</p>
                          ) : (
                            orders.map((item) => (
                              <div
                                className="cart-item py-4 px-3"
                                key={`${item.productID}-${item.color}`}
                              >
                                <div className="item-thumbnail">
                                  <a href="#">
                                    <img
                                      src={
                                        `/img/products/${item.product.img}` ||
                                        '/placeholder.png'
                                      }
                                      alt={item.product.title || 'محصول'}
                                    />
                                  </a>
                                </div>
                                <div className="item-info flex-grow-1">
                                  <div className="item-title">
                                    <h2>
                                      <a href="#">
                                        {item.product.title || 'بدون نام'}
                                      </a>
                                    </h2>
                                  </div>
                                  <div className="item-detail">
                                    <ul>
                                      <li>
                                        <ColorChip color={item.color} />
                                      </li>
                                      <li>
                                        <i className="far fa-shield-check text-muted"></i>
                                        <span>گارانتی ۱۸ ماهه</span>
                                      </li>
                                      <li>
                                        <i className="far fa-store-alt text-muted"></i>
                                        <span>نام فروشنده</span>
                                      </li>
                                      <li>
                                        <i className="far fa-clipboard-check text-primary"></i>
                                        <span>موجود در انبار</span>
                                      </li>
                                      {item.discountPercent > 0 && (
                                        <li>
                                          <span>تخفیف:</span>
                                          <span>
                                            {item.discountPercent}% (
                                            {(
                                              (item.price - (item.price * (item.discountPercent / 100)))
                                            ).toLocaleString()}{' '}
                                            تومان)
                                          </span>
                                        </li>
                                      )}
                                    </ul>
                                    <div className="item-quantity--item-price">
                                      <div className="item-quantity">
                                        <div className="num-block">
                                          <div className="num-in">
                                            <span
                                              className="plus"
                                              onClick={() =>
                                                increaseQuantity(
                                                  item.productID,
                                                  item.color
                                                )
                                              }
                                            >+</span>
                                            <input
                                              type="text"
                                              className="in-num"
                                              value={item.quantity}
                                              readOnly
                                            />
                                            <span
                                              className={`minus ${item.quantity === 1 ? 'dis' : ''
                                                }`}
                                              onClick={() =>
                                                decreaseQuantity(
                                                  item.productID,
                                                  item.color
                                                )
                                              }
                                            >-</span>
                                          </div>
                                        </div>
                                        <button
                                          className="item-remove-btn mr-2"
                                          style={{margin:"10px 0"}}
                                          onClick={() =>
                                            removeItem(item.productID, item.color)
                                          }
                                        >
                                          <DeleteOutlineOutlinedIcon />
                                          حذف
                                        </button>
                                      </div>
                                      <div className="item-price">
                                        {item.price}
                                        <span className="text-sm mr-1" style={{margin:"0 10px"}}>تومان</span>
                                        {item.discountPercent > 0 && (
                                          <div className="original-price">
                                            قیمت اصلی:{' '}
                                            {(item.price * item.quantity).toLocaleString()}{' '}
                                            تومان
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-12 w-res-sidebar sticky-sidebar">
                    <CheckoutSummary
                      totalDiscount={totalDiscount}
                      totalAmount={totalAmount}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
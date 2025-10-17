import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ShowSwal from '../../Components/ShowSwal/ShowSwal';
import CheckoutSummary from '../../Components/CheckoutSummary/CheckoutSummary';
import { useCart } from '../../Contexts/CartContext';
import { Box } from '@mui/material';
import ErrorMessage from "./../ErrorMessage/ErrorMessage"
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
  const Navigate = useNavigate()
  const { order, setOrder, loading, error, triggerUpdate } = useCart();
  const [activeTab, setActiveTab] = useState('orders');
  const [nextListItems, setNextListItems] = useState([]);


  // محاسبه مبالغ
  const totalAmount = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalDiscount = order.items.reduce(
    (total, item) =>
      total +
      (item.price * item.quantity - ((item.price - (item.price * (item.product.discountPercent / 100)))).toLocaleString()),
    0
  );

  const payableAmount = totalAmount - totalDiscount;


  console.log("")


  const increaseQuantity = (productID, color) => {
    const item = order.items.find(
      (item) => item.productID === productID && item.color === color
    );

    if (!item) {
      return ShowSwal({
        title: 'خطا',
        text: 'سفارش با این محصول یافت نشد',
        icon: 'error',
      });
    }

    if (item.quantity >= item.product.count) {
      return ShowSwal({
        title: 'خطا',
        text: 'موجودی محصول کافی نیست',
        icon: 'error',
      });
    }

    setOrder({
      ...order,
      items: order.items.map((item) =>
        item.productID === productID && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    });

  };


  const decreaseQuantity = (productID, color) => {
    const item = order.items.find(
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


    setOrder({
      ...order,
      items: order.items.map((item) =>
        item.productID === productID && item.color === color
          ? {
            ...item,
            quantity: Math.max(1, item.quantity - 1),
          }
          : item
      ),
    });

  };

  console.log("orders: ", order.items)
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
        setOrder({
          ...order,
          items: order.items.filter(
            (order) => !(order.productID === productID && order.color === color)
          )
        }

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
    setOrder([...order.items, ...nextListItems]);
    setNextListItems([]);
  };

  if (loading) {
    return <div className="text-center loading">در حال دریافت داده‌ها...</div>;
  }
  if (error) {
    return <div className="text-center error">خطا: {error}</div>;
  }


  console.log("cart order : ", order)
  return (
    <main className="main-content">
      <div className="container main-container">

        <nav className="tab-cart-page">
          <div className="nav-tabs border-button p-2 " id="nav-tab" role="tablist">
            <button
              className={`card-tab-button p-2  ${activeTab === 'orders' ? 'active' : ''
                }`}
              onClick={() => setActiveTab('orders')}
              role="tab"
              aria-controls="nav-home"
              aria-selected={activeTab === 'orders'}
            >
              سبد خرید
            </button>
          </div>
        </nav>

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
                        ({order.items.length} کالا)
                      </span>
                    </div>
                    <div className="checkout-section-content-dd-k">
                      <div className="cart-items-dd-k">
                        {order.items.length === 0 ? (
                          <>
                            <ErrorMessage msg={"سبد خرید خالی است"} />
                            <button className='return-home_btn' onClick={() => Navigate("/")}>خانه</button>
                          </>
                        ) : (
                          order.items.map((item) => (
                            <div
                              className="cart-item py-4 px-3 m-2"
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
                                  <ul className='item-detail_list'>
                                    <li className='color-chip_item'>
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
                                            onClick={() => {
                                              console.log("product id :", item.productID)
                                              increaseQuantity(
                                                item.productID,
                                                item.color
                                              )
                                            }

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
                                        style={{ margin: "10px 0" }}
                                        onClick={() =>
                                          removeItem(item.productID, item.color)
                                        }
                                      >
                                        <DeleteOutlineOutlinedIcon />
                                        حذف
                                      </button>
                                    </div>
                                    <div className="item-price_container">
                                      <del className='discount-price'>
                                        {((item.price * (item.product.discountPercent / 100))* item.quantity).toLocaleString()}
                                        <span className="text-sm mr-1" style={{ margin: "0 10px" }}>تومان</span>
                                      </del>

                                      {item.product.hasDiscount && (
                                        <div className="payable-price">
                                          {((item.price * item.quantity) - ((item.price * item.quantity * (item.product.discountPercent / 100)))).toLocaleString()}{' '}
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
    </main>
  );
}
import { useState } from "react";
import "./UserOrders.css"

import ErrorMessage from "../../../ErrorMessage/ErrorMessage";
import useUserOrders from "../../../../Hooks/useUserOrders";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import useAllProducts from "../../../../Hooks/useAllProducts";

export default function OrdersPage() {
  const [tab, setTab] = useState(0);
  const { userOrders, userOrdersloading, userOrdersError } = useUserOrders()
  const { products, loading, error } = useAllProducts()


  const handleChange = (e, newValue) => setTab(newValue);


  // فیلتر سفارش‌ها بر اساس تب
  const activeOrders = userOrders.filter((o) => o.isActive === 1);
  const deliveredOrders = userOrders.filter((o) => o.isActive === 0);

  console.log("active user :", activeOrders)
  console.log("delivered user :", deliveredOrders)


  console.log("products:", products)
  return (
    <div className="orders-section">


      <div className="orders-section__tabs">
        <button className={`orders-section__tab ${tab === 0 ? "active" : ""}`} onClick={() => setTab(0)}>
          جاری
        </button>
        <button className={`orders-section__tab ${tab === 1 ? "active" : ""}`} onClick={() => setTab(1)}>
          تحویل شده
        </button>
      </div>


      {tab === 0 && (
        <div className="orders-section__panel">
          <ul class="order-list">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => (

                <li class="order-card">
                  <a href={`/profile/orders/${order.orderID}`} class="order-link">
                    <div class="order-header">
                      <div class="order-status">
                        <LoopOutlinedIcon />
                        <span>جاری</span>
                      </div>
                      <div class="order-chevron">
                        <svg>

                        </svg>
                      </div>
                    </div>

                    <div class="order-details">
                      <div class="order-date">{order.date.split("T")[0]}</div>
                      <div class="order-code">کد سفارش: {order.orderID}</div>
                      <div class="order-price">
                        مبلغ کل سفارش: <span>
                          {order.items.reduce((sum, item) => {
                            return sum + item.price
                          }, 0)}
                        </span>
                        <span class="toman-icon">
                          تومان
                        </span>
                      </div>
                      <div class="order-points">
                        <img src="/img//svg/club-point.svg" alt="امتیاز" />
                        <span>امتیاز دیدی کلاب: ۲۹</span>
                      </div>
                    </div>

                    <div class="order-products">
                      <div className="product-item">
                        {order.items.map((item) => {
                          const product = products.find((p) => p.id === item.productID);
                          return (
                            <img
                            style={{margin:"0 10px"}}
                              key={item.productID}
                              src={product ? `/img/products/${product.img}` : "#"}
                              alt={product ? product.name : "محصول"}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div class="order-footer">
                      <a href="/profile/orders/invoice/order/284805123/" class="invoice-link">
                        <svg>

                        </svg>
                        <span>مشاهده فاکتور</span>
                      </a>
                    </div>
                  </a>
                </li>


              ))
            ) : (
              <ErrorMessage msg={"سفارشی در این بخش وجود ندارد"} />
            )}
          </ul>
        </div>
      )}


      {tab === 1 && (
        <div className="orders-section__panel delivered-panel">
          <ul class="order-list">
            {deliveredOrders.length > 0 ? (
              deliveredOrders.map((order) => (

                <li class="order-card">
                  <a href={`/profile/orders/${order.orderID}`} class="order-link">
                    <div class="order-header">
                      <div class="order-status">
                        <CheckCircleOutlinedIcon />
                        <span>تحویل شده</span>
                      </div>
                      <div class="order-chevron">
                        <svg>

                        </svg>
                      </div>
                    </div>


                    <div class="order-details">
                      <div class="order-date">{order.date.split("T")[0]}</div>
                      <div class="order-code">کد سفارش: {order.orderID}</div>
                      <div class="order-price">
                        مبلغ کل سفارش: <span>
                          {order.items.reduce((sum, item) => {
                            return sum + item.price
                          }, 0)}
                        </span>
                        <span class="toman-icon">
                          تومان
                        </span>
                      </div>
                      <div class="order-points">
                        <img src="/img//svg/club-point.svg" alt="امتیاز" />
                        <span>امتیاز دیدی کلاب: ۲۹</span>
                      </div>
                    </div>

                    <div class="order-products">
                      <div className="product-item">
                        {order.items.map((item) => {
                          const product = products.find((p) => p.id === item.productID);
                          return (
                            <img
                            style={{margin:"0 10px"}}
                              key={item.productID}
                              src={product ? `/img/products/${product.img}` : "#"}
                              alt={product ? product.name : "محصول"}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div class="order-footer">
                      <a href="/profile/orders/invoice/order/284805123/" class="invoice-link">
                        <svg>

                        </svg>
                        <span>مشاهده فاکتور</span>
                      </a>
                    </div>
                  </a>
                </li>


              ))
            ) : (
              <ErrorMessage msg={"سفارشی در این بخش وجود ندارد"} />
            )}
          </ul>
        </div>
      )}
    </div>
  )



}

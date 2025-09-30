import React, { useEffect,useState} from "react";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";
import ErrorMessage from "./../../Pages/ErrorMessage/ErrorMessage";
import useUserCart from "../../Hooks/useUserCart";
export default function ShoppingCart() {

  const {shoppingCart ,errot,loading} = useUserCart()


  useEffect(() => {
   const cartArray = Object.values(shoppingCart)
  }, [])

  const totalPrice = shoppingCart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );




  return (
    <div className="header-cart-info">
      <div className="header-cart-info-header">
        <div className="header-cart-info-count">{shoppingCart.length} کالا</div>
        <Link to="/cart" className="header-cart-info-link">
          <span>مشاهده سبد خرید</span>
        </Link>
      </div>
      <ul
        className="header-basket-list"
        tabIndex="1"
        style={{ overflow: "hidden", outline: "none" }}
      >
        {shoppingCart.length === 0 ? (
          <ErrorMessage msg="ایتمی وجود ندارد" />
        ) : (
          shoppingCart.map((item) => (
            <li className="cart-item" key={item.product.id}>
              <Link to="/test" className="header-basket-list-item">
                <div className="header-basket-list-item-image">
                  <img src={`/img/products/${item.product.img}`} alt="" />
                </div>
                <div className="header-basket-list-item-content">
                  <p className="header-basket-list-item-title">{item.product.title}</p>
                  <div className="header-basket-list-item-footer">
                    <div className="header-basket-list-item-props">
                      <span className="header-basket-list-item-props-item">
                        <div
                          className="header-basket-list-item-color-badge"
                          style={{
                            background:
                              item.color 
                          }}
                        ></div>
                        {item.color}
                      </span>
                      <span className="header-basket-list-item-props-item">
                        {item.product.price.toLocaleString()} تومان
                      </span>
                      <span className="header-basket-list-item-props-item">
                        {item.quantity} x
                      </span>
                    </div>
                    <button className="header-basket-list-item-remove">
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
      <div className="header-cart-info-footer">
        <div className="header-cart-info-total">
          <span className="header-cart-info-total-text">مبلغ قابل پرداخت:</span>
          <p className="header-cart-info-total-amount">
            <span className="header-cart-info-total-amount-number">
              {totalPrice.toLocaleString()} <span>تومان</span>
            </span>
          </p>
        </div>
        <div>
          <Link to="/cart" className="header-cart-info-submit">
            ثبت سفارش
          </Link>
        </div>
      </div>
    </div>
  );
}
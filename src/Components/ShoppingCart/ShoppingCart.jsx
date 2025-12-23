import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "./../../Pages/ErrorMessage/ErrorMessage";
import useUserCart from "../../Hooks/useUserCart";
import Loader from "../Loader/Loader";

export default function ShoppingCart() {

  const { shoppingCart, errot, loading } = useUserCart()
  
  const cartItems = Array.isArray(shoppingCart) ? shoppingCart : [];
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div 
      className="w-80 absolute top-full left-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 text-right rtl"
      dir="rtl"
    >
      
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <div className="text-sm font-medium text-gray-700">
          {cartItems.length} کالا
        </div>
        
        <Link to="/cart" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition">
          <span>مشاهده سبد خرید</span>
        </Link>
      </div>
      
      <ul
        className="max-h-64 overflow-y-auto divide-y divide-gray-100"
      >
        {loading ? (
          <Loader/>
        ) : cartItems.length === 0 ? (
          <ErrorMessage msg="آیتمی وجود ندارد" />
        ) : (
          cartItems.map((item) => (
            <li className="cart-item" key={item.product.id}>
              <Link to="/test" className="flex items-center p-3 hover:bg-gray-50 transition">
                
                <div className="w-16 h-16 flex-shrink-0 ml-3 border rounded-md overflow-hidden">
                  <img src={`/img/products/${item.product.img}`} alt={item.product.title} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {item.product.title}
                  </p>
                  
                  <div className="flex justify-between items-end mt-1">
                    <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                      
                      <span className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full ml-1 border border-gray-300"
                          style={{ background: item.color }}
                        ></div>
                        {item.color}
                      </span>
                      
                      <span className="text-gray-600 font-semibold">
                        {item.quantity} x
                      </span>
                      <span className="text-indigo-600 font-bold">
                        {item.product.price.toLocaleString()}
                      </span>
                      
                      <span>تومان</span>
                    </div>
                    
                    <button className="text-red-400 hover:text-red-600 transition p-1 rounded-full">
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
      
      <div className="p-4 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-base text-gray-700">مبلغ قابل پرداخت:</span>
          
          <p className="font-extrabold text-xl text-indigo-700">
            <span>
              {totalPrice.toLocaleString()} 
            </span>
            <span className="text-sm font-normal mr-1">تومان</span>
          </p>
        </div>
        
        <div>
          <Link 
            to="/cart" 
            className="w-full block text-center py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
          >
            ثبت سفارش
          </Link>
        </div>
      </div>
    </div>
  );
}
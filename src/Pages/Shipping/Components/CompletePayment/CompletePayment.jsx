import React, { useState, useEffect } from 'react'
import "./CompletePayment.css"
import { useCurrentUser } from '../../../../Hooks/useCurrentUser'
import { useCart } from '../../../../Contexts/CartContext'
import UserOrderDetails from '../UserOrderDetails/UserOrderDetails'


export default function CompletePayment() {
    const { currentUser, loading, error } = useCurrentUser()
    const [user, setUser] = useState()
    const { orders } = useCart()
    const [purchasedOrders, setPurchasedOrders] = useState([])
    const [totalOrdersPrice, setTotalOrdersPrice] = useState(null)
    const [isReady, setIsReady] = useState(false)
    console.log("current:", currentUser)

    useEffect(() => {

        setIsReady(false)

        if (loading) return <p>Loading...</p>;
        if (error) return <p>خطا در دریافت اطلاعات کاربر</p>;

        setUser(currentUser)





        setIsReady(true)

    }, [currentUser])



    useEffect(() => {
        const finalledOrders = JSON.parse(localStorage.getItem("purchasedOrders") || "[]");


        const totalAmount = finalledOrders.reduce((acc, order) => acc + order.payablePrice * order.quantity, 0)

        setPurchasedOrders(finalledOrders)
        setTotalOrdersPrice(totalAmount) 
    }, [orders])




    if (loading) return;
    if (error) {
        console.log("error", error)
        return;
    }

    return (

        <main className="complete-payment">
            <div className="container">
                <div className="order-info">
                    <div className="alert-box">
                        <div className="icon-success">
                            <i className="mdi mdi-check-bold"></i>
                        </div>
                        <div className="alert-title">
                            <h4>
                                سفارش <span className="highlight-success">DDC-75007560</span> با موفقیت ثبت شد.
                            </h4>
                        </div>
                        <p className="alert-text">سفارش نهایتاً تا یک روز آماده ارسال خواهد شد.</p>
                    </div>

                    <section className="details">
                        <h4>
                            کد سفارش: <span>DDC-75007560</span>
                        </h4>
                        <p>
                            سفارش شما تکمیل شد
                        </p>

                        <div className="info-grid">
                            <p>نام تحویل گیرنده: <span>{currentUser?.firstname +" "+currentUser?.lastname} </span></p>
                            <p>شماره تماس: <span>{currentUser?.phone ? currentUser?.phone : "091*******"}</span></p>
                            <p>تعداد مرسوله: <span>{purchasedOrders?.length}</span></p>
                            <p>مبلغ کل: <span>{totalOrdersPrice}</span></p>
                            <p>روش پرداخت: <span>پرداخت اینترنتی (موفق)</span></p>
                            <p>وضعیت سفارش: <span>پرداخت شد</span></p>
                            <p>آدرس:  {currentUser.address ? currentUser.address : "ادرس کاربر محرمانه است."}  </p>
                        </div>
                    </section>
                </div>

                <section className="recommend">
                    <div className="section-header">
                        <h2>محصولات پیشنهادی برای شما</h2>
                        <a href="#">مشاهده همه</a>
                    </div>
                    <div className="products">
                        {/* چند نمونه کارت محصول */}
                        <div className="product-card">
                            <img src="./assets/img/products/07.jpg" alt="مانتو زنانه" />
                            <h5>مانتو زنانه</h5>
                            <span className="price">157,000 تومان</span>
                        </div>
                        <div className="product-card">
                            <img src="./assets/img/products/017.jpg" alt="کت مردانه" />
                            <h5>کت مردانه</h5>
                            <span className="price">199,000 تومان</span>
                        </div>
                        {/* ... سایر محصولات */}
                    </div>
                </section>
            </div>
        </main>

    )
}

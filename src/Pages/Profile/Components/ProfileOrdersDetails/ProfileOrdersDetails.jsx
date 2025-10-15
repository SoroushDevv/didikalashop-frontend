import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ProfileOrdersDetails.css"
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import useUserOrders from "../../../../Hooks/useUserOrders";
import useUserAddresses from "../../../../Hooks/useUserAddresses";
import useAllProducts from "../../../../Hooks/useAllProducts";
import ShowSwal from "../../../../Components/ShowSwal/ShowSwal";

export default function ProfileOrdersDetails() {
    const { userAddresses } = useUserAddresses()
    const Navigate = useNavigate()
    const params = useParams("orderId")
    const orderId = params.orderId
    const { currentUser } = useCurrentUser()
    const { userOrders, loading: orderLoading, error } = useUserOrders()
    const [order, setOrder] = useState()
    const [loading, setLoading] = useState(false)
    const [defaultAddress, setDefaultAddress] = useState()
    const [payablePrice, setPayablePrice] = useState()
    const { products } = useAllProducts()
    const [orderProducts, setOrderProducts] = useState([])




    useEffect(() => {
        setLoading(true);

        const foundOrder = userOrders.find((order) => {
            return order.orderID == orderId
        });


        console.log("found order :", foundOrder)
        if (foundOrder) {
            setOrder(foundOrder);
        } else {
            setOrder(null)
        }

        setDefaultAddress(userAddresses[0])
        setLoading(false);
    }, [userOrders, orderId]);


    useEffect(() => {
        if (!order || !Array.isArray(order.items)) return;

        const calculatedPrice = order.items.reduce((sum, item) => {
            return sum + (item.price || 0);
        }, 0);

        setPayablePrice(calculatedPrice);


        const productIds = order.items.map((o) => o.productID)

        const mainProducts = products.filter((product) => {
           return productIds.includes(product.id)
        })

       setOrderProducts(mainProducts)


    }, [order]);



    console.log("product items:", orderProducts)
    return (
        <div class="order-details">
            <div class="order-header">
                <div class="order-header__title">
                    <button class="order-header__back-btn" onClick={() => Navigate("/profile/orders")}>
                        <ArrowForwardOutlinedIcon />
                    </button>
                    <h2>جزئیات سفارش</h2>
                </div>
                <button  class="order-header__invoice-link" onClick={() => ShowSwal({title:"برای دریافت فاکتور به پشتیبانی پیام دهید",text:"",icon:"info",showCancelButton:false,showConfirmButton:true,confirmButtonText:"باش"})}>
                 
                    مشاهده فاکتور
                </button>
            </div>



            <div class="order-summary">
                <div class="order-summary__row">
                    <span class="label">کد پیگیری سفارش</span>
                    <span class="value">۴۴۵۲۲۳۶۴۶</span>
                </div>
                <div class="order-summary__row">
                    <span class="label">تاریخ ثبت سفارش</span>
                    <span class="value">{order ? order.date.split("T")[0] : "تاریخ"}</span>
                </div>
                <div class="order-summary__row">
                    <span class="label">تحویل گیرنده</span>
                    <span class="value">{currentUser ? currentUser.firstname + " " + currentUser.lastname : "کاربر"}</span>
                </div>
                <div class="order-summary__row">
                    <span class="label">شماره موبایل</span>
                    <span class="value">{currentUser ? currentUser.phone : "0917*******"}</span>
                </div>
                <div class="order-summary__row order-summary__address">
                    <span class="label">آدرس</span>
                    <span class="value">{defaultAddress ? defaultAddress.address : "ادرس کاربر"}</span>
                </div>
            </div>

            <div class="order-payment">
                <div class="payment__row">
                    <span class="label">مبلغ کل سفارش:</span>
                    <span class="value">{payablePrice ? payablePrice.toLocaleString() : "$"}</span>
                </div>
                <div class="payment__row">
                    <span class="label">هزینه ارسال:</span>
                    <span class="value">۱۹,۰۰۰ تومان</span>
                </div>
                <div class="payment__row">
                    <span class="label">نوع پرداخت:</span>
                    <span class="value">پرداخت اینترنتی</span>
                </div>
            </div>

            <div class="order-items">
                {orderProducts.map((item) => (
                     <div class="order-item">
                        <div class="order-item__image">
                            <img src={`/img/products/${item.img}`} alt="image" />
                            <span class="order-item__qty">{item.quantity}</span>
                        </div>
                        <div class="order-item__info">
                            <h3>{item.productDesc}</h3>
                            <p class="order-item__color">رنگ: {item.colors[0]}</p>
                            <p class="order-item__seller">فروشنده: حاجی ارزونی تهران</p>
                            <p class="order-item__guarantee">گارانتی اصالت و سلامت فیزیکی کالا</p>
                        </div>
                        <div class="order-item__price">
                            <span>{item.price}</span>
                        </div>
                    </div>
                )
                   
                )
                }
            </div>
        </div>

    )
}


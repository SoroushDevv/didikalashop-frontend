import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './../../Contexts/CartContext';
import api from '../../api/axios';
import { getAuthToken } from '../../Utils/AuthUtils';
import ShowSwal from '../ShowSwal/ShowSwal';
import {
  InfoOutlined,
  ArrowLeftOutlined,
  LocalShipping,
  CreditCard,
  Replay,
} from '@mui/icons-material';

const CheckoutSummary = ({ submitButtonTitle = 'ادامه و ثبت سفارش', submitButtonURL = '/shipping', getOffVlueTrigger }) => {
  const { order, triggerUpdate } = useCart();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [offValue, setOffValue] = useState(0);

  useEffect(() => {
    const savedOffValue = localStorage.getItem('offValue');
    setOffValue(savedOffValue ? parseInt(JSON.parse(savedOffValue)) : 0);
  }, [getOffVlueTrigger]);

  useEffect(() => {
    if (order && order.items.length > 0) {
      const total = order.items.reduce(
        (sum, item) => sum + (parseInt(item.price) || 0) * (parseInt(item.quantity) || 0),
        0
      );
      setTotalPrice(total);

      const totalDiscount = order.items.reduce(
        (sum, item) =>
          sum + (parseInt(item.price * (item.product.discountPercent || 0) / 100) || 0) * (parseInt(item.quantity) || 0),
        0
      );
      setTotalDiscount(totalDiscount);
    } else {
      setTotalPrice(0);
      setTotalDiscount(0);
    }
  }, [order.items]);

  useEffect(() => {
    const finalAmount = totalPrice - totalDiscount - (offValue || 0);
    setPayableAmount(finalAmount < 0 ? 0 : finalAmount);
  }, [totalPrice, totalDiscount, offValue]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    const orderData = order;
    localStorage.setItem("offValue", 0);

    try {
        console.log("order data 2:",orderData)
      const res = await api.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      const savedOrder = res.data.order
      ShowSwal({
        title: "سفارش با موفقیت ثبت شد",
        icon: "success",
        onConfirm: () => {
          localStorage.setItem("finalledOrder", JSON.stringify(savedOrder));
          triggerUpdate();
          navigate("/complete-payment");
        }
      });
    } catch (err) {
      console.log("errot",err)
      ShowSwal({ title: "خطا در ارسال سفارش", text: err.response?.data?.message || err.message, icon: "error" });
    }
  };

  return (
    <div className="sticky top-5 max-w-full lg:max-w-[300px]">
      {order && order.items.length > 0 ? (
        <div className="bg-white p-4 border border-gray-300 rounded-md mb-4">
          <h2 className="text-center text-lg font-semibold mb-2">خلاصه سبد شما</h2>
          <ul>
            {order.items.map(item => (
              <li key={item.productID} className="mb-3 border-b pb-2">
                <div className="text-right">
                  <h3 className="font-medium">{item.product?.title || 'محصول بدون نام'}</h3>
                  <p className="text-sm">تعداد: {parseInt(item.quantity) || 0}</p>
                  <p className="text-sm">قیمت واحد: {(parseInt(item.price) || 0).toLocaleString('fa-IR')} تومان</p>
                  {item.discount > 0 && <p className="text-sm text-red-600">تخفیف: {(parseInt(item.discount) || 0).toLocaleString('fa-IR')} تومان</p>}
                  {item.color && <p className="text-sm">رنگ: {item.color}</p>}
                  <p className="text-sm">تاریخ: {order.date} | ساعت: {order.hour}</p>
                </div>
              </li>
            ))}
          </ul>

          {(totalDiscount > 0 || offValue > 0) && <hr className="my-2" />}

          {totalDiscount > 0 && (
            <div className="flex justify-between text-red-600 text-sm mb-1">
              <span>کل تخفیف</span>
              <span>{totalDiscount.toLocaleString('fa-IR')} تومان</span>
            </div>
          )}

          {offValue > 0 && (
            <div className="flex justify-between text-red-600 text-sm mb-1">
              <span>تخفیف اضافی</span>
              <span>{(parseInt(offValue) || 0).toLocaleString('fa-IR')} تومان</span>
            </div>
          )}

          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center">
              هزینه ارسال <InfoOutlined fontSize="small" className="ml-1" />
            </span>
            <span>وابسته به آدرس</span>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center">
              دیدی کالا <InfoOutlined fontSize="small" className="ml-1" />
            </span>
            <span>۱۵۰+ امتیاز</span>
          </div>

          <hr className="my-2" />

          <div className="mb-2">
            <p className="text-sm mb-1">سود شما از این خرید:</p>
            <p className="text-red-600 font-semibold">{(totalDiscount + (parseInt(offValue) || 0)).toLocaleString('fa-IR')} تومان</p>
          </div>

          <div className="mb-2">
            <p className="text-sm mb-1">مبلغ قابل پرداخت:</p>
            <div className="flex flex-col">
              {offValue > 0 && <span className="text-gray-500 line-through text-sm">{totalPrice.toLocaleString('fa-IR')} تومان</span>}
              <span className="text-primary font-semibold">{payableAmount.toLocaleString('fa-IR')} تومان</span>
            </div>
          </div>

          <Link to={submitButtonURL}>
            <button
              onClick={(e) => submitButtonTitle === 'پرداخت' && submitHandler(e)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex justify-center items-center gap-2"
            >
              {submitButtonTitle} <ArrowLeftOutlined />
            </button>
          </Link>

          <div className="flex items-center mt-2 text-xs text-gray-500">
            <span>کالاهای موجود در سبد شما ثبت و رزرو نشده‌اند، برای ثبت سفارش مراحل بعدی را تکمیل کنید.</span>
            <InfoOutlined fontSize="small" className="ml-1" />
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 border border-gray-300 rounded-md mb-4">
          <p className="text-sm">سبد خرید شما خالی است.</p>
        </div>
      )}

      <div className="bg-white p-4 pt-6 border border-gray-300 rounded-md">
        <ul>
          <li className="flex items-center mb-2">
            <Replay className="ml-2" /> <span>هفت روز ضمانت تعویض</span>
          </li>
          <li className="flex items-center mb-2">
            <CreditCard className="ml-2" /> <span>پرداخت در محل با کارت بانکی</span>
          </li>
          <li className="flex items-center">
            <LocalShipping className="ml-2" /> <span>تحویل اکسپرس</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CheckoutSummary;

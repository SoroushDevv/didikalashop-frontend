import React from "react";

export default function UserOrderDetails() {


  return (
   <div className="order-details">
  {/* Navbar */}
  <div className="order-details__navbar">
    <a href="#" className="order-details__back">بازگشت</a>
    <h4>
      سفارش <span className="order-details__code">DKC-57456951</span>
      <span className="order-details__date">ثبت شده در تاریخ ۳۱ مرداد ۱۳۹۸</span>
    </h4>
  </div>

  {/* اطلاعات مرسوله */}
  <div className="order-details__shipment">
    <div className="order-details__row">
      <div className="order-details__info">
        <span className="order-details__label">تحویل گیرنده:</span>
        <span className="order-details__value">جلال بهرامی راد</span>
      </div>
      <div className="order-details__info">
        <span className="order-details__label">شماره تماس تحویل گیرنده:</span>
        <span className="order-details__value">09xxxxxxxxx</span>
      </div>
      <div className="order-details__info">
        <span className="order-details__label">کد مرسوله:</span>
        <span className="order-details__value">38776122</span>
      </div>
      <div className="order-details__info">
        <span className="order-details__label">نحوه ارسال سفارش:</span>
        <span className="order-details__value">پست پیشتاز با ظرفیت اختصاصی برای دیدیکالا</span>
      </div>
      <div className="order-details__info">
        <span className="order-details__label">هزینه ارسال:</span>
        <span className="order-details__value">رایگان</span>
      </div>
      <div className="order-details__info">
        <span className="order-details__label">زمان تحویل:</span>
        <span className="order-details__value">بازه دو‌شنبه ۴ شهریور - پنج‌شنبه ۷ شهریور</span>
        <button className="order-details__btn">تغییر زمان ارسال</button>
      </div>
      <div className="order-details__info order-details__total">
        <span className="order-details__label">مبلغ این مرسوله:</span>
        <span className="order-details__value">۹,۹۸۹,۰۰۰ تومان</span>
      </div>
    </div>
  </div>

  {/* مراحل سفارش */}
  <div className="order-details__steps">
    <div className="order-details__section-title">
      <h2>مرسوله 1 از 1</h2>
      <a href="#" className="order-details__cancel">لغو دریافت مرسوله</a>
    </div>
    <div className="order-details__steps-carousel">
      {[
        { img: "0eab59b0.svg", label: "لغو شده", active: true },
        { img: "d5d5e1d2.svg", label: "تایید سفارش", active: true },
        { img: "3db3cdeb.svg", label: "آماده‌سازی سفارش", active: false },
        { img: "332b9ff1.svg", label: "خروج از مرکز پردازش", active: false },
        { img: "07a0808a.svg", label: "تحویل به پست", active: false },
        { img: "dbab74ce.svg", label: "مرکز مبادلات پست", active: false },
        { img: "50450a73.svg", label: "تحویل به مشتری", active: false },
      ].map((step, index) => (
        <div
          key={index}
          className={`order-details__step ${step.active ? "is-active" : ""}`}
        >
          <img src={`./assets/img/svg/${step.img}`} alt={step.label} />
          <span>{step.label}</span>
        </div>
      ))}
    </div>
  </div>

  {/* جدول همه سفارش‌ها */}
  <div className="order-details__all-orders">
    <div className="order-details__section-title">
      <h2>همه سفارش‌ها</h2>
    </div>
    <div className="order-details__table-wrapper">
      <table className="order-details__table">
        <thead>
          <tr>
            <th>#</th>
            <th>نام محصول</th>
            <th>تعداد</th>
            <th>قیمت واحد</th>
            <th>قیمت کل</th>
            <th>تخفیف</th>
            <th>قیمت نهایی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {/* نمونه ردیف */}
          <tr>
            <td>1</td>
            <td>
              <div className="order-details__product">
                <img src="./assets/img/single-product/thumbnail-1.jpg" alt="" className="order-details__product-img"/>
                <div className="order-details__product-info">
                  <span className="order-details__product-name">گوشی موبایل سامسونگ مدل Galaxy S10 SM-G973F/DS دو سیم کارت ظرفیت 128 گیگابایت</span>
                  <span className="order-details__product-warranty">گارانتی 18 ماهه کاوش تیم</span>
                  <span className="order-details__product-seller">فروشنده : اوند</span>
                  <span className="order-details__product-color">رنگ : سفید</span>
                </div>
              </div>
            </td>
            <td>1</td>
            <td>۳,۵۶۰,۰۰۰ تومان</td>
            <td>۳,۵۶۰,۰۰۰ تومان</td>
            <td>۰</td>
            <td>۳,۵۶۰,۰۰۰ تومان</td>
            <td>
              <button className="order-details__btn-primary">خرید مجدد</button>
              <button className="order-details__btn-secondary">ثبت نظر</button>
            </td>
          </tr>
          {/* تکرار ردیف‌ها به همین صورت */}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}

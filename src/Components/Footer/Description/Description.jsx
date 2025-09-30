import React from 'react';
import "./Description.css"
export default function Description() {
  return (
    <div className="description">
      <div className="container main-container">
        <div className="row footer-description-wrapper">
          <div className="site-description col-12 col-lg-7">
            <h1 className="site-title">
              فروشگاه اینترنتی تاپ کالا، بررسی، انتخاب و خرید آنلاین
            </h1>
            <p>
              تاپ کالا به عنوان یکی از قدیمی‌ترین فروشگاه های اینترنتی با بیش از
              یک دهه تجربه، با پایبندی به سه اصل کلیدی، پرداخت در محل، 7 روز
              ضمانت بازگشت کالا و تضمین اصل‌بودن کالا، موفق شده تا همگام با
              فروشگاه‌های معتبر جهان، به بزرگ‌ترین فروشگاه اینترنتی ایران تبدیل
              شود. به محض ورود به تاپ کالا با یک سایت پر از کالا رو به رو
              می‌شوید! هر آنچه که نیاز دارید و به ذهن شما خطور می‌کند در اینجا
              پیدا خواهید کرد.
            </p>
          </div>
          <div className="symbol col-12 col-lg-5">
            <a href="#" target="_blank">
              <img src="/img/symbol-01.png" alt="نماد 1" />
            </a>
            <a href="#" target="_blank">
              <img src="/img/symbol-02.png" alt="نماد 2" />
            </a>
          </div>
        </div>
      </div>
      <div className="info">
        <div className="row">
          <div className="col-12 text-center">
            <span style={{direction:"rtl",textAlign:"center",display:"block"}}>هفت روز هفته، 24 ساعت شبانه‌روز پاسخگوی شما هستیم.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';


export default function Services() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-2 md:grid-col-3 md:grid-rows-2 lg:grid-cols-5 lg:grid-rows-1 w-full mb-4">
      <div className="col-span-1 flex flex-col w-40 h-40 justify-center items-center">

        <img src="/img/svg/delivery.svg" alt="تحویل اکسپرس" />

        <p>تحویل اکسپرس</p>
      </div>
      <div className="col-span-1 flex flex-col w-40 h-40justify-center items-center">

        <img src="/img/svg/contact-us.svg" alt="پشتیبانی 24 ساعته" />

        <p>پشتیبانی 24 ساعته</p>
      </div>
      <div className="col-span-1 flex flex-col w-40 h-40 justify-center items-center">

        <img src="/img/svg/payment-terms.svg" alt="پرداخت درمحل" />

        <p>پرداخت درمحل</p>
      </div>
      <div className="scol-span-1 flex flex-col w-40 h-40 justify-center items-center">

        <img src="/img/svg/return-policy.svg" alt="۷ روز ضمانت بازگشت" />

        <p>۷ روز ضمانت بازگشت</p>
      </div>
      <div className="col-span-1 flex flex-col w-40 h-40 justify-center items-center">

        <img src="/img/svg/origin-guarantee.svg" alt="ضمانت اصل بودن کالا" />

        <p>ضمانت اصل بودن کالا</p>
      </div>
    </div>
  );
}
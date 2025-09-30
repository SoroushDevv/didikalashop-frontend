import React from 'react';
import "./Services.css"


export default function Services() {
  return (
    <div className="footer-services">
      <div className="row">
        <div className="service-item col">
          
            <img src="/img/svg/delivery.svg" alt="تحویل اکسپرس" />
          
          <p>تحویل اکسپرس</p>
        </div>
        <div className="service-item col">
          
            <img src="/img/svg/contact-us.svg" alt="پشتیبانی 24 ساعته" />
      
          <p>پشتیبانی 24 ساعته</p>
        </div>
        <div className="service-item col">
          
            <img src="/img/svg/payment-terms.svg" alt="پرداخت درمحل" />
          
          <p>پرداخت درمحل</p>
        </div>
        <div className="service-item col">
          
            <img src="/img/svg/return-policy.svg" alt="۷ روز ضمانت بازگشت" />
        
          <p>۷ روز ضمانت بازگشت</p>
        </div>
        <div className="service-item col">
       
            <img src="/img/svg/origin-guarantee.svg" alt="ضمانت اصل بودن کالا" />
         
          <p>ضمانت اصل بودن کالا</p>
        </div>
      </div>
    </div>
  );
}
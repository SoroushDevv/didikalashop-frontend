import React from 'react';

export default function Description() {
  return (
    <div className="bg-gray-100 border-t border-gray-300" dir="rtl">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8 lg:space-x-reverse">
          
          <div className="w-full lg:w-7/12 mb-6 lg:mb-0">
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3">
              فروشگاه اینترنتی تاپ کالا، بررسی، انتخاب و خرید آنلاین
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              تاپ کالا به عنوان یکی از قدیمی‌ترین فروشگاه های اینترنتی با بیش از
              یک دهه تجربه، با پایبندی به سه اصل کلیدی، **پرداخت در محل**، **۷ روز
              ضمانت بازگشت کالا** و **تضمین اصل‌بودن کالا**، موفق شده تا همگام با
              فروشگاه‌های معتبر جهان، به بزرگ‌ترین فروشگاه اینترنتی ایران تبدیل
              شود. به محض ورود به تاپ کالا با یک سایت پر از کالا رو به رو
              می‌شوید! هر آنچه که نیاز دارید و به ذهن شما خطور می‌کند در اینجا
              پیدا خواهید کرد.
            </p>
          </div>
          
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end items-start space-x-4 space-x-reverse">
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-300 rounded-lg hover:shadow-md transition">
              <img src="/img/symbol-01.png" alt="نماد 1" className="h-20 w-auto" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-300 rounded-lg hover:shadow-md transition">
              <img src="/img/symbol-02.png" alt="نماد 2" className="h-20 w-auto" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-200 py-3 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <div className="text-sm text-gray-700 text-center">
              <span>هفت روز هفته، ۲۴ ساعت شبانه‌روز پاسخگوی شما هستیم.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
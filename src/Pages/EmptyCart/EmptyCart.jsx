import React from "react";

export default function EmptyCart() {
  return (
    <main className="w-full bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <div className="bg-white border rounded-2xl shadow-sm py-10 mb-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-red-500 text-5xl">
              <i className="mdi mdi-cart-remove"></i>
            </div>

            <p className="text-lg font-semibold text-gray-800">
              سبد خرید شما خالیست!
            </p>
            <p className="text-gray-500">
              می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:
            </p>

            <div className="flex flex-wrap justify-center gap-4 my-4">
              <a
                href="/test"
                className="text-blue-600 border-b border-blue-600 hover:text-blue-800"
              >
                لیست مورد علاقه من
              </a>
              <a
                href="/test"
                className="text-blue-600 border-b border-blue-600 hover:text-blue-800"
              >
                محصولات شگفت‌انگیز
              </a>
              <a
                href="/test"
                className="text-blue-600 border-b border-blue-600 hover:text-blue-800"
              >
                محصولات پرفروش روز
              </a>
            </div>

            <a
              href="/test"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition"
            >
              ادامه خرید در دیدیکالا
            </a>
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm py-6 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
            {[
              { icon: "delivery", title: "تحویل اکسپرس" },
              { icon: "contact-us", title: "پشتیبانی ۲۴ ساعته" },
              { icon: "payment-terms", title: "پرداخت در محل" },
              { icon: "return-policy", title: "۷ روز ضمانت بازگشت" },
              { icon: "origin-guarantee", title: "ضمانت اصل بودن کالا" },
            ].map((item) => (
              <a
                key={item.icon}
                href="/test"
                className="flex flex-col items-center gap-2 hover:text-primary-600 transition"
              >
                <img
                  src={`./assets/img/svg/${item.icon}.svg`}
                  alt={item.title}
                  className="w-12 h-12"
                />
                <span className="text-gray-700 text-sm">{item.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((num) => (
            <a
              key={num}
              href="/test"
              className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={`./assets/img/banner/small-banner-${num}.jpg`}
                alt=""
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>

        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              احتمالا به محصولات زیر هم علاقه‌مند باشید
            </h2>
            <a href="/test" className="text-primary-600 hover:text-primary-700">
              مشاهده همه
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[7, 17, 13, 9, 10, 11].map((num) => (
              <div
                key={num}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative p-2">
                  <div className="absolute top-2 right-2 flex gap-1 text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="mdi mdi-star"></i>
                    ))}
                  </div>
                  <img
                    src={`./assets/img/products/0${num}.jpg`}
                    alt="product"
                    className="rounded-lg w-full"
                  />
                </div>
                <div className="p-3 text-center">
                  <h5 className="text-sm font-semibold text-gray-700">
                    مانتو زنانه
                  </h5>
                  <p className="text-xs text-gray-500 mb-1">لباس زنانه</p>
                  <span className="text-primary-600 font-bold text-sm">
                    {`${(100000 + num * 5000).toLocaleString()} تومان`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              محصولات پیشنهادی برای شما
            </h2>
            <a href="/test" className="text-primary-600 hover:text-primary-700">
              مشاهده همه
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[7, 17, 13, 9, 10, 11].map((num) => (
              <div
                key={num}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative p-2">
                  <div className="absolute top-2 right-2 flex gap-1 text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="mdi mdi-star"></i>
                    ))}
                  </div>
                  <img
                    src={`./assets/img/products/0${num}.jpg`}
                    alt="product"
                    className="rounded-lg w-full"
                  />
                </div>
                <div className="p-3 text-center">
                  <h5 className="text-sm font-semibold text-gray-700">
                    تیشرت مردانه
                  </h5>
                  <p className="text-xs text-gray-500 mb-1">لباس مردانه</p>
                  <span className="text-primary-600 font-bold text-sm">
                    {`${(150000 + num * 3000).toLocaleString()} تومان`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

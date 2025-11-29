import React, { useState } from "react";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

export default function OrderReturnsMobile() {
  const [returnProducts, setReturnProducts] = useState([]);
  const [returnHistory, setReturnHistory] = useState([]);

  return (
    <div className="max-w-3xl w-full mx-auto p-4 flex flex-col gap-8 font-sans">
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-800 mb-2">درخواست مرجوعی</h2>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          {returnProducts.length === 0 ? (
            <ErrorMessage msg="محصول مرجوعی یافت نشد" />
          ) : (
            <p className="text-sm text-gray-600 py-2">
              در حال حاضر کالایی برای مرجوع کردن ندارید.
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-800 mb-2">تاریخچه مرجوعی</h2>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          {returnHistory.length === 0 ? (
            <ErrorMessage msg="خوشبختانه تا به حال کالایی را مرجوع نکرده‌اید و تاریخچه مرجوعی شما خالیست" />
          ) : (
            <p className="text-sm text-gray-600 py-2">محل قرارگیری محصول مرجوعی</p>
          )}
        </div>
      </section>
    </div>
  );
}

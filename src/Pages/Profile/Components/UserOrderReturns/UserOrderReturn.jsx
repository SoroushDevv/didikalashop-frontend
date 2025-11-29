import React, { useState } from "react";
import ErrorMessage from "../../../ErrorMessage/ErrorMessage";

export default function UserOrderReturn() {
  const [returnProducts, setReturnProducts] = useState([]);
  const [returnHistory, setReturnHistory] = useState([]);

  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-8 font-sans py-6">
      <section className="flex flex-col gap-3">
         <div className="w-full text-right mb-4">
        <h2 className="w-full text-xl font-bold text-gray-800 border-b-2 border-[#fa256c] pb-2">
        درخواست مرجوعی
        </h2>
      </div>
        <>
          {returnProducts.length === 0 ? (
            <ErrorMessage msg="محصول مرجوعی یافت نشد" />
          ) : (
            <p className="text-sm text-gray-600 py-2">
              در حال حاضر کالایی برای مرجوع کردن ندارید.
            </p>
          )}
        </>
      </section>

      <section className="flex flex-col gap-3">
           <div className="w-full text-right mb-4">
        <h2 className="w-full text-xl font-bold text-gray-800 border-b-2 border-[#fa256c] pb-2">
        تاریخچه مرجوعی
        </h2>
      </div>
        <>
          {returnHistory.length === 0 ? (
            <ErrorMessage msg="خوشبختانه تا به حال کالایی را مرجوع نکرده‌اید و تاریخچه مرجوعی شما خالیست" />
          ) : (
            <p className="text-sm text-gray-600 py-2">محل قرارگیری محصول مرجوعی</p>
          )}
        </>
      </section>
    </div>
  );
}

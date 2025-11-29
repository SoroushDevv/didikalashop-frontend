import React from 'react';

export default function ErrorPage() {
  return (
    <main className="w-full min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md py-12 text-center flex flex-col items-center gap-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            صفحه‌ای که دنبال آن بودید پیدا نشد!
          </h1>
          <a
            href="/test"
            className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition"
          >
            ادامه خرید در دیدیکالا
          </a>
          <img
            src="./assets/img/theme/404.png"
            alt="404"
            className="w-full max-w-md mt-4"
          />
        </div>
      </div>
    </main>
  );
}

import React, { useState } from "react";
import { historyProducts } from "../../../datas";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import StarRating from "../../../Components/Rating/StarRating";

export default function UserHistoryMobile() {
  const [recentProducts, setRecentProducts] = useState(historyProducts);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 bg-[#f9fafb] font-sans">
      <div className="w-full text-right mb-4">
        <h2 className="w-full text-xl font-bold text-gray-800 border-b-2 border-[#fa256c] pb-2">
          بازدید های اخیر
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentProducts.length ? (
          recentProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-start bg-white rounded-xl shadow-md p-4 transition-shadow duration-300 hover:shadow-lg"
            >
              <a href="#" className="flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[120px] h-auto object-cover rounded-lg"
                />
              </a>

              <div className="flex flex-col justify-between flex-1 mr-4">
                <div>
                  <a href="#">
                    <h3 className="text-base font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                  </a>

                  <div className="mb-2">
                    <StarRating score={product.rating} />
                  </div>

                  <div>
                    <span className="text-green-600 font-bold text-sm md:text-base">
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <a
                    href="#"
                    className="px-3 py-1.5 border border-blue-600 text-blue-600 text-sm rounded-md font-medium transition-all duration-200 hover:bg-blue-600 hover:text-white"
                  >
                    کالاهای مشابه
                  </a>

                  <button className="text-red-500 text-lg hover:text-red-700 transition-colors duration-200">
                    <i className="mdi mdi-trash-can-outline"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <ErrorMessage msg="تاریخچه‌ای موجود نیست" />
        )}
      </div>
    </div>
  );
}

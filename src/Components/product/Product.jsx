import React from "react";
import Rating from "../Rating/StarRating";

export default function Product({ product }) {

  return (
    <div className="flex flex-col h-full group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
        
        <div className="flex justify-end p-2">
          <div className="text-yellow-400">
            <Rating score={product.rating} size="small" showLabel={false} />
          </div>
        </div>
        
        <a href="shop-single.html" className="flex justify-center items-center p-4">
          <img 
            src={product.image} 
            alt={`تصویر ${product.name}`} 
            className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>
        
        <div className="p-4 pt-2 flex flex-col items-center text-center">
          <h5 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
            <a href="shop-single.html" className="hover:text-indigo-600 transition">
              {product.name}
            </a>
          </h5>
          
          <a href="shop-categories.html" className="text-sm text-gray-500 hover:text-indigo-500 transition mb-3">
            {product.category}
          </a>
          
          <span className="text-xl font-bold text-indigo-600">
            {product.price.toLocaleString()} تومان
          </span>
        </div>
      </div>
    </div>
  );
}
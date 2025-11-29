import React, { useMemo } from "react";

import { CheckCircle, Cancel } from "@mui/icons-material";
import StarRating from "../Rating/StarRating";
import useAllProducts from "../../Hooks/useAllProducts";

export default function CommentBox({ comment }) {
  const { products } = useAllProducts();

  const relatedProduct = useMemo(() => {
    if (!products || !comment?.productID) return null;
    return products.find((p) => p.id === comment.productID);
  }, [products, comment]);

  const statusChip = comment.status ? (
    <div
      className="inline-flex items-center px-3 py-1 text-xs font-semibold leading-5 text-green-700 bg-green-100 rounded-full border border-green-300"
    >
      <CheckCircle className="w-4 h-4 mr-1" />
      تایید شده
    </div>
  ) : (
    <div
      className="inline-flex items-center px-3 py-1 text-xs font-semibold leading-5 text-red-700 bg-red-100 rounded-full border border-red-300"
    >
      <Cancel className="w-4 h-4 mr-1" />
      رد شده
    </div>
  );

  console.log(relatedProduct)
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 border border-gray-100 mb-4" dir="rtl">

      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
        <div className="flex flex-col items-start">
          <StarRating score={comment.rating} />
        </div>
        
        {comment.status ? (
          <div className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full border border-green-300">
            تایید شده
          </div>
        ) : (
          <div className="inline-block px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full border border-red-300">
            رد شده
          </div>
        )}
      </div>


      <div className="pt-4 flex items-start space-x-4 space-x-reverse">
        
        {relatedProduct && (
          <a href={`/product/${relatedProduct.id}`} className="flex-shrink-0">
            <img
              src={`/img/products/${relatedProduct.img}`}
              alt={relatedProduct.title}
              className="w-16 h-16 object-cover rounded-md border border-gray-200"
            />
          </a>
        )}
        
        <div className="flex-grow">
          <h3 className="text-base font-extrabold text-gray-900 mb-1">
            {comment.title || "کامنت"}
          </h3>
          
          <p className="text-sm text-gray-700 leading-relaxed">
            {comment.body}
          </p>

          {relatedProduct && (
            <p className="mt-2 text-xs text-blue-600 font-medium">
                محصول: {relatedProduct.title}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
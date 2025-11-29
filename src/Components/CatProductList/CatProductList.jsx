import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAllProducts from "../../Hooks/useAllProducts";


import api from "../../api/axios";
import ShowSwal from "./../ShowSwal/ShowSwal";
import SnackBar from "./../SnackBar/SnackBar";


export default function CatProductList({ sort }) {
  const { searchValue, category } = useParams();
  const { products, loading, error } = useAllProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("/offs");
        setOffers(response.data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchValue) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(decodeURIComponent(searchValue).toLowerCase())
      );
    }

    if (category && category !== "all") {
      result = result.filter((product) =>
        product.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    switch (sort) {
      case "all":
        break;
      case "most-relevant":
        result = result.sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0)
        );
        break;
      case "best-seller":
        result = result.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
      case "cheapest":
        result = result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "most-expensive":
        result = result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchValue, category, sort, products]);

  const getProductDiscount = (productId) => {
    return offers.find(
      (off) => Number(off.productID) === Number(productId) && off.isActive
    );
  };

  const calculateDiscountedPrice = (price, discountPercent) => {
    if (typeof price !== "number" || typeof discountPercent !== "number") {
      return price;
    }
    return Math.round(price * (1 - discountPercent / 100));
  };

  const sortLabels = {
    all: "همه",
    "most-relevant": "مرتبط‌ترین",
    "best-seller": "پرفروش‌ترین",
    cheapest: "ارزان‌ترین",
    "most-expensive": "گران‌ترین",
  };

  const renderRating = (value) => {
    const fullStars = Math.floor(value);
    const emptyStars = 5 - fullStars;

    return (
      <div className="flex justify-center my-1" aria-label={`Rating: ${value} out of 5`}>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-base">★</span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-base">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full py-8 px-4 bg-gray-50 min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          محصولات در دسته‌بندی: {category === "all" ? "همه" : category || "همه"}
          {searchValue && `، جستجو: ${decodeURIComponent(searchValue)}`}
        </h2>
        {loading ? (
          <p className="text-center text-lg text-gray-600">در حال بارگذاری...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">{error}</p>
        ) : filteredProducts.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              مرتب‌سازی: {sortLabels[sort] || "همه"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredProducts.map((product) => {
                const discount = getProductDiscount(product.id);
                const discountedPrice = discount
                  ? calculateDiscountedPrice(product.price, discount.percent)
                  : null;

                return (
                  <div className="w-full" key={product.id}>
                    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative p-2">
                      <div className="absolute top-2 left-2 z-10">
                        {discount && (
                          <div
                            className="bg-red-500 text-white font-bold text-xs px-2 py-0.5 rounded-full"
                          >
                            %{discount.percent}
                          </div>
                        )}
                      </div>
                      
                      {renderRating(product.popularity || 0)}

                      <div className="h-36 flex justify-center items-center p-2">
                        <img
                          src={product.img || "/placeholder.jpg"}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      
                      <div className="flex flex-col flex-grow justify-between p-2">
                        <h4 className="text-sm font-semibold text-gray-900 h-10 overflow-hidden line-clamp-2 mb-1">
                          <a href={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
                            {product.title}
                          </a>
                        </h4>
                        
                        <a
                          href={
                            searchValue
                              ? `/product/s=${encodeURIComponent(searchValue)}&cat=${encodeURIComponent(product.category || "all")}`
                              : `/product/cat=${encodeURIComponent(product.category || "all")}`
                          }
                          className="text-xs text-gray-500 hover:text-gray-700 transition-colors block mb-2 overflow-hidden whitespace-nowrap text-ellipsis"
                        >
                          {product.category || "کالای فروشگاه"}
                        </a>
                        
                        <div className="mt-auto flex flex-col items-start min-h-[3rem]">
                          {discount ? (
                            <>
                              <p className="text-xs text-gray-500 line-through">
                                {product.price.toLocaleString("fa-IR")} تومان
                              </p>
                              <p className="text-lg font-bold text-red-600">
                                {discountedPrice.toLocaleString("fa-IR")} تومان
                              </p>
                            </>
                          ) : (
                            <p className="text-lg font-bold text-gray-900">
                              {product.price ? `${product.price.toLocaleString("fa-IR")} تومان` : "قیمت نامشخص"}
                            </p>
                          )}
                        </div>
                        
                        <button
                          className="mt-3 w-full py-2 text-sm font-semibold border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200"
                          onClick={() => {
                            ShowSwal({
                              title: "به سبد خرید اضافه شود؟",
                              text: " ",
                              icon: "info",
                              showCancelButton: true,
                              showConfirmButton: true,
                              confirmButtonText: "اضافه کن",
                              cancelButtonText: "خیر",
                              onConfirm: () => {
                                ShowSwal({
                                  title: "با موفقیت اضافه شد",
                                  text: " ",
                                  icon: "success",
                                  position: "top-end",
                                  showConfirmButton: false,
                                  timer: 1500,
                                });
                                console.log("اضافه شد");
                              },
                            });
                          }}
                        >
                          خرید
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-lg mt-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">نتیجه‌ای یافت نشد</h2>
            <p className="text-lg text-gray-500 text-center">
              برای دسته‌بندی "{category === "all" ? "همه" : category || "همه"}"
              {searchValue && ` و جستجو "${decodeURIComponent(searchValue)}"`} و
              مرتب‌سازی "{sortLabels[sort] || "همه"}" هیچ محصولی یافت نشد.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
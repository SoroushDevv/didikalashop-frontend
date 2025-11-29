import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAllProducts from "./../../Hooks/useAllProducts";
import useOffs from "../../Hooks/useAllOffs";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const ProductRating = ({ value }) => {
  const fullStars = Math.floor(value);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex justify-center text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.04 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.04 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
  );
};


export default function IncredibleOffers() {
  const { products, loading, error } = useAllProducts();
  const { offs } = useOffs();
  const Navigate = useNavigate();
  
  const filteredItems = useMemo(() => {
    if (!products || !offs) return [];
    
    return products.filter(product => product.discountPercent && product.discountPercent >= 30);
  }, [products, offs]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full">
        {loading ? (
          <div className="text-center text-indigo-600 font-semibold">در حال بارگذاری...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : filteredItems.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              {"پر تخفیف ها"}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map(product => {
                const discountPercent = product.discountPercent;
                const discountedPrice = discountPercent
                  ? Math.round(product.price * (1 - discountPercent / 100))
                  : null;

                return (
                  <div key={product.id}>
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full overflow-hidden relative border border-gray-100 p-2">
                      
                      <div className="flex justify-between items-start px-2 pt-2 absolute top-0 left-0 right-0 z-10">
                        <div className="mt-1">
                          <ProductRating value={product.popularity || 0} />
                        </div>
                        {discountPercent && (
                          <div className="bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-md ml-2 transform -translate-y-1">
                            %{discountPercent}
                          </div>
                        )}
                      </div>

                      <div className="pt-10 pb-4 h-48 flex justify-center items-center">
                        <img
                          src={product.img ? `/img/products/${product.img}` : "/img/products/default-product-pic.png"}
                          alt={product.title || product.name}
                          className="object-contain max-h-full w-full"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex flex-col flex-grow justify-between p-2 pt-1 mt-4">
                        
                        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                          <a 
                            href={`/productDetail/${product.title}`} 
                            className="hover:text-red-600 transition"
                          >
                            {product.title || product.name}
                          </a>
                        </h3>

                        <div className="flex flex-col items-end mb-3">
                          {discountedPrice ? (
                            <>
                              <div className="flex flex-col w-full text-right mb-1">
                                <span className="text-xs text-gray-600">قیمت:</span>
                                <span className="text-sm text-gray-400 line-through">
                                  {product.price.toLocaleString("fa-IR")} تومان
                                </span>
                              </div>

                              <div className="flex flex-col w-full text-right">
                                <span className="text-xs text-red-600 font-bold">قیمت با تخفیف:</span>
                                <span className="text-lg font-extrabold text-red-600">
                                  {discountedPrice.toLocaleString("fa-IR")} <span className="text-sm font-normal mr-1">تومان</span>
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full text-right">
                              <span className="text-lg font-extrabold text-gray-800">
                                {product.price.toLocaleString("fa-IR")} <span className="text-sm font-normal mr-1">تومان</span>
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          className="w-full py-2 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition duration-150"
                          onClick={() => Navigate(`/productDetail/${product.title}`)}
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
          <ErrorMessage msg="محصولی با تخفیف بالا یافت نشد" />
        )}
      </div>
    </div>
  );
}
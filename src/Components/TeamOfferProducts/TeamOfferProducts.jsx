import React from 'react';
import StarRating from '../Rating/StarRating';

const BuyButton = ({ children }) => (
  <button
    className="mt-2 bg-pink-500 text-white font-bold text-sm py-2 px-5 rounded-lg shadow-lg shadow-pink-300/50 transition duration-300 ease-in-out hover:bg-pink-600 hover:shadow-xl hover:scale-[1.01] active:bg-pink-700 active:shadow-md"
  >
    {children}
  </button>
);

const TeamOfferProducts = ({ products }) => {
  const validProducts = Array.isArray(products) ? products : [];
  
  const chunkSize = Math.ceil(validProducts.length / 3);
  const columns = [
    validProducts.slice(0, chunkSize),
    validProducts.slice(chunkSize, 2 * chunkSize),
    validProducts.slice(2 * chunkSize)
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      
      <div className="flex justify-center mb-6">
        <div className="w-full">
          <div className="relative text-center pb-4 before:content-[''] before:absolute before:bottom-0 before:right-1/2 before:translate-x-1/2 before:w-16 before:h-1 before:bg-pink-500">
            <h2 className="text-2xl font-extrabold text-gray-800">پیشنهاد ما</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-2">
        {columns.map((column, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-2 pt-4">
            {column.map((product) => (
              <div 
                key={product.id} 
                className="flex items-center bg-white p-3 rounded-lg border-b border-gray-200 mb-3 shadow-sm hover:shadow-md transition duration-200"
              >
                
                <div className="flex-shrink-0 w-20 h-20 ml-3">
                  <a href="#" className="block">
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="w-full h-full object-contain rounded-md" 
                    />
                  </a>
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div className="mb-1">
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-pink-600 line-clamp-2">
                      <h3>{product.title}</h3>
                    </a>
                  </div>
                  
                  <div className="mb-1">
                    <StarRating score={product.rating} size="small" showLabel={false} />
                  </div>
                  
                  <div className="font-bold text-base text-gray-900">
                    <span>{product.price.toLocaleString()} تومان</span>
                  </div>
                </div>
                
                <div className="flex-shrink-0 mr-3 self-center">
                  <BuyButton>
                    خرید
                  </BuyButton>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamOfferProducts;
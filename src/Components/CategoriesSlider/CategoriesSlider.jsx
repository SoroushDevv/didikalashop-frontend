import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';

const mockCategories = [
  { id: 1, title: "لوازم دیجیتال", categoryCount: 345000, icon: "https://placehold.co/80x80/f7858d/ffffff?text=Digi" },
  { id: 2, title: "خانه و آشپزخانه", categoryCount: 120000, icon: "https://placehold.co/80x80/f7858d/ffffff?text=Home" },
  { id: 3, title: "مد و پوشاک", categoryCount: 210000, icon: "https://placehold.co/80x85/f7858d/ffffff?text=Fashion" },
  { id: 4, title: "ابزارآلات", categoryCount: 85000, icon: "https://placehold.co/80x80/f7858d/ffffff?text=Tools" },
  { id: 5, title: "زیبایی و سلامت", categoryCount: 150000, icon: "https://placehold.co/80x80/f7858d/ffffff?text=Beauty" },
  { id: 6, title: "کتاب و لوازم التحریر", categoryCount: 95000, icon: "https://placehold.co/80x80/f7858d/ffffff?text=Books" },
  { id: 7, title: "ورزش و سفر", categoryCount: 60000, icon: "https://placehold.co/80x80/f7858d/ffffff?text=Sport" },
  { id: 8, title: "خودرو و موتورسیکلت", categoryCount: 40000, icon: "https://placehold.co/80x80/f7858d/ffffff?text=Car" },
];

const SplideCategoryCarousel = ({
  items = mockCategories,
  itemsPerPage = 5,
  autoplaySpeed = 3000,
  showPagination = true,
  showArrows = true,
  type = 'loop',
}) => {
  const splideOptions = {
    type,
    perPage: itemsPerPage,
    perMove: 1,
    gap: '1rem',
    arrows: showArrows,
    pagination: showPagination,
    autoplay: items.length > itemsPerPage,
    interval: autoplaySpeed,
    direction: 'rtl',
    rewind: true,
    breakpoints: {
      480: { perPage: 1, gap: '0.5rem' },
      640: { perPage: 2, gap: '0.5rem' },
      768: { perPage: 3, gap: '0.75rem' },
      1024: { perPage: 4, gap: '1rem' },
    },
  };

  return (
    <div className="w-full py-6 bg-gray-50 rounded-xl shadow-lg" dir="rtl">
      <Splide options={splideOptions} aria-label="Category Carousel" className="w-full">
        {items.map((item) => (
          <SplideSlide key={item.id} className="flex justify-center items-center h-auto">
            <div
              className="flex flex-col justify-center items-center text-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out p-5 w-[140px] max-h-[140px] border border-gray-100"
            >
              <div className="w-12 h-12 mb-2">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain rounded-full border border-gray-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/48x48/cccccc/333333?text=${encodeURIComponent(
                      item.title.substring(0, 3)
                    )}`;
                  }}
                />
              </div>

              <h4 className="text-sm font-bold text-gray-800 truncate w-full">
                {item.title}
              </h4>

              <p className="text-xs text-blue-600 font-medium mt-1">
                {item.categoryCount.toLocaleString('fa-IR')}+ کالا
              </p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SplideCategoryCarousel;
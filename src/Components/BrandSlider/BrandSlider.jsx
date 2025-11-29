import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const BrandSlider = ({
  items,
  options = {},
  slideClassName = 'flex items-center justify-center p-2',
  renderItem,
  arrows = false,
  direction = 'rtl',
}) => {
  const defaultOptions = {
    type: 'loop',
    perPage: 5,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    arrows,
    autoplay: true,
    interval: 0,
    speed: 30000,
    easing: 'ease',
    pauseOnHover: false,
    pauseOnFocus: false,
    drag: false,
    direction,
    rewind: false,
    waitForTransition: false,
    clones: items.length * 2,
    breakpoints: {
      768: { perPage: 3, gap: '0.5rem' },
      576: { perPage: 2, gap: '0.5rem' },
    },
    ...options,
  };

  return (
    <div className={`w-full ${direction === 'rtl' ? 'rtl' : 'ltr'}`} dir={direction}>
      <div className="w-full">
        <Splide
          options={defaultOptions}
          aria-label="Brand Carousel"
          className="w-full"
        >
          {items.map((item, index) => (
            <SplideSlide key={index} className={slideClassName}>
              {renderItem ? (
                renderItem(item, index)
              ) : (
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow transition duration-300 hover:shadow-lg">
                  {typeof item === 'string' ? (
                    <img
                      src={item}
                      alt={`Brand ${index + 1}`}
                      className="max-h-12 w-auto filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition duration-500"
                    />
                  ) : (
                    item
                  )}
                </div>
              )}
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default BrandSlider;
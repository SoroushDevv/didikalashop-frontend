import React from 'react';
import { Splide,SplideSlide } from '@splidejs/react-splide';
import './BrandSlider.css';

const BrandSlider = ({
  items,
  options = {},
  slideClassName = 'brand-carousel-container',
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
    pauseOnHover: false, // فعال کردن توقف هنگام هاور
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
    <div className="row" dir={direction}>
      <div className="col-12">
        <Splide
          options={defaultOptions}
          aria-label="Brand Carousel"
          className="brand-carousel-slider"
        >
          {items.map((item, index) => (
            <SplideSlide key={index} className={slideClassName}>
              {renderItem ? (
                renderItem(item, index)
              ) : (
                <div className="brand-carousel-item">
                  {typeof item === 'string' ? (
                    <img
                      src={item}
                      alt={`Brand ${index + 1}`}
                      className="brand-carousel-image"
                      
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
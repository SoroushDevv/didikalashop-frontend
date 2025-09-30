import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './SplideSlider.css';

const CustomCarousel = ({
  items,
  options = {},
  slideClassName = '',
  renderItem,
}) => {
  const defaultOptions = {
    type: items.length <= 1 ? 'fade' : options.type || 'fade',
    perPage: 1,
    perMove: 1,
    gap: '1rem',
    pagination: items.length > 1,
    arrows: items.length > 1,
    autoplay: items.length > 1,
    direction: 'rtl',
    ...options,
  };

  return (
    <div dir="rtl" className="custom-carousel-wrapper">
      <Splide
        options={defaultOptions}
        aria-label="Custom Carousel"
        className="custom-carousel"
      >
        {items.map((item, index) => (
          <SplideSlide
            key={index}
            className={`custom-carousel-slide ${slideClassName}`}
          >
            <div className="custom-carousel-item">
              {renderItem ? (
                renderItem(item, index)
              ) : typeof item === 'string' ? (
                <img
                  src={item}
                  alt={`Slide ${index + 1}`}
                  className="custom-carousel-image"
                />
              ) : (
                item
              )}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default CustomCarousel;

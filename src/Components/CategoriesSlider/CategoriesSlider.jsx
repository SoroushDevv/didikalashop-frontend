import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Box, Typography, Card, CardContent } from '@mui/material';
import '@splidejs/react-splide/css/core';
import "./CategoriesSlider.css"



const SplideCategoryCarousel = ({
  items = [],
  cardWidth = 250,
  cardBackground,
  itemsPerPage = 5,
  autoplaySpeed = 3000,
  showPagination = true,
  activeDotColor = '#f7858d',
  inactiveDotColor = '#f7858d',
  arrowColor = '#ffffff',
  arrowBackground = '#f7858d',
  showArrows = true,
  perPage = items.length,
  type = 'loop',
}) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const calculatedCardWidth = cardWidth;

  const splideOptions = {
    type: 'loop',
    perPage: Math.min(perPage, items.length),
    perMove: 1,
    gap: 10,
    arrows: true,
    pagination: true,
    autoplay: true,
    direction: 'rtl',
  };

  console.log(calculatedCardWidth)

  return (
    <Box className="carousel-container" dir="rtl">
      <Typography variant='body1' >
        بیش از ۱،۵۰۰،۰۰۰ کالا در دسته‌بندی‌های مختلف
      </Typography>
      <Splide options={splideOptions} aria-label="Category Carousel" className="category-carousel_wrapper">
        {items.map((item) => (
          <SplideSlide key={item.id} className="category-carousel_slide">
            <Card className="category-carousel-card_wrapper">
              <CardContent className="category-carousel-card__content">
                {item.icon && (
                  <img src={item.icon} alt={item.title} className="category-carousel-card__icon" />
                )}
                <Typography variant="h6" className="category-carousel-card__title" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" className="category-carousel-card__category">
                  {item.categoryCount}+ کالا
                </Typography>
              </CardContent>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default SplideCategoryCarousel;

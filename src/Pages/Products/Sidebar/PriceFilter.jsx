import React, { useState } from 'react';
import { Box, Typography, Slider } from '@mui/material';

const PriceFilter = ({ onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([41900000, 500000000]);

  // فرمت کردن قیمت با جداکننده هزارگان
  const formatPrice = (value) => {
    // اطمینان از غیرمنفی بودن و گرد کردن مقدار
    const safeValue = Math.max(0, Math.round(value));
    return safeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // مدیریت تغییر اسلایدر
  const handlePriceChange = (event, newValue) => {
    const [min, max] = newValue;
    // اطمینان از غیرمنفی بودن min و max
    const validMin = Math.max(0, Math.round(min));
    const validMax = Math.max(validMin, Math.round(max)); // max همیشه بیشتر یا مساوی min
    const newRange = [validMin, validMax];
    setPriceRange(newRange);
    if (typeof onPriceChange === 'function') {
      onPriceChange(newRange); // ارسال مقادیر به والد
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginBottom: '1.5rem', // معادل mb-4
        direction: 'rtl',
        padding: '0 15px', // شبیه‌سازی col-12
      }}
    >
      <Box
        sx={{
          marginBottom: '0.25rem', // معادل mb-1
          '& h2': {
            fontSize: '1.25rem', // معادل text-sm-title
            fontWeight: 500,
            margin: 0,
            lineHeight: 1.2,
          },
        }}
      >
        <Typography variant="h2" component="h2">
          فیلتر بر اساس قیمت :
        </Typography>
      </Box>
      <Box sx={{ margin: '0.5rem 0', padding: '0 1rem' }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${formatPrice(value)} تومان`}
          min={0} // شروع از 0
          max={500000000} // سقف 500 میلیون
          step={100000} // گام 100,000 تومان
          sx={{
            direction: 'ltr', // اسلایدر چپ‌به‌راست (0 در چپ، 500M در راست)
            '& .MuiSlider-rail': {
              backgroundColor: '#C0C0C0', // نقره‌ای
            },
            '& .MuiSlider-track': {
              backgroundColor: '#1976D2', // آبی
            },
            '& .MuiSlider-thumb': {
              backgroundColor: '#1976D2', // آبی
            },
          }}
        />
      </Box>
      <Box
        sx={{
          margin: '0.5rem 0',
          paddingTop: '0.5rem', // معادل pt-2
          textAlign: 'center', // معادل text-center
          fontSize: '0.875rem',
        }}
      >
        {/* نمایش مقادیر حداقل و حداکثر در خطوط جداگانه */}
        <Typography component="div" sx={{ marginBottom: '0.25rem' }}>
          {formatPrice(priceRange[0])} تومان
        </Typography>
        <Typography component="div" sx={{ marginBottom: '0.5rem' }}>
          {formatPrice(priceRange[1])} تومان
        </Typography>
        {/* نمایش محدوده قیمت */}
        {/* <Typography component="div">
          <Typography component="span" sx={{ marginLeft: '0.25rem' }}>
            قیمت:
          </Typography>
          <Typography component="span" className="example-val">
            {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
          </Typography>{' '}
          <Typography component="span">تومان</Typography>
        </Typography> */}
      </Box>
    </Box>
  );
};

export default PriceFilter;
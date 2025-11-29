import React, { useState } from 'react';
import { Box, Typography, Slider } from '@mui/material';

const PriceFilter = ({ onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([41900000, 500000000]);

  const formatPrice = (value) => {
    const safeValue = Math.max(0, Math.round(value));
    return safeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePriceChange = (event, newValue) => {
    const [min, max] = newValue;
    const validMin = Math.max(0, Math.round(min));
    const validMax = Math.max(validMin, Math.round(max)); 
    const newRange = [validMin, validMax];
    setPriceRange(newRange);
    if (typeof onPriceChange === 'function') {
      onPriceChange(newRange); 
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginBottom: '1.5rem', 
        direction: 'rtl',
        padding: '0 15px', 
      }}
    >
      <Box
        sx={{
          marginBottom: '0.25rem', 
          '& h2': {
            fontSize: '1.25rem',
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
          min={0} 
          max={500000000} 
          step={100000} 
          sx={{
            direction: 'ltr', 
            '& .MuiSlider-rail': {
              backgroundColor: '#C0C0C0',
            },
            '& .MuiSlider-track': {
              backgroundColor: '#1976D2', 
            },
            '& .MuiSlider-thumb': {
              backgroundColor: '#1976D2', 
            },
          }}
        />
      </Box>
      <Box
        sx={{
          margin: '0.5rem 0',
          paddingTop: '0.5rem', 
          textAlign: 'center', 
          fontSize: '0.875rem',
        }}
      >
        <Typography component="div" sx={{ marginBottom: '0.25rem' }}>
          {formatPrice(priceRange[0])} تومان
        </Typography>
        <Typography component="div" sx={{ marginBottom: '0.5rem' }}>
          {formatPrice(priceRange[1])} تومان
        </Typography>
      </Box>
    </Box>
  );
};

export default PriceFilter;
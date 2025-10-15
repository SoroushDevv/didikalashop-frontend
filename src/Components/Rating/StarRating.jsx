import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/material/styles';

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));


const StarRating = ({ score = 5, size = 'medium' }) => {
  const normalizedScore = Math.max(1, Math.min(5, score));

  const fullStars = normalizedScore;
  const emptyStars = 5 - fullStars;

  return (
    <RatingContainer>
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon
          key={`full-${index}`}
          fontSize={size}
          sx={{ color: 'gold', fontSize: 'smaller' }} // Use 'gold' for full stars
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <StarBorderIcon
          key={`empty-${index}`}
          fontSize={size}
          sx={{ color: 'grey.500', fontSize: 'smaller' }} // Use 'grey.500' for empty stars
        />
      ))}
    </RatingContainer>
  );
};

export default StarRating;
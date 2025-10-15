import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, LinearProgress, Slide, Box } from '@mui/material';
import PropTypes from 'prop-types';

const TransitionSlide = (props) => <Slide {...props} direction="up" />;

const SnackBar = ({
  open,
  isSuccess,
  onClose,
  message,
  autoHideDuration = 3000,
  backgroundColor,
  borderColor,
  textColor,
  borderWidth = '1px',
  borderRadius = '4px',
  fontSize = '14px',
  padding = '8px 16px',
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  transition = TransitionSlide,
  progressHeight = 4,
  progressSteps = 100, 
}) => {
  const [progress, setProgress] = useState(100);

  const severity = isSuccess ? 'success' : 'error';
  const progressColor = isSuccess ? '#4CAF50' : '#D32F2F';
  const defaultBackgroundColor = isSuccess ? '#E8F5E9' : '#FEE4E2'; 
  const defaultBorderColor = isSuccess ? '#4CAF50' : '#F44336'; 
  const defaultTextColor = isSuccess ? '#2E7D32' : '#B71C1C'; 

  useEffect(() => {
    if (open) {
      const intervalTime = autoHideDuration / progressSteps; 
      const decrement = 100 / progressSteps; 

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            if (typeof onClose === 'function') {
              onClose(); 
            }
            return 0;
          }
          return prev - decrement;
        });
      }, intervalTime);

      return () => clearInterval(timer);
    } else {
      setProgress(100); 
    }
  }, [open, autoHideDuration, onClose, progressSteps]);

  return (
    <Snackbar
      open={open}
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return; 
        }
        if (typeof onClose === 'function') {
          onClose();
        }
      }}
      anchorOrigin={anchorOrigin}
      TransitionComponent={transition}
    >
      <Box
        sx={{
          backgroundColor: backgroundColor || defaultBackgroundColor,
          border: borderColor
            ? `${borderWidth} solid ${borderColor}`
            : `${borderWidth} solid ${defaultBorderColor}`,
          borderRadius,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Alert
          severity={severity}
          sx={{
            color: textColor || defaultTextColor,
            fontSize,
            padding,
            backgroundColor: 'transparent',
            '& .MuiAlert-icon': {
              color: textColor || defaultTextColor,
            },
          }}
        >
          {message}
        </Alert>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: progressHeight,
            backgroundColor: '#E0E0E0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: progressColor,
            },
          }}
        />
      </Box>
    </Snackbar>
  );
};

SnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  borderWidth: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  padding: PropTypes.string,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  }),
  transition: PropTypes.elementType,
  progressHeight: PropTypes.number,
  progressSteps: PropTypes.number,
};

export default SnackBar;
import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, LinearProgress, Slide, Box } from '@mui/material';
import PropTypes from 'prop-types';

// تابع برای انیمیشن اسلاید
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
  progressSteps = 100, // تعداد مراحل کاهش progress
}) => {
  const [progress, setProgress] = useState(100);

  // تنظیم severity و رنگ‌ها بر اساس isSuccess
  const severity = isSuccess ? 'success' : 'error';
  const progressColor = isSuccess ? '#4CAF50' : '#D32F2F'; // سبز برای موفقیت، قرمز برای خطا
  const defaultBackgroundColor = isSuccess ? '#E8F5E9' : '#FEE4E2'; // سبز روشن برای موفقیت، قرمز روشن برای خطا
  const defaultBorderColor = isSuccess ? '#4CAF50' : '#F44336'; // سبز برای موفقیت، قرمز برای خطا
  const defaultTextColor = isSuccess ? '#2E7D32' : '#B71C1C'; // سبز تیره برای موفقیت، قرمز تیره برای خطا

  useEffect(() => {
    if (open) {
      const intervalTime = autoHideDuration / progressSteps; // زمان هر مرحله
      const decrement = 100 / progressSteps; // مقدار کاهش در هر مرحله

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            if (typeof onClose === 'function') {
              onClose(); // فقط وقتی پیشرفت به صفر رسید بسته بشه
            }
            return 0;
          }
          return prev - decrement;
        });
      }, intervalTime);

      return () => clearInterval(timer);
    } else {
      setProgress(100); // ریست پیشرفت وقتی اسنک‌بار بسته می‌شه
    }
  }, [open, autoHideDuration, onClose, progressSteps]);

  return (
    <Snackbar
      open={open}
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return; // از بسته شدن با کلیک خارج از اسنک‌بار جلوگیری می‌کنیم
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
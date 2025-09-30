import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(Tooltip)(({ theme }) => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}));

const HoverTooltip = ({
  title = 'Tooltip', // متن پیش‌فرض تولتیپ
  children, // المنت فرزند (مثل Button)
  placement = 'bottom', // موقعیت تولتیپ
  arrow = true, // نمایش پیکان
  disableInteractive = false, // غیرفعال کردن تعامل
  sx = {
    marginTop:"0.2rem"
  }, // استایل‌های اضافی
  ...props // سایر پراپ‌های MUI Tooltip
}) => {
  return (
    <CustomTooltip
      title={title}
      placement={placement}
      arrow={arrow}
      disableInteractive={disableInteractive}
      slotProps={{
        popper: {
          sx: {
            ...sx,
          },
        },
      }}
      {...props}
    >
      {children}
    </CustomTooltip>
  );
};

export default HoverTooltip;
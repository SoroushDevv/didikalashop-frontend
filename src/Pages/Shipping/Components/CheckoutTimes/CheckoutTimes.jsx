import  { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment-jalaali';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import "./CheckoutTimes.css"

// تنظیم moment-jalaali برای استفاده از تقویم شمسی
moment.loadPersian({ dialect: 'persian-modern' });

// استایل‌های سفارشی برای تب‌ها
const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 100,
  padding: '12px 16px',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '8px',
  },
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

// استایل‌های سفارشی برای بخش گزینه‌های ارسال
const StyledRadioBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
  '& .content-box': {
    marginRight: '16px',
  },
  '& .checkout-time-table-title-bar': {
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  '& .checkout-time-table-subtitle-bar': {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  '& .checkout-additional-options-checkbox-image': {
    width: '24px',
    height: '24px',
    marginLeft: '16px',
  },
}));

// استایل برای کارت پیش‌فاکتور
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(2),

  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: "1px solid #6c757d"
}));

// کامپوننت TabPanel
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// کامپوننت اصلی
const CheckoutTimes = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState('1');
  const [tabsData, setTabsData] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({});

  // محاسبه تاریخ‌های فردا و پس‌فردا
  useEffect(() => {
    const today = moment();
    const tomorrow = moment().add(1, 'days');
    const dayAfterTomorrow = moment().add(2, 'days');

    const daysData = [
      {
        day: tomorrow.format('dddd'),
        date: tomorrow.format('jD jMMMM'),
        timeSlots: [
          { id: 'option1', label: 'ساعت ۱۱ تا ۱۳' },
          { id: 'option2', label: 'ساعت ۱۳ تا ۱۵' },
        ],
      },
      {
        day: dayAfterTomorrow.format('dddd'),
        date: dayAfterTomorrow.format('jD jMMMM'),
        timeSlots: [
          { id: 'option3', label: 'ساعت ۱ تا ۳' },
          { id: 'option4', label: 'ساعت ۱۳ تا ۱۵' },
          { id: 'option5', label: 'ساعت ۱۳ تا ۱۵' },
        ],
      },
      {
        day: dayAfterTomorrow.clone().add(1, 'days').format('dddd'),
        date: dayAfterTomorrow.clone().add(1, 'days').format('jD jMMMM'),
        timeSlots: [],
        disabled: true,
      },
    ];

    setTabsData(daysData);
    // تنظیم بازه زمانی پیش‌فرض برای تب اول
    setSelectedTimeSlot({ [0]: daysData[0].timeSlots[0]?.id });
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // تنظیم بازه زمانی پیش‌فرض برای تب جدید
    setSelectedTimeSlot({ [newValue]: tabsData[newValue]?.timeSlots[0]?.id });
  };

  const handleTimeSlotChange = (tabIndex) => (event) => {
    setSelectedTimeSlot({ ...selectedTimeSlot, [tabIndex]: event.target.value });
  };

  const handleShippingChange = (event) => {
    setSelectedShipping(event.target.value);
  };

  // دسترسی به داده‌های تب انتخاب‌شده
  const getSelectedTabData = () => {
    const selectedTab = tabsData[tabValue] || {};
    const selectedTime = selectedTab?.timeSlots?.find(
      (slot) => slot.id === selectedTimeSlot[tabValue]
    )?.label;
    return {
      day: selectedTab.day,
      date: selectedTab.date,
      timeSlot: selectedTime || 'انتخاب نشده',
    };
  };

  // داده‌های گزینه ارسال
  const shippingOptions = [
    {
      id: '1',
      deliveryRange: 'از ۱۳ خرداد تا ۱۷ خرداد',
      method: 'پست پیشتاز با ظرفیت اختصاصی برای دیجی کالا',
      cost: 'رایگان',
    },
    {
      id: '2',
      deliveryRange: 'از ۱۷ خرداد تا ۲۰ خرداد',
      method: 'پست پیشتاز با ظرفیت اختصاصی برای دیجی کالا',
      cost: 'رایگان',
    },
  ];

  const getSelectedShippingData = () => {
    return shippingOptions.find((option) => option.id === selectedShipping) || {};
  };

  return (
    <Box className="checkout-times-container">
      {/* تب‌ها */}
      <Box className="checkout-tabs-wrapper">
        <Tabs
          className="checkout-tabs"
          value={tabValue}
          onChange={handleTabChange}
          aria-label="checkout tabs"
        >
          {tabsData.map((tab, i) => (
            <StyledTab
              className="checkout-tab-item"
              key={i}
              label={
                <>
                  {tab.day}
                  <Typography variant="caption" >{tab.date}</Typography>
                </>
              }
              id={`tab-${i}`}
              aria-controls={`tabpanel-${i}`}
            />
          ))}
        </Tabs>

        {tabsData.map((tab, i) => (
          <TabPanel key={i} value={tabValue} index={i}>
            <RadioGroup
              className="checkout-time-slots"
              name={`time-slot-${i}`}
              value={selectedTimeSlot[i] || ''}
              onChange={handleTimeSlotChange(i)}
            >
              {tab.timeSlots.map((slot) => (
                <FormControlLabel
                  className="checkout-time-slot"
                  key={slot.id}
                  value={slot.id}
                  control={<Radio />}
                  label={slot.label}
                />
              ))}
            </RadioGroup>
          </TabPanel>
        ))}
      </Box>

      {/* گزینه‌های ارسال */}
      <Box className="checkout-shipping-section">
        <RadioGroup
          className="checkout-shipping-options"
          name="post-pishtaz"
          value={selectedShipping}
          onChange={handleShippingChange}
        >
          {shippingOptions.map((o) => (
            <StyledRadioBox className="checkout-shipping-item" key={o.id}>
              <FormControlLabel
                className="checkout-shipping-radio"
                value={o.id}
                control={<Radio className="shipping-radio-input" />}
                label={
                  <Box className="checkout-shipping-content">
                    <LocalShippingOutlinedIcon className="checkout-shipping-icon" />
                    <Typography className="checkout-shipping-title">
                      بازه تحویل سفارش: {o.deliveryRange}
                    </Typography>
                    <List className="checkout-shipping-sublist">
                      <ListItem className="checkout-shipping-subitem">
                        <ListItemText primary={`شیوه ارسال: ${o.method}`} />
                      </ListItem>
                      <ListItem className="checkout-shipping-subitem">
                        <ListItemText primary={`هزینه ارسال: ${o.cost}`} />
                      </ListItem>
                    </List>
                  </Box>
                }
              />
            </StyledRadioBox>
          ))}
        </RadioGroup>
      </Box>


      {/* پیش‌فاکتور */}
      <StyledCard className="checkout-invoice-card">
        <CardContent className="checkout-invoice-content">
          <Typography className="checkout-invoice-title" variant="h4" gutterBottom>
            پیش‌فاکتور
          </Typography>
          <Divider className="checkout-invoice-divider" />
          <Typography className="checkout-invoice-subtitle">اطلاعات تحویل:</Typography>
          <List className="checkout-invoice-delivery-list" dense>
            <ListItem className="checkout-invoice-delivery-item">
              <ListItemText primary="روز تحویل" secondary={getSelectedTabData().day} />
            </ListItem>
            <ListItem className="checkout-invoice-delivery-item">
              <ListItemText primary="تاریخ تحویل" secondary={getSelectedTabData().date} />
            </ListItem>
            <ListItem className="checkout-invoice-delivery-item">
              <ListItemText primary="بازه زمانی" secondary={getSelectedTabData().timeSlot} />
            </ListItem>
          </List>
          <Typography className="checkout-invoice-subtitle">اطلاعات ارسال:</Typography>
          <List className="checkout-invoice-shipping-list" dense>
            <ListItem className="checkout-invoice-shipping-item">
              <ListItemText primary="بازه تحویل" secondary={getSelectedShippingData().deliveryRange} />
            </ListItem>
            <ListItem className="checkout-invoice-shipping-item">
              <ListItemText primary="شیوه ارسال" secondary={getSelectedShippingData().method} />
            </ListItem>
            <ListItem className="checkout-invoice-shipping-item">
              <ListItemText primary="هزینه ارسال" secondary={getSelectedShippingData().cost} />
            </ListItem>
          </List>
        </CardContent>
      </StyledCard>

    </Box>
  );
};

export default CheckoutTimes;
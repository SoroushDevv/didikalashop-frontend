import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReplayIcon from '@mui/icons-material/Replay';
import { styled } from '@mui/material/styles';
import { useCart } from './../../Contexts/CartContext';
import axios from 'axios';

// Styled components
const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    maxWidth: 300,
  },
}));

const SummaryPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: '1px solid',
  borderColor: theme.palette.divider,
}));

const FeaturePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
  border: '1px solid',
  borderColor: theme.palette.divider,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: theme.spacing(0),
  '& .MuiButton-endIcon': {
    marginLeft: theme.spacing(1),
  },
  backgroundColor: '#28a745 !important',
  color: '#fff !important',
  border: 'none !important',
  borderRadius: '4px !important',
}));

const CheckoutSummary = ({ submitButtonTitle = 'ادامه و ثبت سفارش', submitButtonURL = '/shipping', getOffVlueTrigger }) => {
  const { orders, triggerUpdate } = useCart();
  // const [trigger,setTrigger] =useState(0)
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [offValue, setOffValue] = useState()

  useEffect(() => {
    const savedOffValue = localStorage.getItem('offValue');

    setOffValue(savedOffValue ? parseInt(JSON.parse(savedOffValue)) : 0)
  }, [getOffVlueTrigger])

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (orders && orders.length > 0) {
        const total = orders.reduce(
          (sum, item) => sum + (parseInt(item.price) || 0) * (parseInt(item.quantity) || 0),
          0
        );
        setTotalPrice(total);
      } else {
        setTotalPrice(0);
      }
    };

    const calculateTotalDiscount = () => {
      if (!orders || !Array.isArray(orders) || orders.length === 0) {
        setTotalDiscount(0);
        return;
      }

      const totalDiscount = orders.reduce(
        (sum, item) => sum + (parseInt(item.discount) || 0) * (parseInt(item.quantity) || 0),
        0
      );
      setTotalDiscount(totalDiscount);
    };

    calculateTotalPrice();
    calculateTotalDiscount();
  }, [JSON.stringify(orders)]); // استفاده از JSON.stringify برای تشخیص تغییرات داخلی orders

  // محاسبه payableAmount
  useEffect(() => {
    const calculatePayableAmount = () => {
      const finalAmount = totalPrice - totalDiscount - (offValue || 0);
      setPayableAmount(finalAmount < 0 ? 0 : finalAmount);
      console.log('Calculated payableAmount:', finalAmount);
    };
    calculatePayableAmount();
  }, [totalPrice, totalDiscount, offValue]);

  const submitHandler = (e) => {
    e.preventDefault()

    const orders = JSON.parse(localStorage.getItem("orders"))
localStorage.setItem("offValue", 0)
    console.log("ordersss:",orders)

    
    const res = axios.post("http://localhost:8000/api/orders",)
  



    triggerUpdate()
  }

  return (
    <SidebarContainer>
      {orders && orders.length > 0 ? (
        <SummaryPaper elevation={0}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            خلاصه سبد شما
          </Typography>
          <List>
            {orders.map((order) => (
              <ListItem key={order.orderId}>
                <ListItemText
                  style={{ textAlign: 'start' }}
                  primary={order.product?.title || 'محصول بدون نام'}
                  secondary={
                    <Box style={{ textAlign: 'start' }}>
                      <Typography variant="body2">
                        تعداد: {parseInt(order.quantity) || 0}
                      </Typography>
                      <Typography variant="body2">
                        قیمت واحد: {(parseInt(order.price) || 0).toLocaleString('fa-IR', { minimumFractionDigits: 0 })} تومان
                      </Typography>
                      {order.discount > 0 && (
                        <Typography variant="body2" color="error.main">
                          تخفیف: {(parseInt(order.discount) || 0).toLocaleString('fa-IR', { minimumFractionDigits: 0 })} تومان
                        </Typography>
                      )}
                      {order.color && (
                        <Typography variant="body2">
                          رنگ: {order.color}
                        </Typography>
                      )}
                      <Typography variant="body2">
                        تاریخ: {order.date} | ساعت: {order.hour}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
            <Divider sx={{ my: 2 }} />
            {totalDiscount > 0 && (
              <ListItem sx={{ color: 'error.main' }}>
                <ListItemText primary="کل تخفیف" />
                <Typography variant="body2">
                  {totalDiscount.toLocaleString('fa-IR', { minimumFractionDigits: 0 })} تومان
                </Typography>
              </ListItem>
            )}
            {offValue > 0 && (
              <ListItem sx={{ color: 'error.main' }}>
                <ListItemText primary="تخفیف اضافی" />
                <Typography variant="body2">
                  {(parseInt(offValue) || 0).toLocaleString('fa-IR', { minimumFractionDigits: 0 })} تومان
                </Typography>
              </ListItem>
            )}
            <ListItem>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    هزینه ارسال
                    <Tooltip title="وابسته به آدرس">
                      <InfoOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
                    </Tooltip>
                  </Box>
                }
              />
              <Typography variant="body2">وابسته به آدرس</Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    دیدی کالا
                    <Tooltip title="اطلاعات بیشتر">
                      <InfoOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
                    </Tooltip>
                  </Box>
                }
              />
              <Typography variant="body2">
                <span>۱۵۰+</span> امتیاز
              </Typography>
            </ListItem>
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              سود شما از این خرید:
            </Typography>
            <Typography variant="h6" color="primary">
              {(totalDiscount + (parseInt(offValue) || 0)).toLocaleString('fa-IR', { minimumFractionDigits: 0 })} تومان
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              مبلغ قابل پرداخت:
            </Typography>
            <Box display="flex" alignItems="start" flexDirection="column" justifyContent="start">
              {offValue > 0 && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through', fontSize: 'smaller' }}
                >
                  {totalPrice.toLocaleString('fa-IR', { minimumFractionDigits: 0 })} تومان
                </Typography>
              )}
              <Typography variant="h6" color="primary">
                {payableAmount.toLocaleString('fa-IR', { minimumFractionDigits: 0 })} تومان
              </Typography>
            </Box>
          </Box>
          <Link to={submitButtonURL} style={{ textDecoration: 'none' }}>
            <StyledButton
              style={{ padding: '5px 10px !important' }}
              variant="contained"
              endIcon={<ArrowLeftOutlinedIcon />}
              onClick={(e) => {
                if (submitButtonTitle === "پرداخت") {
                  submitHandler(e)
                }
              }}
            >
              {submitButtonTitle}
            </StyledButton>
          </Link>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              کالاهای موجود در سبد شما ثبت و رزرو نشده‌اند، برای ثبت سفارش مراحل بعدی را تکمیل کنید.
            </Typography>
            <Tooltip title="اطلاعات بیشتر">
              <InfoOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
            </Tooltip>
          </Box>
        </SummaryPaper>
      ) : (
        <SummaryPaper elevation={0}>
          <Typography variant="body1">سبد خرید شما خالی است.</Typography>
        </SummaryPaper>
      )}
      <FeaturePaper elevation={0}>
        <List>
          <ListItem>
            <ListItemIcon>
              <ReplayIcon />
            </ListItemIcon>
            <ListItemText primary="هفت روز ضمانت تعویض" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary="پرداخت در محل با کارت بانکی" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="تحویل اکسپرس" />
          </ListItem>
        </List>
      </FeaturePaper>
    </SidebarContainer>
  );
};

export default CheckoutSummary;
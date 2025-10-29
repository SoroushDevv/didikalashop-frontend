import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import api from '../../api/axios';
import { getAuthToken } from '../../Utils/AuthUtils';
import ShowSwal from '../ShowSwal/ShowSwal';



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
  const { order, triggerUpdate } = useCart();
  const Navigate = useNavigate()
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
      if (order && order.items.length > 0) {
        const total = order.items.reduce(
          (sum, item) => sum + (parseInt(item.price) || 0) * (parseInt(item.quantity) || 0),
          0
        );
        setTotalPrice(total);
      } else {
        setTotalPrice(0);
      }
    };

    const calculateTotalDiscount = () => {
      if (!order || !Array.isArray(order.items) || order.items.length === 0) {
        setTotalDiscount(0);
        return;
      }

      const totalDiscount = order.items.reduce(
        (sum, item) => sum + (parseInt(item.price * item.product.discountPercent/100) || 0) * (parseInt(item.quantity) || 0),
        0
      );
      setTotalDiscount(totalDiscount);
    };

    calculateTotalPrice();
    calculateTotalDiscount();
  }, [order.items]);

  // محاسبه payableAmount
  useEffect(() => {
    const calculatePayableAmount = () => {
      console.log("total price :", totalPrice)
      console.log("total discount :", totalDiscount)
      const finalAmount = totalPrice - totalDiscount - (offValue || 0);
      setPayableAmount(finalAmount < 0 ? 0 : finalAmount);
      console.log('Calculated payableAmount:', finalAmount);
    };
    calculatePayableAmount();
  }, [totalPrice, totalDiscount, offValue]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = getAuthToken();
    const order = JSON.parse(localStorage.getItem("order"));
    localStorage.setItem("offValue", 0);

    console.log(" order being sent:", order);

    try {
      const res = await api.post(
        "/api/orders",
        order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Response data:", res.data);
      ShowSwal({
        title: "سفارش با موفقیت ثبت شد",
        text: "",
        icon: "success",
        onConfirm: () => {

          localStorage.setItem("finalledOrder", JSON.stringify(order))
          localStorage.setItem("order", JSON.stringify({
            orderId: null,
            userID: null,
            date: "",
            hour: "",
            isActive: false,
            items: [],
          }))
      triggerUpdate();
      Navigate("/complete-payment")

    }
      });


} catch (err) {
  console.error("❌ Error submitting order:", err);
  ShowSwal({
    title: "خطا در ارسال سفارش",
    text: err.response?.data?.message || err.message,
    icon: "error",
  });
}
  };


return (
  <SidebarContainer>
    {order && order.items.length > 0 ? (
      <SummaryPaper elevation={0}>
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          خلاصه سبد شما
        </Typography>
        <List>
          {order.items.map((item) => (
            <ListItem key={item.orderId}>
              <ListItemText
                style={{ textAlign: 'start' }}
                primary={item.product?.title || 'محصول بدون نام'}
                secondary={
                  <Box style={{ textAlign: 'start' }}>
                    <Typography variant="body2">
                      تعداد: {parseInt(item.quantity) || 0}
                    </Typography>
                    <Typography variant="body2">
                      قیمت واحد: {(parseInt(item.price) || 0).toLocaleString('fa-IR', { minimumFractionDigits: 0 })} تومان
                    </Typography>
                    {item.discount > 0 && (
                      <Typography variant="body2" color="error.main">
                        تخفیف: {(parseInt(item.discount) || 0).toLocaleString('fa-IR', { minimumFractionDigits: 0 })} تومان
                      </Typography>
                    )}
                    {item.color && (
                      <Typography variant="body2">
                        رنگ: {item.color}
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
          <Typography variant="h6" color="error">
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
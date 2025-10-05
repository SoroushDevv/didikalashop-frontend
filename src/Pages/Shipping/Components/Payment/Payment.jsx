import React, { useEffect, useState } from 'react';
import './Payment.css';
import CheckoutSummary from '../../../../Components/CheckoutSummary/CheckoutSummary';
import PropTypes from 'prop-types';
import PaymentIcon from '@mui/icons-material/Payment';
import RedeemIcon from '@mui/icons-material/Redeem';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCart } from '../../../../Contexts/CartContext';
import axios from 'axios';
import showSwal from '../../../../Components/ShowSwal/ShowSwal';
import useOffs from '../../../../Hooks/useAllOffs'
import { Outlet } from 'react-router-dom';

const colorMap = {
  'مشکی': '#000000',
  'سفید': '#FFFFFF',
  'آبی': '#0000FF',
  'قرمز': '#FF0000',
  'نقره‌ای': '#C0C0C0',
  'خاکستری': '#808080',
  'زرد': '#FFFF00',
  'صورتی': '#FF69B4',
  'قهوه‌ای': '#A52A2A',
  'شفاف': 'transparent',
  'چندرنگ': '#FFFFFF',
  'بنفش': '#800080',
  'سبز': '#008000'
};

const ColorChip = ({ color }) => {
  const hexColor = colorMap[color] || '#FFFFFF';
  const lightColors = ['#FFFFFF', '#FFFF00', '#FF69B4', '#C0C0C0', 'transparent'];


  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <div
        style={{
          backgroundColor: hexColor,
          border: '2px solid #ccc',
          width: 24,
          height: 24,
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        title={color || 'نامشخص'}
      >
        <CheckOutlinedIcon
          style={{
            color: lightColors.includes(hexColor) ? '#000' : '#fff',
            fontSize: 12,
            position: 'absolute',
          }}
        />
      </div>
      <span>{color || 'نامشخص'}</span>
    </Box>
  );
};

function Payment() {
  const { orders, setOrders, loading, error, triggerUpdate: trigger } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [total, setTotal] = useState(0);
  const [offerValue, setOfferValue] = useState(0);
  const [isCodeUsed, setIsCodeUsed] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const { offs } = useOffs();
  const [paymentMethod, setPaymentMethod] = useState('credit-cart');

  useEffect(() => {


    const totalPrice = orders.reduce((sum, item) => {
      const price = Number(item?.payablePrice) || 0;
      return sum + price;
    }, 0);

    setTotal(totalPrice);
  }, [orders, trigger]);

  const updateOffer = async (offId) => {
    try {
      console.log(offId);
      const response = await axios.put(`http://localhost:8000/api/offs/active-off/${offId}/0`);

      if (response.status === 200) {
        showSwal({ title: 'تخفیف اعمال شد', text: '', icon: 'success' });
        setCodeValue('');
        setUpdateTrigger((prev) => prev + 1);
      }
    } catch (err) {
      console.error('error of updating offer : ', err);
    } finally {
      console.log(':)');
    }
  };

  const handleAccordionChange = (event, expanded) => {
    setIsExpanded(expanded);
  };

  const checkCode = (e) => {
    e.preventDefault();
    if (codeValue !== '') {
      console.log('input value :', codeValue);
      console.log(isCodeUsed);
      if (!isCodeUsed) {
        const codeDetails = offs.find((off) => off.code === codeValue);
        console.log(codeDetails);

        if (!codeDetails) {
          showSwal({ title: 'اطلاعاتی برای این کد وجود ندارد', text: '', icon: 'info' });
          setCodeValue("")
          return false;
        }

        if (codeDetails.isActive) {
          const percent = codeDetails.percent;
          const discountPrice = (total * percent) / 100;

          localStorage.setItem('offValue', JSON.stringify(discountPrice));
          setUpdateTrigger((prev) => prev + 1);
          setOfferValue(discountPrice);

          updateOffer(codeDetails.id);
          setIsCodeUsed(true);
        } else {
          showSwal({
            title: 'ازین کد قبلا استفاده کردید ',
            text: '',
            icon: 'warning',
            onConfirm: () => {
              setCodeValue('');
            },
          });
        }
      } else {
        showSwal({ title: 'سقف استفاده شما از کد تخفیف پر شده است', text: '', icon: 'info' });
        setCodeValue('');
      }
    } else {
      showSwal({ title: 'کد تخفیف را وارد کنید', text: 'سپس دکمه ثبت را فشار دهید', icon: 'info' });
    }
  };

  return (
    <main className="main-content dt-sl mt-4 mb-3">
      <div className="container main-container">
        <div className="row">
          <div className="cart-page-content col-xl-9 col-lg-8 col-12 px-0" >
            <form class="checkout-payment-form">
              <div class="checkout-payment-form__header">
                <div class="checkout-payment-form__title">
                  <h2>انتخاب روش پرداخت</h2>
                </div>
              </div>

              <div class="checkout-payment-form__methods">
                <div class="checkout-payment-form__method">
                  <input
                    type="radio"
                    id="payment-online"
                    name="paymentOption"
                    value="credit-person"
                    class="checkout-payment-form__radio"
                  />
                  <label for="payment-online" class="checkout-payment-form__label">
                    <div class="checkout-payment-form__content">
                      <div class="checkout-payment-form__method-title">
                        <span class="checkout-payment-form__icon">
                          <PaymentIcon />
                        </span>
                        <div>
                          پرداخت اینترنتی
                          <span class="checkout-payment-form__tooltip-icon mdi mdi-information-outline"></span>
                        </div>
                      </div>
                      <ul class="checkout-payment-form__subtitle">
                        <li>پرداخت آنلاین با تمامی کارت‌های بانکی</li>
                      </ul>
                    </div>
                  </label>
                </div>

                <div class="checkout-payment-form__method">
                  <input
                    type="radio"
                    id="payment-company"
                    name="paymentOption"
                    value="credit-company"
                    class="checkout-payment-form__radio"

                  />
                  <label for="payment-company" class="checkout-payment-form__label">
                    <div class="checkout-payment-form__content">
                      <div class="checkout-payment-form__method-title">
                        <span class="checkout-payment-form__icon">
                          <PaymentIcon />
                        </span>
                        <div>
                          پرداخت با کارت اعتباری
                          <span class="checkout-payment-form__tooltip-icon mdi mdi-information-outline"></span>
                        </div>
                      </div>
                      <ul class="checkout-payment-form__subtitle">
                        <li>ویژه بانک‌ها، سازمان‌ها و شرکت‌ها</li>
                      </ul>
                    </div>
                  </label>
                </div>
              </div>
            </form>

            <div class="checkout-summary">
              <div class="checkout-summary__header">
                <h2 class="checkout-summary__title">خلاصه سفارش</h2>
              </div>

              <div class="checkout-summary__container">
                <div class="checkout-summary__order">
                  <div class="checkout-summary__order-item">
                    <div class="checkout-summary__order-header">
                      <div class="checkout-summary__payment-summary">
                        <div class="checkout-summary__summary-text">
                          <LocalShippingOutlinedIcon class="checkout-summary__icon" />
                          <p class="checkout-summary__date">پنج‌شنبه ۱۶ مرداد-بازه ۹ - ۲۲</p>
                          <span class="checkout-summary__item-count">{orders.length} کالا</span>
                        </div>
                        <span class="checkout-summary__method">ارسال عادی</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Accordion class="checkout-summary__accordion" onChange={handleAccordionChange}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon class="checkout-summary__expand-icon" />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span" class="checkout-summary__accordion-title">
                      {isExpanded ? 'بستن' : 'جزئیات مرسوله'}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails class="checkout-summary__accordion-details">
                    <List class="checkout-summary__list">
                      {orders.map((order) => (
                        <div class="checkout-summary__product" key={order.orderId}>
                          <div class="checkout-summary__product-item">
                            <div class="checkout-summary__thumbnail">
                              <a href="#">
                                <img src={`/img/products/${order.product.img}`} alt={order.product.productDesc} />
                              </a>
                            </div>
                            <div class="checkout-summary__product-info">
                              <div class="checkout-summary__product-title">
                                <h2><a href="#">{order.product.title}</a></h2>
                              </div>
                              <div class="checkout-summary__product-detail">
                                <ul>
                                  <li><ColorChip color={order.color} /></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </List>
                    <div class="checkout-summary__total-price">
                      <p>مبلغ مرسوله : {total.toLocaleString()} تومان</p>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>

            <div className="discount-section">
              <div className="discount-card">
                <div className="discount-title">
                  <h2>
                    استفاده از کد تخفیف
                    <span
                      className="discount-help"
                      data-toggle="tooltip"
                      data-html="true"
                      data-placement="bottom"
                      title="<div class='help-container is-left'><div class='help-arrow'></div><p class='help-text'>بعد از نهایی شدن سفارش کد تخفیف را ثبت نمایید. بعد از ثبت کد تخفیف امکان بازگشت و یا تغییر سبد وجود نخواهد داشت. در صورت تغییر سفارش، کد تخفیف از بین خواهد رفت و امکان اعمال مجدد آن وجود ندارد</p></div>"
                    >
                      <span className="mdi mdi-information-outline"></span>
                    </span>
                  </h2>
                </div>

                <p className="discount-description">
                  با ثبت کد تخفیف، مبلغ کد تخفیف از "مبلغ قابل پرداخت" کسر می‌شود.
                </p>

                <form className="discount-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="discount-input-group">
                    <input
                      type="text"
                      className="discount-input"
                      placeholder="کد تخفیف ..."
                      value={codeValue}
                      onChange={(e) => setCodeValue(e.target.value)}
                    />
                    <button
                      type="button"
                      className="discount-submit-btn"
                      onClick={(e) => checkCode(e)}
                    >
                      ثبت کد تخفیف
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
          <div className=" sticky-sidebar">
            <CheckoutSummary submitButtonTitle="پرداخت" submitButtonURL="/complete-payment" getOffVlueTrigger={updateTrigger} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Payment;
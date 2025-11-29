import { useEffect, useState } from 'react';
import './Payment.css';
import CheckoutSummary from '../../../../Components/CheckoutSummary/CheckoutSummary';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCart } from '../../../../Contexts/CartContext';
import api from '../../../../api/axios';
import showSwal from '../../../../Components/ShowSwal/ShowSwal';
import useOffs from '../../../../Hooks/useAllOffs'
import { useNavigate } from 'react-router-dom';

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
  const Navigate = useNavigate()
  const { order, setOrder, loading, error, triggerUpdate: trigger } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [total, setTotal] = useState(0);
  const [offerValue, setOfferValue] = useState(0);
  const [isCodeUsed, setIsCodeUsed] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const { offs } = useOffs();
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("paymentMethod") || "credit-person"
  );

  useEffect(() => {

    if(order.items.length === 0) {
      Navigate("/")
    }
  },[order])

  useEffect(() => {
    const totalPrice = order.items.reduce((sum, item) => {
      const price = Number(item?.payablePrice) || 0;
      return sum + price;
    }, 0);

    setTotal(totalPrice);
  }, [order.items, trigger]);

  const updateOffer = async (offId) => {
    try {
      console.log(offId);
      const response = await api.put(`/offs/active-off/${offId}/0`);

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
        <div className="row flex ">
          <div className="cart-page-content col-xl-9 col-lg-8 col-12 px-0" >
            <form className="checkout-payment-form w-full mt-4">
              <div className="checkout-payment-form__header mb-4">
                <h2 className="text-xl font-bold">انتخاب روش پرداخت</h2>
              </div>

              <div className="checkout-payment-form__methods flex flex-col gap-4">

                <label
                  htmlFor="payment-online"
                  className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition 
        ${paymentMethod === "credit-person" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                >
                  <input
                    type="radio"
                    id="payment-online"
                    name="paymentOption"
                    value="credit-person"
                    checked={paymentMethod === "credit-person"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      localStorage.setItem("paymentMethod", e.target.value);
                    }}
                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <PaymentIcon />
                      پرداخت اینترنتی
                    </div>
                    <ul className="text-sm text-gray-600">
                      <li>پرداخت آنلاین با تمامی کارت‌های بانکی</li>
                    </ul>
                  </div>
                </label>

                <label
                  htmlFor="payment-company"
                  className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition 
        ${paymentMethod === "credit-company" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                >
                  <input
                    type="radio"
                    id="payment-company"
                    name="paymentOption"
                    value="credit-company"
                    checked={paymentMethod === "credit-company"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      localStorage.setItem("paymentMethod", e.target.value);
                    }}
                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <PaymentIcon />
                      پرداخت با کارت اعتباری
                    </div>
                    <ul className="text-sm text-gray-600">
                      <li>ویژه بانک‌ها، سازمان‌ها و شرکت‌ها</li>
                    </ul>
                  </div>
                </label>

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
                          <span class="checkout-summary__item-count">{order.items.length} کالا</span>
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
                      {order.items.map((order) => (
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
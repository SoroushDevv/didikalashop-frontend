import React from 'react';
import useDiscountTimer from './../../Hooks/useDiscountTimer';
import './Timer.css';

const DiscountTimer = ({ endDate }) => {
  const { timeLeft, isActive } = useDiscountTimer(endDate);

  if (!isActive) return null;

  return (
    <div className="discount-timer">
      <div className="timer-title">زمان باقی‌مانده تا پایان تخفیف</div>
      <div className="timer-boxes">
        <div className="timer-box">
          <span>{timeLeft.days}</span>
          <span>روز</span>
        </div>
        <div className="timer-box">
          <span>{timeLeft.hours}</span>
          <span>ساعت</span>
        </div>
        <div className="timer-box">
          <span>{timeLeft.minutes}</span>
          <span>دقیقه</span>
        </div>
        <div className="timer-box">
          <span>{timeLeft.seconds}</span>
          <span>ثانیه</span>
        </div>
      </div>
    </div>
  );
};

export default DiscountTimer;
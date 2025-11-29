import React from 'react';
import useDiscountTimer from './../../Hooks/useDiscountTimer';

const DiscountTimer = ({ endDate }) => {
  const { timeLeft, isActive } = useDiscountTimer(endDate);

  if (!isActive) return null;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-red-600 rounded-xl shadow-lg text-white space-y-3 mx-auto max-w-sm rtl">
      
      <div className="text-sm font-semibold tracking-wide">
        زمان باقی‌مانده تا پایان تخفیف:
      </div>
      
      <div className="flex justify-center space-x-3 space-x-reverse">
        
        {renderTimerBox(timeLeft.days, 'روز')}
        {renderTimerBox(timeLeft.hours, 'ساعت')}
        {renderTimerBox(timeLeft.minutes, 'دقیقه')}
        {renderTimerBox(timeLeft.seconds, 'ثانیه')}

      </div>
    </div>
  );
};

const renderTimerBox = (value, unit) => (
    <div className="flex flex-col items-center justify-center bg-white text-red-600 rounded-lg w-16 h-16 shadow-md border border-red-700 p-1">
      <span className="text-xl font-extrabold leading-none">
        {value}
      </span>
      <span className="text-xs font-medium mt-0.5">
        {unit}
      </span>
    </div>
);

export default DiscountTimer;
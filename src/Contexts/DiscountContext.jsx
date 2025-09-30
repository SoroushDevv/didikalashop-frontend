import React, { createContext, useContext, useState, useEffect } from 'react';
import DiscountTimer from '../Components/Timer/Timer';
const DiscountContext = createContext();

const DiscountProvider = ({ children, endDate }) => {
  const [isDiscountActive, setIsDiscountActive] = useState(true);

  useEffect(() => {
    const checkDiscount = () => {
      const difference = new Date(endDate) - new Date();
      if (difference <= 0) {
        setIsDiscountActive(false);
      }
    };
    checkDiscount();
    const timer = setInterval(checkDiscount, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <DiscountContext.Provider value={{ isDiscountActive, endDate }}>
      {children}
    </DiscountContext.Provider>
  );
};

const DiscountTimerWrapper = () => {
  const { isDiscountActive, endDate } = useContext(DiscountContext);

  return isDiscountActive ? <DiscountTimer endDate={endDate} /> : null;
};

export { DiscountProvider, DiscountTimerWrapper };
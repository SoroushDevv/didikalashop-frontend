import { useState, useEffect } from 'react';

const useDiscountTimer = (endDate) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isActive, setIsActive] = useState(true);

  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    if (difference <= 0) {
      setIsActive(false);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return { timeLeft, isActive };
};

export default useDiscountTimer;
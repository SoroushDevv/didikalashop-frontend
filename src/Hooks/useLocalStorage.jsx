import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      const parsed = item ? JSON.parse(item) : initialValue;
      return Array.isArray(parsed) ? parsed : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  // خواندن دوباره از localStorage وقتی trigger تغییر می‌کنه
  useEffect(() => {
    setLoading(true);
    try {
      const item = localStorage.getItem(key);
      const parsed = item ? JSON.parse(item) : initialValue;
      const newValue = Array.isArray(parsed) ? parsed : initialValue;
      // فقط اگه داده تغییر کرده state رو به‌روزرسانی کن
      setValue((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(newValue)) {
          return newValue;
        }
        return prev;
      });
      setError(null);
    } catch (error) {
      setError('خطا در بارگذاری داده‌های سبد خرید');
      console.error('Error reading from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, [trigger, key]); // حذف initialValue از وابستگی‌ها

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValue(Array.isArray(parsed) ? parsed : initialValue);
    }
  }, [key]);

  const setLocalValue = (newValue) => {
    setLoading(true);
    try {
      const valueToStore = Array.isArray(newValue) ? newValue : initialValue;
      // فقط اگه داده تغییر کرده state و localStorage رو به‌روزرسانی کن
      if (JSON.stringify(value) !== JSON.stringify(valueToStore)) {
        setValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
        setTrigger((prev) => prev + 1);
      }
      setError(null);
    } catch (error) {
      setError('خطا در ذخیره‌سازی سبد خرید');
      console.error('Error writing to localStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  // گوش دادن به تغییرات localStorage در تب‌های دیگر
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setLoading(true);
        try {
          const parsed = event.newValue ? JSON.parse(event.newValue) : initialValue;
          const newValue = Array.isArray(parsed) ? parsed : initialValue;
          // فقط اگه داده تغییر کرده state رو به‌روزرسانی کن
          setValue((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(newValue)) {
              return newValue;
            }
            return prev;
          });
          setTrigger((prev) => prev + 1);
          setError(null);
        } catch (error) {
          setError('خطا در همگام‌سازی تغییرات سبد خرید');
          console.error('Error parsing storage event:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]); // حذف initialValue از وابستگی‌ها

  return [value, setLocalValue, { loading, error, trigger: () => setTrigger((prev) => prev + 1) }];
}

export default useLocalStorage;
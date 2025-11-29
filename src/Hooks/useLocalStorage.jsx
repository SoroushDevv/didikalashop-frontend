import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return initialValue;

      const parsed = JSON.parse(item);
      if (typeof parsed === typeof initialValue) {
        return parsed;
      }
      return initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    try {
      const item = localStorage.getItem(key);
      if (!item) return;

      const parsed = JSON.parse(item);
      if (typeof parsed === typeof initialValue) {
        setValue((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(parsed)) {
            return parsed;
          }
          return prev;
        });
      }
      setError(null);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      setError('خطا در بارگذاری داده‌ها');
    } finally {
      setLoading(false);
    }
  }, [trigger, key]);

  const setLocalValue = (newValue) => {
    setLoading(true);
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;

      if (JSON.stringify(value) !== JSON.stringify(valueToStore)) {
        setValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
        setTrigger((prev) => prev + 1);
      }
      setError(null);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      setError('خطا در ذخیره‌سازی داده');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (typeof parsed === typeof initialValue) {
            setValue(parsed);
            setTrigger((prev) => prev + 1);
          }
        } catch (error) {
          console.error('Error syncing localStorage:', error);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [
    value,
    setLocalValue,
    { loading, error, trigger: () => setTrigger((prev) => prev + 1) },
  ];
}

export default useLocalStorage;

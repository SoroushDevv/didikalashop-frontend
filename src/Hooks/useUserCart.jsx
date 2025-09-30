import { useState, useCallback, useMemo, useEffect } from 'react';
import apiUtils from '../Utils/ApiUtils';
import useLocalStorage from '../Hooks/useLocalStorage';
import useAllProducts from './useAllProducts';

function useUserCart() {
  const [localCart, setLocalCart, triggerReload] = useLocalStorage('orders', []);
  const { products, loading: productLoading, error: productError } = useAllProducts();
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دریافت تخفیف‌ها از سرور
  const fetchDiscounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiUtils.get('offs');
      setDiscounts(response.data || []);
    } catch (err) {
      console.error('خطا در دریافت تخفیف‌ها:', err);
      setError(err.message || 'خطا در دریافت تخفیف‌ها');
    } finally {
      setLoading(false);
    }
  }, []);

  // فراخوانی اولیه تخفیف‌ها
  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  // فرمت کردن سبد خرید
  const shoppingCart = useMemo(() => {
    try {
      const activeDiscounts = discounts.filter((discount) => discount.isActive);

      const formattedCart = localCart.map((order) => {
        const product = products.find((p) => p.id === order.productID) || {
          id: order.productID,
          title: 'محصول ناموجود',
          price: 0,
          img: '',
        };
        const discount = activeDiscounts.find((d) => d.productID === order.productID) || {
          percent: 0,
        };
        const originalPrice = product.price || 0;
        const discountedPrice = originalPrice
          ? Math.round(originalPrice * (1 - discount.percent / 100))
          : 0;

        return {
          ...order,
          product,
          color: order.color || '',
          discountPercent: discount.percent,
          originalPrice,
          discountedPrice,
        };
      });

      return formattedCart;
    } catch (err) {
      console.error('خطا در پردازش سبد خرید:', err);
      setError(err.message || 'خطا در پردازش سبد خرید');
      return [];
    }
  }, [localCart, discounts, products]);

  // تابع برای افزودن یا به‌روزرسانی آیتم در سبد خرید
  const updateCart = useCallback(
    (newItem) => {
      setLocalCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (item) => item.productID === newItem.productID && item.color === newItem.color
        );
        if (existingItemIndex >= 0) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + (newItem.quantity || 1),
          };
          return updatedCart;
        } else {
          return [
            ...prevCart,
            {
              ...newItem,
              id: `${newItem.productID}-${newItem.color || 'no-color'}-${Date.now()}`,
              quantity: newItem.quantity || 1,
            },
          ];
        }
      });
      triggerReload(); // ریلود بعد از افزودن/به‌روزرسانی
    },
    [setLocalCart, triggerReload]
  );

  // تابع برای تغییر تعداد آیتم
  const updateQuantity = useCallback(
    (productID, color, newQuantity) => {
      if (newQuantity <= 0) {
        removeFromCart(productID, color);
        return;
      }
      setLocalCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.productID === productID && item.color === color
            ? { ...item, quantity: newQuantity }
            : item
        );
        return updatedCart;
      });
      triggerReload(); // ریلود بعد از تغییر تعداد
    },
    [setLocalCart, triggerReload]
  );

  // تابع برای حذف آیتم از سبد خرید
  const removeFromCart = useCallback(
    (productID, color) => {
      setLocalCart((prevCart) =>
        prevCart.filter((item) => !(item.productID === productID && item.color === color))
      );
      triggerReload(); // ریلود بعد از حذف
    },
    [setLocalCart, triggerReload]
  );

  // تابع برای پاک کردن سبد خرید
  const clearCart = useCallback(() => {
    setLocalCart([]);
    triggerReload(); // ریلود بعد از پاک کردن
  }, [setLocalCart, triggerReload]);

  // تابع برای ارسال به API (فرضی)
  const submitCartToApi = useCallback(
    async (userID) => {
      try {
        const response = await apiUtils.post('orders', { userID, orders: shoppingCart });
        if (response.status === 200) {
          clearCart();
          return { success: true, data: response.data };
        }
        throw new Error('خطا در ارسال سفارش');
      } catch (err) {
        console.error('خطا در ارسال به API:', err);
        return { success: false, error: err.message || 'خطا در ارسال سفارش' };
      }
    },
    [shoppingCart, clearCart]
  );

  return {
    shoppingCart,
    updateCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    submitCartToApi,
    triggerReload, // اضافه کردن تابع triggerReload به خروجی
    loading: loading || productLoading,
    error: error || productError,
  };
}

export default useUserCart;
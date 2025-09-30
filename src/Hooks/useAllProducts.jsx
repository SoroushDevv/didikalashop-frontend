import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('http://localhost:8000/api/products');

        // نگهداری دقیق پراپرتی‌های دیتابیس
        const formattedProducts = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          count: item.count,
          img: item.img,
          popularity: item.popularity,
          sale: item.sale,
          hasDiscount: item.hasDiscount,
          discountEndDate: item.discountEndDate,
          discountPercent: item.discountPercent,
          colors: JSON.parse(item.colors || '[]'), 
          productDesc: item.productDesc,
          url: item.url,
          categoryID: item.categoryID, 
        }));

        setProducts(formattedProducts);
      } catch (err) {
        setError('خطا در دریافت محصولات. لطفاً دوباره تلاش کنید.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useAllProducts;

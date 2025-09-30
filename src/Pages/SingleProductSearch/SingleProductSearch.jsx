import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Grid,
} from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import StarRating from '../../Components/Rating/StarRating';
import { styled } from '@mui/material/styles';
import './SingleProductSearch.css';
import useAllProducts from '../../Hooks/useAllProducts';
import ProductComment from '../ProductComment/ProductComment';
import ProductCarousel from '../../Components/ProductCarousel/ProductCarousel';
import ShowSwal from '../../Components/ShowSwal/ShowSwal';
import { useCurrentUser } from '../../Hooks/useCurrentUser';
import { useCart } from './../../Contexts/CartContext';
import { v4 as uuidv4 } from 'uuid';

// دیکشنری نگاشت رنگ‌های فارسی به کد هگز
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

const ColorChip = ({ color, isSelected, onClick }) => {
  // گرفتن کد هگز از دیکشنری
  const hexColor = colorMap[color] || '#FFFFFF'; // پیش‌فرض سفید
  // لیست رنگ‌های روشن برای تنظیم رنگ آیکون
  const lightColors = ['#FFFFFF', '#FFFF00', '#FF69B4', '#C0C0C0', 'transparent'];

  // لاگ برای دیباگ
  console.log(`Color: ${color}, Hex: ${hexColor}`);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <div
        onClick={onClick}
        style={{
          backgroundColor: hexColor,
          border: `2px solid ${isSelected ? '#000' : '#ccc'}`,
          width: 32,
          height: 32,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'transform 0.2s ease-in-out, border-color 0.2s ease-in-out',
          transform: isSelected ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isSelected ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
        }}
        title={color} 
      >
        {isSelected && (
          <CheckOutlinedIcon
            style={{
              color: lightColors.includes(hexColor) ? '#000' : '#fff',
              fontSize: 16,
              position: 'absolute',
            }}
          />
        )}
      </div>
      <Typography variant="body2">{color}</Typography> 
    </Box>
  );
};

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  objectFit: 'cover',
}));

const ProductCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `0px solid ${theme.palette.divider}`,
}));

export default function SingleProductSearch() {
  const { orders, setOrders, loading, error, triggerUpdate } = useCart();
  const { currentUser, loading: userLoading, error: userError } = useCurrentUser();
  const { products, loading: productsLoading, error: productsError } = useAllProducts();
  const { productTitle: encodedTitle } = useParams();
  const navigate = useNavigate();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [localQuantity, setLocalQuantity] = useState(1);
  const [colors,setColors] = useState([])
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productTitle = encodedTitle ? decodeURIComponent(encodedTitle) : null;
        const filteredProduct = products.find(
          (product) => product.title === productTitle
        );
        console.log(filteredProduct)
        if (!filteredProduct) {
          throw new Error('محصول یافت نشد');
        }
        const similarProducts = products.filter(
          (product) =>
            product.popularity === filteredProduct.popularity &&
            product.id !== filteredProduct.id
        );

        setSimilarProducts(similarProducts);
        setProduct(filteredProduct);
        // تنظیم رنگ پیش‌فرض
        // const colors = filteredProduct?.colors ? filteredProduct.colors : [];
        console.log(filteredProduct.colors)
        setSelectedColor(filteredProduct.colors.length > 0 ? filteredProduct.colors[0] : null);
        setColors(filteredProduct.colors)
        setLocalQuantity(1);
      } catch (err) {
        console.error('Error fetching product:', err);
        ShowSwal({
          title: 'خطا',
          text: err.message || 'خطا در بارگذاری محصول',
          icon: 'error',
        });
      }
    };
    if (products.length > 0) {
      fetchProduct();
    }
  }, [encodedTitle, products]);

  useEffect(() => {
    if (product && selectedColor) {
      const existingOrder = orders.find(
        (order) => order.productID === product.id && order.color === selectedColor
      );
      setLocalQuantity(existingOrder ? existingOrder.quantity : 1);
    }
  }, [product, selectedColor, orders]);

  const handleAddToCart = (productId, userId, quantity, color) => {
    if (!products || !Array.isArray(products)) {
      ShowSwal({
        title: 'خطا',
        text: 'لیست محصولات معتبر نیست',
        icon: 'error',
      });
      return { success: false, error: 'لیست محصولات معتبر نیست' };
    }

    const product = products.find((p) => p.id === productId);
    if (!product || !product.id || !userId || !product.price || quantity <= 0 || quantity === null) {
      ShowSwal({
        title: 'خطا',
        text: 'اطلاعات محصول یا کاربر نامعتبر است',
        icon: 'error',
      });
      return { success: false, error: 'اطلاعات محصول یا کاربر نامعتبر است' };
    }

    if ( colors && colors.length > 0 && !color) {
      ShowSwal({
        title: 'خطا',
        text: 'لطفاً یک رنگ انتخاب کنید',
        icon: 'error',
      });
      return { success: false, error: 'رنگ انتخاب نشده است' };
    }

    const orderIndex = orders.findIndex(
      (order) => order.productID === productId && order.color === color
    );

    const discount = product.discount || 0;
    const discountedPrice = product.price * (1 - discount / 100);
    const payablePrice = discountedPrice * quantity;

    let updatedOrders;
    if (orderIndex !== -1) {
      updatedOrders = orders.map((order, index) =>
        index === orderIndex
          ? { ...order, quantity, payablePrice }
          : order
      );
      ShowSwal({
        title: 'موفقیت',
        text: 'سبد خرید به‌روزرسانی شد',
        icon: 'success',
      });
    } else {
      const newOrder = {
        orderId: uuidv4(),
        productID: product.id,
        userID: userId,
        price: product.price,
        discount: discount,
        payablePrice: payablePrice,
        quantity: quantity,
        date: new Date().toISOString().split('T')[0],
        hour: new Date().toTimeString().slice(0, 8),
        color: color || null,
        product,
      };
      updatedOrders = [...orders, newOrder];
      ShowSwal({
        title: 'سفارش ثبت شد',
        text: 'محصول با موفقیت به سبد خرید اضافه شد',
        icon: 'success',
      });
    }

    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    if (triggerUpdate) {
      triggerUpdate();
    }

    return { success: true, data: updatedOrders[orderIndex !== -1 ? orderIndex : updatedOrders.length - 1] };
  };

  const handleIncrease = () => {
    if (!product) return;
    if (localQuantity >= product.count) {
      ShowSwal({
        title: 'خطا',
        text: 'موجودی محصول کافی نیست',
        icon: 'error',
      });
      return { success: false, error: 'موجودی کافی نیست' };
    }
    setLocalQuantity(localQuantity + 1);
    return { success: true, data: { quantity: localQuantity + 1 } };
  };

  const handleDecrease = () => {
    if (!product) return;
    if (localQuantity <= 1) {
      ShowSwal({
        title: 'خطا',
        text: 'تعداد نمی‌تواند کمتر از 1 باشد',
        icon: 'error',
      });
      return { success: false, error: 'تعداد نمی‌تواند کمتر از 1 باشد' };
    }
    setLocalQuantity(localQuantity - 1);
    return { success: true, data: { quantity: localQuantity - 1 } };
  };

  const handleQuantityChange = (e) => {
    if (!product) return;
    const newQuantity = parseInt(e.target.value, 10);

    if (isNaN(newQuantity) || newQuantity < 1) {
      ShowSwal({
        title: 'خطا',
        text: 'تعداد باید حداقل 1 باشد',
        icon: 'error',
      });
      return;
    }

    if (newQuantity > product.count) {
      ShowSwal({
        title: 'خطا',
        text: 'موجودی محصول کافی نیست',
        icon: 'error',
      });
      return;
    }

    setLocalQuantity(newQuantity);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const existingOrder = orders.find(
      (order) => order.productID === product?.id && order.color === color
    );
    setLocalQuantity(existingOrder ? existingOrder.quantity : 1);
  };

  if (userLoading || loading || productsLoading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }
  if (userError || error || productsError || !product) {
    return <Typography>خطا: {userError || error || productsError || 'محصول یافت نشد'}</Typography>;
  }


  const isInCart = orders.some(
    (order) => order.productID === product.id && order.color === selectedColor
  );

  return (
    <>
      <Box className="single-product dt-sl" sx={{ padding: 3 }}>
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link underline="hover" color="inherit" href="/">
              خانه
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={`/search/${product.categoryID || 'all'}`}
            >
              {product.categoryID || 'همه محصولات'}
            </Link>
            <Typography color="text.primary">{product.title}</Typography>
          </Breadcrumbs>

          <Grid container xs={12} spacing={3} className="single-product-container">
            <Grid item xs={12} md={6} className="product-item product-details">
              <ProductCard>
                <Typography variant="h4" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {product.productDesc ||
                    'Holstee Reflection Cards are a fun way to spark meaningful conversation and deepen relationships with people in your life. Every deck includes 100+ thought-provoking questions centered around mindful themes like Adventure, Creativity, and Resilience. Perfect for use with friends, family, and coworkers.'}
                </Typography>
                <StarRating score={product.popularity} readOnly />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  قیمت: {product.price.toLocaleString()} تومان
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  موجودی: {product.count > 0 ? product.count : 'ناموجود'}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  فروش: {product.sale || 50} عدد
                </Typography>
                {colors.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
                      انتخاب رنگ:
                    </Typography>
                    <div className="color-container" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {colors.map((color, index) => (
                        <ColorChip
                          key={index}
                          color={color}
                          isSelected={selectedColor === color}
                          onClick={() => handleColorSelect(color)}
                        />
                      ))}
                    </div>
                  </Box>
                )}
                {product.count > 0 && (
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 2, fontSize: '18px', padding: '5px' }}>
                      تعداد :
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleIncrease()}
                      disabled={localQuantity >= product.count}
                      sx={{ minWidth: '30px', border: '1px solid #000 !important' }}
                    >
                      +
                    </Button>
                    <input
                      type="number"
                      value={localQuantity}
                      onChange={handleQuantityChange}
                      style={{
                        width: '50px',
                        textAlign: 'center',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                      min="1"
                      max={product.count}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleDecrease()}
                      disabled={localQuantity <= 1}
                      sx={{ minWidth: '30px', border: '1px solid #000 !important' }}
                    >
                      -
                    </Button>
                  </Box>
                )}
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  className="add-to-cart-button"
                  disabled={product.count === 0 || !currentUser?.id}
                  onClick={() => handleAddToCart(product.id, currentUser.id, localQuantity, selectedColor)}
                >
                  {isInCart ? 'به‌روزرسانی سبد' : 'افزودن به سبد خرید'}
                </Button>
              </ProductCard>
            </Grid>
            <Grid item xs={12} md={6} className="product-item product-image">
              <ProductImage src={`/img/products/${product.img}`} alt={product.title} />
            </Grid>
          </Grid>
        </div>
      </Box>
      <ProductComment product={product} />
    </>
  );
}
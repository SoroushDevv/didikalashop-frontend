import { useParams, useNavigate } from 'react-router-dom';
import './SingleProduct.css';
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
import useAllProducts from '../../Hooks/useAllProducts';
import ProductComment from '../ProductComment/ProductComment';
import ShowSwal from '../../Components/ShowSwal/ShowSwal';
import { useCurrentUser } from '../../Hooks/useCurrentUser';
import { useCart } from './../../Contexts/CartContext';
import { v4 as uuidv4 } from 'uuid';

// 🎨 رنگ‌ها
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
  const hexColor = colorMap[color] || '#FFFFFF';
  const lightColors = ['#FFFFFF', '#FFFF00', '#FF69B4', '#C0C0C0', 'transparent'];

  return (
   <Box className="color-chip">
      <div
        className={`color-circle ${isSelected ? "selected" : ""}`}
        style={{ backgroundColor: hexColor }}
        onClick={onClick}
        title={color}
      >
        {isSelected && (
          <CheckOutlinedIcon
            className={`check-icon ${lightColors.includes(hexColor) ? "dark" : "light"}`}
          />
        )}
      </div>
      <Typography variant="body2" className="color-name">
        {color}
      </Typography>
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
}));

export default function SingleProduct() {
  const { order, setOrder, loading, error, triggerUpdate } = useCart();
  const { currentUser } = useCurrentUser();
  const { products, loading: productsLoading } = useAllProducts();
  const { productTitle: encodedTitle } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [localQuantity, setLocalQuantity] = useState(1);

  // 🟢 دریافت محصول بر اساس عنوان
  useEffect(() => {
    if (!products?.length) return;

    const title = encodedTitle ? decodeURIComponent(encodedTitle) : null;
    const foundProduct = products.find(p => p.title === title);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors?.[0] || null);
      setLocalQuantity(1);
    } else {
      ShowSwal({
        title: 'خطا',
        text: 'محصول یافت نشد',
        icon: 'error',
      });
    }
  }, [encodedTitle, products]);

  // 🟡 اگر محصول در سبد بود، مقدار quantity رو از order بگیر
  useEffect(() => {
    if (!order || !product || !selectedColor) return;
    const existingItem = order.items?.find(
      item => item.productID === product.id && item.color === selectedColor
    );
    setLocalQuantity(existingItem ? existingItem.quantity : 1);
  }, [product, selectedColor, order]);


  const handleAddToCart = () => {
    if (!currentUser?.id) {
      return ShowSwal({
        title: 'خطا',
        text: 'ابتدا وارد حساب کاربری شوید',
        icon: 'error',
      });
    }
    if (!product?.id) {
      return ShowSwal({ title: 'خطا', text: 'محصول معتبر نیست', icon: 'error' });
    }
    if (!selectedColor) {
      return ShowSwal({ title: 'خطا', text: 'رنگ را انتخاب کنید', icon: 'error' });
    }

    console.log("order  befor check:", order)
    const activeOrder = order?.isActive && order?.userID === currentUser.id
      ? { ...order }
      : {
        orderId: uuidv4(),
        userID: currentUser.id,
        date: new Date().toISOString().split('T')[0],
        hour: new Date().toTimeString().split(' ')[0],
        isActive: true,
        items: [],
      };

    console.log("active order :", activeOrder)
    const existingIndex = activeOrder.items.findIndex(
      item => item.productID === product.id && item.color === selectedColor
    );

    const discountedPrice = product.price * (1 - (product.discountPercent || 0) / 100);
    const payablePrice = discountedPrice * localQuantity;

    if (existingIndex !== -1) {
      activeOrder.items[existingIndex] = {
        ...activeOrder.items[existingIndex],
        quantity: localQuantity,
        payablePrice,
      };

      localStorage.setItem("order", JSON.stringify(activeOrder))
      triggerUpdate();

      ShowSwal({ title: 'به‌روزرسانی شد', text: 'محصول به‌روزرسانی شد', icon: 'success' });
    } else {
      activeOrder.items.push({
        productID: product.id,
        color: selectedColor,
        quantity: localQuantity,
        price: product.price,
        payablePrice,
        product,
      });
      localStorage.setItem("order", JSON.stringify(activeOrder))
      triggerUpdate();

      ShowSwal({ title: 'افزوده شد', text: 'محصول به سبد خرید اضافه شد', icon: 'success' });
    }

    console.log("active order in else :", activeOrder)
    setOrder(activeOrder);
    triggerUpdate();
  };

  const handleQuantityChange = (type) => {
    if (!product) return;
    if (type === 'increase' && localQuantity < product.count) {
      setLocalQuantity(prev => prev + 1);
    } else if (type === 'decrease' && localQuantity > 1) {
      setLocalQuantity(prev => prev - 1);
    }
  };

  if (loading || productsLoading) return <Typography>در حال بارگذاری...</Typography>;
  if (!product) return <Typography>محصول یافت نشد</Typography>;

  const isInCart = order?.items?.some(
    item => item.productID === product.id && item.color === selectedColor
  );

  return (
    <Box className="single-product-section dt-sl">
      <div className="single-product-container container">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" href="/">خانه</Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>

        <Grid container spacing={3} className="single-product_wrapper">
          <Grid item xs={12} md={6}>
            <div className="product-details-card">
              <Typography variant="h4" className="product-title">{product.title}</Typography>
              <Typography variant="h6" className="product-price">
                قیمت: {product.price.toLocaleString()} تومان
              </Typography>

              {product.colors?.length > 0 && (
                <div className="product-color-selector">
                  <Typography variant="body2" className="color-label">انتخاب رنگ:</Typography>
                  <div className="color-options">
                    {product.colors.map((color, i) => (
                      <ColorChip
                        key={i}
                        color={color}
                        isSelected={selectedColor === color}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="quantity-control">
                <Button onClick={() => handleQuantityChange('increase')}>+</Button>
                <Typography>{localQuantity}</Typography>
                <Button onClick={() => handleQuantityChange('decrease')}>-</Button>
              </div>

              <Button
                variant="contained"
                color="error"
                className="add-to-cart-button"
                disabled={product.count === 0}
                onClick={handleAddToCart}
              >
                {isInCart ? 'به‌روزرسانی سبد' : 'افزودن به سبد خرید'}
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="product-image-wrapper">
              <ProductImage src={`/img/products/${product.img}`} alt={product.title} />
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="product-comment-section">
        <ProductComment product={product} />
      </div>
    </Box>

  );
}

import { useParams, useNavigate } from 'react-router-dom';
import './SingleProductSearch.css';
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
    <div className="bg-white py-8">
      <div className="flex flex-col max-w-[1200px] my-0 mx-auto">
        <Breadcrumbs aria-label="breadcrumb" className='mb-1'>
          <Link underline="hover" color="inherit" href="/">خانه</Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>

        <div spacing={3} className="flex flex-nowrap justify-between gap-8">
          <div className='grid '>
            <div className="bg-white p-8 border rounded-md shadow-md min-w-96">
              <h4  className="font-bold mb-4 text-[#222]">{product.title}</h4>
              <h6  className="font-semibold mb-4 text-[#d32f2f]">
                قیمت: {product.price.toLocaleString()} تومان
              </h6>

              {product.colors?.length > 0 && (
                <div className="mb-1">
                  <p variant="body2" className="mb-2 font-semibold">انتخاب رنگ:</p>
                  <div className="flex flex-wrap gap-6">
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

              <div className="flex items-center gap-6 mb-4">
                <button className='min-w-9 h-9 text-base border rounded-lg border-solid border-[#ccc] bg-[#f5f5f5] transition-all ease-in-out duration-200 hover:bg-[#eee]' onClick={() => handleQuantityChange('increase')}>+</button>
                <h3>{localQuantity}</h3>
                <button className='min-w-9 h-9 text-base border rounded-lg border-solid border-[#ccc] bg-[#f5f5f5] transition-all ease-in-out duration-200 hover:bg-[#eee]' onClick={() => handleQuantityChange('decrease')}>-</button>
              </div>

              <button
            
                className="w-full border rounded-lg font-bold py-7 px-0 text-red-500"
                disabled={product.count === 0}
                onClick={handleAddToCart}
              >
                {isInCart ? 'به‌روزرسانی سبد' : 'افزودن به سبد خرید'}
              </button>
            </div>
          </div>

          <div item xs={12} md={6}>
            <div className="flex justify-center items-center w-96 h-full">
              <img src={`/img/products/${product.img}`} alt={product.title} className='max-w-full h-full border rounded-2xl object-cover'/>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-4 border-t border-solid border-[#eee]">
        <ProductComment product={product} />
      </div>
    </div>

  );
}

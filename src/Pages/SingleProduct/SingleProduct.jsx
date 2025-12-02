import { useParams } from 'react-router-dom';
import './SingleProduct.css';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import StarRating from '../../Components/Rating/StarRating';
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
    <div className="flex flex-col items-center cursor-pointer">
      <div
        className={`w-8 h-8 rounded-full border flex items-center justify-center ${isSelected ? 'ring-2 ring-red-500' : ''
          }`}
        style={{ backgroundColor: hexColor }}
        onClick={onClick}
        title={color}
      >
        {isSelected && (
          <Check size={16} className={lightColors.includes(hexColor) ? 'text-black' : 'text-white'} />
        )}
      </div>
      <span className="text-sm mt-1">{color}</span>
    </div>
  );
};

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
        tempID: uuidv4(),
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

      localStorage.setItem('order', JSON.stringify(activeOrder));
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
      localStorage.setItem('order', JSON.stringify(activeOrder));
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

  if (loading || productsLoading) return <div className="p-4 text-center w-full h-svh">در حال بارگذاری...</div>;
  if (!product) return <div className="p-4 text-center">محصول یافت نشد</div>;

  const isInCart = order?.items?.some(
    item => item.productID === product.id && item.color === selectedColor
  );

  return (
    <div className="single-product-section px-4 py-6">
      <div className="container mx-auto">
        <div className="flex space-x-2 text-gray-600 mb-4 mt-3">
          <a href="/" className="hover:underline">خانه</a>
          <span>/</span>
          <span className="font-semibold text-gray-800">{product.title}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-2 md:justify-between md:items-start shadow">
          <div className="w-96 h-96 bg-white p-4 rounded ">
            <div className='w-full'>
              {product.discountPercent && (
                <div className="text-red-500 font-bold text-xl mb-2">
                  {product.discountPercent}%
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-2">{product.productDesc}</p>
              <p className="text-lg font-semibold mb-4">
                قیمت: {Number(product.price).toLocaleString("fa")} تومان
              </p>

              {product.colors?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">انتخاب رنگ:</p>
                  <div className="flex space-x-2">
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

              <div className="flex items-center mb-4">
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <span className="text-lg text-center p-1">{localQuantity}</span>
                <button
                  onClick={() => handleQuantityChange('decrease')}

                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
              </div>

            </div>


            <div className=' py-2 flex justify-center items-center'>
              <button
                onClick={handleAddToCart}
                disabled={product.count === 0}
                className={` p-2 rounded text-white font-semibold ${product.count === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
                  }`}
              >
                {isInCart ? 'به‌روزرسانی سبد' : 'افزودن به سبد خرید'}
              </button>
            </div>

          </div>

          <div className="w-full md:h-96 rounded">
            <img
              src={`/img/products/${product.img}`}
              alt={product.title}
              className="w-full h-full object-contain p-3"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ProductComment product={product} />
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Grid,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import StarRating from "../../Components/Rating/StarRating";
import { styled } from "@mui/material/styles";
import "./SingleProductSearch.css";
import useAllProducts from "../../Hooks/useAllProducts";
import ProductComment from "../ProductComment/ProductComment";
import ProductCarousel from "../../Components/ProductCarousel/ProductCarousel";
import ShowSwal from "../../Components/ShowSwal/ShowSwal";
import { useCurrentUser } from "../../Hooks/useCurrentUser";
import { useCart } from "./../../Contexts/CartContext";
import { v4 as uuidv4 } from "uuid";

// دیکشنری رنگ‌ها
const colorMap = {
  مشکی: "#000000",
  سفید: "#FFFFFF",
  آبی: "#0000FF",
  قرمز: "#FF0000",
  نقره‌ای: "#C0C0C0",
  خاکستری: "#808080",
  زرد: "#FFFF00",
  صورتی: "#FF69B4",
  قهوه‌ای: "#A52A2A",
  شفاف: "transparent",
  چندرنگ: "#FFFFFF",
  بنفش: "#800080",
  سبز: "#008000",
};

const ColorChip = ({ color, isSelected, onClick }) => {
  const hexColor = colorMap[color] || "#FFFFFF";
  const lightColors = ["#FFFFFF", "#FFFF00", "#FF69B4", "#C0C0C0", "transparent"];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <div
        onClick={onClick}
        style={{
          backgroundColor: hexColor,
          border: `2px solid ${isSelected ? "#000" : "#ccc"}`,
          width: 32,
          height: 32,
          borderRadius: "50%",
          cursor: "pointer",
          position: "relative",
          transition: "transform 0.2s ease-in-out",
          transform: isSelected ? "scale(1.1)" : "scale(1)",
          boxShadow: isSelected ? "0 2px 4px rgba(0,0,0,0.3)" : "none",
        }}
        title={color}
      >
        {isSelected && (
          <CheckOutlinedIcon
            style={{
              color: lightColors.includes(hexColor) ? "#000" : "#fff",
              fontSize: 16,
              position: "absolute",
            }}
          />
        )}
      </div>
      <Typography variant="body2">{color}</Typography>
    </Box>
  );
};

const ProductImage = styled("img")({
  width: "100%",
  minHeight: "100%",
  objectFit: "cover",
});

const ProductCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

export default function SingleProductSearch() {
  const { order, setOrder, loading, error, triggerUpdate } = useCart();
  const { currentUser } = useCurrentUser();
  const { products } = useAllProducts();
  const { productTitle: encodedTitle } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [localQuantity, setLocalQuantity] = useState(1);
  const [colors, setColors] = useState([]);

  // بارگذاری محصول
  useEffect(() => {
    if (products.length === 0) return;
    const productTitle = encodedTitle ? decodeURIComponent(encodedTitle) : null;
    const found = products.find((p) => p.title === productTitle);
    if (!found) {
      ShowSwal({ title: "خطا", text: "محصول یافت نشد", icon: "error" });
      return;
    }
    setProduct(found);
    setColors(found.colors || []);
    setSelectedColor(found.colors?.[0] || null);
  }, [encodedTitle, products]);

  // بررسی مقدار قبلی محصول در order
  useEffect(() => {
    if (!order || !product) return;
    const existingItem = order?.items?.find(
      (item) => item.productID === product.id && item.color === selectedColor
    );
    setLocalQuantity(existingItem ? existingItem.quantity : 1);
  }, [order, product, selectedColor]);

  // افزودن یا بروزرسانی محصول در order
  const handleAddToCart = () => {
    if (!currentUser?.id) {
      ShowSwal({ title: "خطا", text: "ابتدا وارد حساب شوید", icon: "error" });
      return;
    }
    if (!selectedColor) {
      ShowSwal({ title: "خطا", text: "لطفاً رنگ را انتخاب کنید", icon: "error" });
      return;
    }

    const discount = product.discount || 0;
    const discountedPrice = product.price * (1 - discount / 100);
    const payablePrice = discountedPrice * localQuantity;

    // اگر سفارش فعال نداریم → بساز
    let currentOrder = order;
    if (!currentOrder) {
      const now = new Date();
      currentOrder = {
        orderId: uuidv4(),
        userID: currentUser.id,
        date: now.toISOString().split("T")[0],
        hour: now.toTimeString().split(" ")[0],
        isActive: true,
        items: [],
      };
    }

    // بررسی وجود محصول در سفارش
    const existingIndex = currentOrder.items.findIndex(
      (item) => item.productID === product.id && item.color === selectedColor
    );

    let updatedItems;
    if (existingIndex !== -1) {
      updatedItems = currentOrder.items.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: localQuantity, payablePrice }
          : item
      );
      ShowSwal({
        title: "به‌روزرسانی",
        text: "محصول در سبد خرید به‌روزرسانی شد",
        icon: "success",
      });
    } else {
      const newItem = {
        productID: product.id,
        quantity: localQuantity,
        color: selectedColor,
        price: product.price,
        discount,
        payablePrice,
      };
      updatedItems = [...currentOrder.items, newItem];
      ShowSwal({
        title: "موفقیت",
        text: "محصول به سبد خرید اضافه شد",
        icon: "success",
      });
    }

    const updatedOrder = { ...currentOrder, items: updatedItems };
    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
    if (triggerUpdate) triggerUpdate();
  };

  const handleIncrease = () => {
    if (localQuantity < product.count) setLocalQuantity(localQuantity + 1);
    else
      ShowSwal({
        title: "خطا",
        text: "موجودی کافی نیست",
        icon: "error",
      });
  };

  const handleDecrease = () => {
    if (localQuantity > 1) setLocalQuantity(localQuantity - 1);
    else
      ShowSwal({
        title: "خطا",
        text: "حداقل تعداد ۱ است",
        icon: "error",
      });
  };

  if (!product) return <Typography>در حال بارگذاری...</Typography>;

  const isInCart =
    order?.items?.some(
      (item) => item.productID === product.id && item.color === selectedColor
    ) || false;

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
              href={`/search/${product.categoryID || "all"}`}
            >
              {product.categoryID || "همه محصولات"}
            </Link>
            <Typography color="text.primary">{product.title}</Typography>
          </Breadcrumbs>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ProductCard>
                <Typography variant="h4" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {product.productDesc || "توضیحات محصول در دسترس نیست."}
                </Typography>
                <StarRating score={product.popularity} readOnly />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  قیمت: {product.price.toLocaleString()} تومان
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  موجودی: {product.count > 0 ? product.count : "ناموجود"}
                </Typography>

                {colors.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      انتخاب رنگ:
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      {colors.map((color, index) => (
                        <ColorChip
                          key={index}
                          color={color}
                          isSelected={selectedColor === color}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </Box>
                )}

                {product.count > 0 && (
                  <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      تعداد:
                    </Typography>
                    <Button onClick={handleIncrease}>+</Button>
                    <input
                      type="number"
                      value={localQuantity}
                      onChange={(e) => setLocalQuantity(Number(e.target.value))}
                      style={{
                        width: "50px",
                        textAlign: "center",
                        border: "1px solid #ccc",
                      }}
                    />
                    <Button onClick={handleDecrease}>-</Button>
                  </Box>
                )}

                <Button
                  variant="contained"
                  color="error"
                  onClick={handleAddToCart}
                  disabled={product.count === 0 || !currentUser?.id}
                >
                  {isInCart ? "به‌روزرسانی سبد" : "افزودن به سبد خرید"}
                </Button>
              </ProductCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <ProductImage
                src={`/img/products/${product.img}`}
                alt={product.title}
              />
            </Grid>
          </Grid>
        </div>
      </Box>

      <ProductComment product={product} />
    </>
  );
}

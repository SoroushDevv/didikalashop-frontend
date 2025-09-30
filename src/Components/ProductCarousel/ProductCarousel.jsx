import React, { useState, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MostSellsProduct from "../product/Product";
import "./ProductCarousel.css";
import "@splidejs/react-splide/css/core";
import { Link } from "react-router-dom";

// استایل‌های کارت
const ProductCard = styled(Card)(({ theme }) => ({
  minWidth: ({ cardWidth }) => cardWidth,
  minHeight: "415px", // ارتفاع ثابت برای کارت
  margin: theme.spacing(1),
  textAlign: "center",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: ({ cardBackground }) =>
    cardBackground || theme.palette.background.paper,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const DiscountChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#f86b75",
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: "0.6rem",
  "& span": {
    margin: 0,
    padding: "2px 8px",
  },
  zIndex: 1,
}));

const StrikethroughPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  fontSize: "0.9rem",
  marginRight: theme.spacing(1),
}));

const DiscountedPrice = styled(Typography)(({ theme }) => ({
  color: "#000000ff",
  fontWeight: "bold",
  fontSize: "0.9rem",
}));

const splideStyles = {
  width: ({ cardWidth, itemsPerPage }) =>
    `calc(${itemsPerPage * (cardWidth + 10)}px)`,
  margin: "auto",
  direction: "rtl",
  height: "fit-content",
  ".splide__arrow": {
    background: "#f7858d",
    width: 40,
    height: 40,
    borderRadius: "50%",
    boxShadow: 2,
    opacity: 1,
    "&:hover": { background: "#f7858dcc" },
    "& svg": { fill: ({ arrowColor }) => arrowColor || "#ffffff" },
    "&:disabled": { opacity: 0.4 },
  },
  ".splide__arrow--prev": { right: 10 },
  ".splide__arrow--next": { left: 10 },
};

// استایل دات‌های سفارشی
const dotStyles = {
  display: "flex",
  justifyContent: "center",
  gap: 1,
  marginTop: "30px",
  position: "relative",
};

const dotItemStyles = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: ({ inactiveDotColor }) => inactiveDotColor || "#1e1e1e33",
  border: "none",
  cursor: "pointer",
  transition: "width 0.3s ease, border-radius 0.3s ease",
  "&:hover": {
    background: ({ inactiveDotColor }) => `${inactiveDotColor}cc` || "grey.500",
  },
};

const activeDotItemStyles = {
  width: 30,
  height: 8,
  borderRadius: 4,
  background: ({ activeDotColor }) => activeDotColor || "#f7858d",
};

const ProductCarousel = ({
  offers = [],
  products = [],
  cardWidth = 200,
  cardBackground,
  showCategory = true,
  showPrice = true,
  showRating = true,
  showDiscount = true,
  itemsPerPage = 5,
  autoplaySpeed = 5000,
  showPagination = true,
  activeDotColor = "#f7858d",
  inactiveDotColor = "#1e1e1e",
  useMostSellsProduct = false,
  arrowColor = "#ffffff",
  showArrows = true,
  type = "loop",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const splideRef = useRef(null);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (products.length === 0) {
    return <Typography>محصولی برای نمایش وجود ندارد</Typography>;
  }

  const totalDots = Math.ceil(products.length / itemsPerPage);

  const splideOptions = {
    type: products.length < itemsPerPage ? "slide" : type,
    perPage: itemsPerPage,
    perMove: 1,
    gap: 10,
    pagination: false,
    arrows: showArrows && products.length > itemsPerPage,
    autoplay: products.length > itemsPerPage,
    interval: autoplaySpeed,
    pauseOnHover: true,
    focus: 0,
    direction: "rtl",
  };

  const handleSlideChange = (splide) => {
    const newIndex = Math.floor(splide.index / itemsPerPage);
    setCurrentPage(newIndex);
  };

 

  const calculateDiscountedPrice = (price, discountPercent) => {
    if (typeof price !== "number" || typeof discountPercent !== "number") {
      return price;
    }
    return Math.round(price * (1 - discountPercent / 100));
  };

  return (

    <Box
      className="product-carousel-wrapper"
      sx={splideStyles}
      cardWidth={cardWidth || "100%"}
      itemsPerPage={itemsPerPage}
      activeDotColor={activeDotColor}
      inactiveDotColor={inactiveDotColor}
      arrowColor={arrowColor}
    >
      <Splide
        options={splideOptions}
        aria-label="Product Carousel"
        onMoved={handleSlideChange}
        ref={splideRef}
        className="product-carousel-splide"
      >
        {products.map((product) => {
          const productDiscount = product.hasDiscount ? product.discountPercent : 0
          const discountedPrice = productDiscount
            ? calculateDiscountedPrice(product.price, productDiscount)
            : null;

          return (
            <SplideSlide key={product.id} className="product-carousel-slide">
              {useMostSellsProduct ? (
                <MostSellsProduct product={product} />
              ) : (
                <ProductCard
                  className="product-card"
                  cardWidth={cardWidth}
                  cardBackground={cardBackground}
                >



                  <CardMedia
                    component="img"
                    height="180"
                    image={`img/products/${product.img}`}
                    alt={product.title}
                    className="product-card-image"
                  />


                  <CardContent className="product-card-content">
                    <Typography className="product-card-title">
                      <Link
                        to={`/productDetail/${product.title}`}
                        className="product-card-title-link"
                      >
                        {product.title}
                      </Link>
                    </Typography>

                    {showCategory && (
                      <Typography className="product-card-category">
                        {product.category || "کالای فروشگاه"}
                      </Typography>
                    )}

                    {showPrice && (
                      <Box className="product-card-price-box">
                        {productDiscount ? (
                          <>
                            <div className="product-cart-price-box_top">
                              {showDiscount && product.discountPercent && (
                                <DiscountChip
                                  label={`%${product.discountPercent}`}
                                  className="product-card-discount"
                                />
                              )}
                              <StrikethroughPrice className="product-card-price-old">
                                {product.price.toLocaleString("fa-IR")}
                              </StrikethroughPrice>
                            </div>

                            <DiscountedPrice className="product-card-price-discounted">
                              {(product.price - (product.price * (product.discountPercent / 100))).toLocaleString("fa-IR")} تومان
                            </DiscountedPrice>
                          </>
                        ) : (
                          <Typography className="product-card-price">
                            {product.price.toLocaleString("fa-IR")} تومان
                          </Typography>
                        )}
                      </Box>
                    )}

                    <Button className="product-card-details-btn" variant="outlined" size="small">
                      <Link
                        to={`/productDetail/${product.title}`}
                        className="product-card-details-link"
                      >
                        جزئیات
                      </Link>
                    </Button>
                  </CardContent>
                </ProductCard>
              )}
            </SplideSlide>
          );
        })}
      </Splide>
    </Box>
  );

};

export default ProductCarousel;
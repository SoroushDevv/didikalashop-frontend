import React, { useState, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MostSellsProduct from "../product/Product";
import "@splidejs/react-splide/css/core";
import { Link } from "react-router-dom";
import "./ProductCarousel.css";

const ProductCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "260px",
  minHeight: "420px",
  margin: theme.spacing(1),
  textAlign: "center",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "90%",
    minHeight: "auto",
  },
}));

const DiscountChip = styled(Chip)(() => ({
  width:"48px",
  backgroundColor: "#f86b75",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "0.7rem",
  "& span": {
    padding: "2px 6px",
  },
}));

const StrikethroughPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  fontSize: "0.85rem",
}));

const DiscountedPrice = styled(Typography)(() => ({
  color: "#000",
  fontWeight: "bold",
  fontSize: "0.95rem",
}));

const ProductCarousel = ({
  products = [],
  cardWidth = 200,
  itemsPerPage = 5,
  autoplaySpeed = 5000,
  showCategory = true,
  showPrice = true,
  showDiscount = true,
  showArrows = true,
  arrowColor = "#ffffff",
  useMostSellsProduct = false,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const splideRef = useRef(null);

  if (products.length === 0) {
    return <Typography>محصولی برای نمایش وجود ندارد</Typography>;
  }

  const splideOptions = {
    type: products.length < itemsPerPage ? "slide" : "loop",
    perPage: itemsPerPage,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    arrows: showArrows && products.length > itemsPerPage,
    autoplay: products.length > itemsPerPage,
    interval: autoplaySpeed,
    pauseOnHover: true,
    direction: "rtl",
    breakpoints: {
      640: {
        perPage: 1,
        gap: "0.5rem",
      },
      768: {
        perPage: 2,
      },
      1024: {
        perPage: 3,
      },
    },
  };

  const calculateDiscountedPrice = (price, discountPercent) =>
    Math.round(price * (1 - discountPercent / 100));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1300px",
        margin: "auto",
        direction: "rtl",
      }}
    >
      <Splide
        options={splideOptions}
        aria-label="Product Carousel"
        onMoved={(splide) =>
          setCurrentPage(Math.floor(splide.index / itemsPerPage))
        }
        ref={splideRef}
      >
        {products.map((product) => {
          const hasDiscount = product.discountPercent > 0;
          const discountedPrice = hasDiscount
            ? calculateDiscountedPrice(product.price, product.discountPercent)
            : null;

          return (
            <SplideSlide className="h-max pb-4" key={product.id}>
              {useMostSellsProduct ? (
                <MostSellsProduct product={product} />
              ) : (
                <ProductCard className="flex flex-col justify-start items-center gap-4 ">
                  <div className="image-container w-full p-2">
                    <img
                      src={`img/products/${product.img}`}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </div>

                  <CardContent
                  className="flex flex-col justify-between items-start w-full min-h-52 py-0"
             
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: "start", fontWeight: "bold" }}
                    >
                      <Link
                        to={`/productDetail/${product.title}`}
                        className="product-card-title-link"
                      >
                        {product.title}
                      </Link>
                    </Typography>

                    {showCategory && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "start" }}
                      >
                        {product.category || "کالای فروشگاه"}
                      </Typography>
                    )}

                    {showPrice && (
                      <Box
                        className="w-full flex flex-col justify-between items-center"
                      >
                        {hasDiscount ? (
                          <div className="w-full flex flex-col justify-start items-center">
                            <div className="w-full flex flex-row-reverse justify-between items-center">
                              {showDiscount && (
                                <DiscountChip
                                  label={`%${product.discountPercent}`}
                                />
                              )}
                              <StrikethroughPrice>
                                {Number(product.price).toLocaleString("fa-IR")} تومان
                              </StrikethroughPrice>
                            </div>

                            <DiscountedPrice>
                              {discountedPrice.toLocaleString("fa-IR")} تومان
                            </DiscountedPrice>
                          </div>
                        ) : (
                          <Typography>
                            {Number(product.price).toLocaleString("fa-IR")} تومان
                          </Typography>
                        )}
                      </Box>
                    )}

                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        pt: 2,
                      }}
                    >
                      <button className="btn-info">
                        <a href={`/productDetail/${product.title}`} className="w-full">
                          جزئیات
                        </a>

                      </button>
                    </Box>
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

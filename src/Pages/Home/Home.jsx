import React, { useState, useEffect } from "react";
import "./Home.css";

import BrandSlider from "../../Components/BrandSlider/BrandSlider";
import CustomCarousel from "../../Components/Slider/SplideSlider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SplideCategoryCarousel from "../../Components/CategoriesSlider/CategoriesSlider";
import { LargeBanner, SmallBannerList } from "../../Components/Banners/Banners";
import ProductCarousel from "./../../Components/ProductCarousel/ProductCarousel";
import axios from "axios";
import api from "./../../api/axios"
import ErrorMessage from "./../ErrorMessage/ErrorMessage";
import {
  images,
  topSliderAsideImages,
  categoryItems,
  brandImages,
  banners,
} from "../../datas";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [offs, setOffs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mostSaleProducts, setMostSaleProducts] = useState([]);
  const [suggestionProducts, setSuggestionProducts] = useState([]);
  const [mostFavoriteProducts, setMostFavoriteProducts] = useState([]);
  const [fairPriceProducts, setfairPriceProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await api.get("/api/products");
        console.log("products : ", response.data);

        // Filter products based on different criteria
        const mostSale = response.data.filter((product) => product.count > 60);
        const suggestion = response.data.filter(
          (product) => 4000000 < product.price < 10000000
        );
        const mostFavorite = response.data.filter(
          (product) => product.popularity > 100
        );
        const fairPrice = response.data.filter(
          (product) => 0 < product.price < 4000000
        );


        // Set the filtered products to state
        setMostSaleProducts(mostSale);
        setSuggestionProducts(suggestion);
        setMostFavoriteProducts(mostFavorite);
        setfairPriceProducts(fairPrice);
      } catch (error) {
        console.error("Fetching Error : ", error);
      } finally {
        setLoading(false)
      }
    };

    const fetchOffs = async () => {
      const response = await api.get("/api/offs");
      console.log(response)
      setOffs(response.data);
    };


    fetchProducts();
    fetchOffs();


  }, []);

  if (loading) {

    return <CircularProgress size={"3rem"}/>;

  }

  if (error) {
    return <ErrorMessage msg="خطا در بارگذاری سبد خرید" />;
  }


  return (
 <main className="main-content">
  <div className="main-container">
    <Container>
      <div className="home-top-slider">
        <aside className="home-sidebar">
          <div className="home-sidebar-banner">
            <CustomCarousel
              items={topSliderAsideImages}
              options={{
                type: "loop",
                pagination: false,
                arrows: false,
                direction: "rtl",
              }}
            />
          </div>
        </aside>

        <section id="main-slider" className="home-main-slider">
          <CustomCarousel
            items={images}
            options={{
              type: "loop",
              pagination: true,
              arrows: true,
              autoplay: true,
              direction: "rtl",
            }}
          />
        </section>
      </div>

      <Row className="home-products-row">
        <Col sm={10} className="home-grid-item">
          <Row className="home-title-item">
            <div className="home-section-title">
              <h2>پر فروش ترینها</h2>
              <Link to="/most-sales">مشاهده همه</Link>
            </div>
          </Row>
          <Row className="home-product-carousel home-most-sell">
            <ProductCarousel
              offers={offs}
              categorires={categories}
              products={mostSaleProducts}
              cardWidth="100%"
            />
          </Row>
        </Col>

        <Col sm={2} className="home-grid-item">
          <div className="home-widget-suggestion">
            <div className="home-widget-suggestion-title">
              <img src="./img/theme/suggestion-title.png" alt="" />
            </div>
            <div className="home-progress-bar">
              <div className="home-slide-progress"></div>
            </div>
            <div className="home-suggestion-slider">
              <ProductCarousel
                offers={offs}
                categorires={categories}
                products={suggestionProducts}
                itemsPerPage={1}
                autoplaySpeed={3000}
                showPagination={false}
                showArrows={false}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Col className="home-slider-section">
        <Row className="home-title-item">
          <div className="home-section-title">
            <h2>خوش قیمت ترین ها</h2>
            <Link to="/incredible-offers">مشاهده همه</Link>
          </div>
        </Row>
        <Row className="home-product-carousel home-most-sell">
          <ProductCarousel
            offers={offs}
            categorires={categories}
            products={fairPriceProducts}
            cardWidth="100%"
          />
        </Row>
      </Col>

      <div className="home-section-banner">
        <SmallBannerList banners={banners} />
      </div>

      <SplideCategoryCarousel items={categoryItems} />

      <div className="row mt-3 mb-5">
        <div className="col-12">
          <div className="home-large-banner">
            <LargeBanner banners={banners} />
          </div>
        </div>
      </div>

      <section className="home-team-suggestion">
        <Row className="home-title-item">
          <div className="home-section-title">
            <h2>پیشنهاد ما برای شما</h2>
          </div>
        </Row>
        <ProductCarousel products={suggestionProducts} />
      </section>

      <section className="home-slider-section home-brand-slider">
        <Typography className="home-brand-slider-title">
          محبوبترین برند ها
        </Typography>
        <BrandSlider items={brandImages} arrows={false} />
        <BrandSlider items={brandImages} arrows={false} direction="ltr" />
      </section>
    </Container>
  </div>
</main>
  );
}

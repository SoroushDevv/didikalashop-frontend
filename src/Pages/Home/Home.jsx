import React, { useState, useEffect } from "react";
import BrandSlider from "../../Components/BrandSlider/BrandSlider";
import CustomCarousel from "../../Components/Slider/SplideSlider";
import SplideCategoryCarousel from "../../Components/CategoriesSlider/CategoriesSlider";
import { LargeBanner, SmallBannerList } from "../../Components/Banners/Banners";
import ProductCarousel from "./../../Components/ProductCarousel/ProductCarousel";
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
        const response = await api.get("/products");
        console.log("products : ", response.data);

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


        setMostSaleProducts(mostSale);
        setSuggestionProducts(suggestion);
        setMostFavoriteProducts(mostFavorite);
        setfairPriceProducts(fairPrice);
      } catch (error) {
        console.error("Fetching Error : ", error);
        setError("Error fetching products.");
      } finally {
        setLoading(false)
      }
    };

    const fetchOffs = async () => {
      try {
        const response = await api.get("/offs");
        console.log(response)
        setOffs(response.data);
      } catch (error) {
        console.error("Fetching Offs Error : ", error);
      }
    };


    fetchProducts();
    fetchOffs();


  }, []);

  if (loading) {
    return (
      <div className="loading-container w-full h-dvh">
        <CircularProgress size={"3rem"} />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage msg="خطا در بارگذاری اطلاعات" />;
  }


  return (

    <main className="mx-auto">
      <div className="w-full">
        <div className="flex justify-center gap-4 mb-7">

          <aside className="w-1/4">
            <div className="w-full">
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


          <section className="flex justify-center items-center flex-grow-1 max-w-3/4">
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


        <div className="flex flex-row-reverse gap-4 mb-7 justify-start px-4 sm:px-0">
          <div className="flex flex-col w-full md:w-full py-3">
            <div className="w-full">
              <div className="flex justify-between items-center border-b border-solid border-[#eee] pb-2 mb-4">
                <h2 className="title-style mb-0 font-bold text-xl md:text-2xl">پر فروش ترینها</h2>
                <Link
                  to="/category/most-sales"
                  className="btn-info "
                >
                  مشاهده همه
                </Link>
              </div>
            </div>

            <div>
              <ProductCarousel
                offers={offs}
                categorires={categories}
                products={mostSaleProducts}
                cardWidth="100%"
              />
            </div>
          </div>
        </div>

        <div className="w-full py-3">
          <div className="home-title-row">
            <div className="flex justify-between items-center border-b border-solid border-[#eee] pb-2">
              <h2 className="title-style mb-0">خوش قیمت ترین ها</h2>
              <Link to="/category/incredible-offers" className="btn-info" >مشاهده همه</Link>
            </div>
          </div>
          <div>
            <ProductCarousel
              offers={offs}
              categorires={categories}
              products={fairPriceProducts}
              cardWidth="100%"
            />
          </div>
        </div>

        <div className="py-3">
          <SmallBannerList banners={banners} />
        </div>

        <div className="w-full py-3">
          <div className="home-title-row">
            <div className="flex justify-between items-center border-b border-solid border-[#eee] pb-2">
              <h2 className="title-style mb-0"> بیش از ۱،۵۰۰،۰۰۰ کالا در دسته‌بندی‌های مختلف </h2>
            </div>
          </div>
          <div>
            <SplideCategoryCarousel items={categoryItems} />
          </div>
        </div>

        <div className="mx-5 py-3">
          <div className="w-full">
            <LargeBanner banners={banners} />
          </div>
        </div>

        <section className="w-full py-3">
          <div className="mb-4">
            <div className="flex justify-center items-center border-b border-solid border-[#eee] pb-2">
              <h2 className="title-style mb-0">پیشنهاد ما برای شما</h2>
            </div>
          </div>
          <ProductCarousel products={suggestionProducts} />
        </section>

        <section className="hidden md:block py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex justify-center items-center border-b border-solid border-[#eee] pb-2">
              <h3 className="title-style mb-0 text-center">
                محبوبترین برند ها
              </h3>
            </div>

            <div className="space-y-4">
              <BrandSlider items={brandImages} arrows={false} />

              <BrandSlider items={brandImages} arrows={false} direction="ltr" />
            </div>

          </div>
        </section>

     
      </div>
    </main>
  );
}
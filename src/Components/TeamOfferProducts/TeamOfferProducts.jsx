import React from 'react';
import './TeamOfferProducts.css'; // استایل‌ها جدا تعریف شدن
import { Button } from '@mui/material';
import StarRating from '../Rating/StarRating';

const TeamOfferProducts = ({ products }) => {
    
  console.log(products)
  // تقسیم محصولات به 3 گروه برای 3 ستون
  const chunkSize = Math.ceil(products.length / 3);
  const columns = [
    products.slice(0, chunkSize),
    products.slice(chunkSize, 2 * chunkSize),
    products.slice(2 * chunkSize)
  ];

  return (
    <section className="dt-sl dt-sn mb-5">
      <div className="row">
        <div className="col-12">
          <div className="section-title text-sm-title title-wide no-after-title-wide">
            <h2>پیشنهاد ما</h2>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        {columns.map((column, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12 pt-4">
            {column.map((product) => (
              <div key={product.id} className="card-horizontal-product border-bottom rounded-0">
                <div className="card-horizontal-product-thumb">
                  <a href="#">
                    <img src={product.img} alt={product.title} />
                  </a>
                </div>
                <div className="card-horizontal-product-content">
                  <div className="card-horizontal-product-title">
                    <a href="#">
                      <h3>{product.title}</h3>
                    </a>
                  </div>
                  <div className="rating-stars">
                    <StarRating score={product.rating} size="small" showLabel={false} />
                
                  </div>
                  <div className="card-horizontal-product-price">
                    <span>{product.price.toLocaleString()} تومان</span>
                  </div>
                  <div className="card-horizontal-product-buttons">
                  <Button
        className='detail-button'
  variant="contained" // استفاده از variant پرشده برای دکمه خرید
  size="small"
  sx={{
    mt: 1,
    backgroundColor: "#f86b75",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.9rem", 
    padding: "6px 20px", 
    borderRadius: "8px",
    textTransform: "none",
    boxShadow: "0 2px 6px rgba(248, 107, 117, 0.4)", 
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#ff8290",  
      boxShadow: "0 4px 12px rgba(248, 107, 117, 0.5)",  
      transform: "translateY(-1px)", 
    },
    "&:active": {
      backgroundColor: "#e55a64", 
      boxShadow: "0 2px 6px rgba(248, 107, 117, 0.3)",
      transform: "translateY(0)", 
    },
    "&:disabled": {
      backgroundColor: "#f86b7580", 
      color: "#fff",
      opacity: 0.6,
    },
  }}
>
  خرید
</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamOfferProducts;
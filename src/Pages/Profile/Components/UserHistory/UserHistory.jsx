import { useState } from "react";
import "./UserHistory.css"
import { historyProducts } from "../../../../datas";

import ErrorMessage from "../../../ErrorMessage/ErrorMessage";
import StarRating from "../../../../Components/Rating/StarRating";
export default function UserHistory() {
  const [recentProducts, setRecentProducts] = useState(historyProducts);

  return (
    <div className="recent-products">
      <div className="recent-products__header">
        <h2>بازدیدهای اخیر</h2>
      </div>

      <div className="recent-products__list">
        {recentProducts.length ? (
          recentProducts.map((product) => (
            <div className="recent-products__item" key={product.id}>
              <div className="recent-products__card">
                <div className="recent-products__thumb">
                  <a href="#">
                    <img src={product.image} alt={product.name} />
                  </a>
                </div>

                <div className="recent-products__content">
                  <div className="recent-products__title">
                    <a href="#"><h3>{product.name}</h3></a>
                  </div>

                  <div className="recent-products__rating">
                    <StarRating score={product.rating} />
                  </div>

                  <div className="recent-products__price">
                    <span>{product.price.toLocaleString()}</span>
                  </div>

                  <div className="recent-products__buttons">
                    <a href="#" className="btn-similar">کالاهای مشابه</a>
                    <button className="btn-remove">
                      <i className="mdi mdi-trash-can-outline"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <ErrorMessage msg="تاریخچه ای موجود نیست" />
        )}
      </div>
    </div>

  );
}

import React, { useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
type Props = {
  img: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  rate: number;
  id: number;
};

const ProductCard = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const MAX_TITLE_LENGTH = 30;

  const truncateTitle = (title: string) => {
    if (title.length > MAX_TITLE_LENGTH) {
      return title.slice(0, MAX_TITLE_LENGTH) + "...";
    }
    return title;
  };

  // function DiscountPrice(originalPrice: number, discountPercentage: number) {
  //   const discountedPrice =
  //     originalPrice - (originalPrice * discountPercentage) / 100;
  //   return discountedPrice.toFixed(2);
  // };

  function DiscountPrice(
    originalPriceInUSD: number,
    discountPercentage: number
  ) {
    const originalPriceInINR = originalPriceInUSD * 80;
    const discountedPriceInINR =
      originalPriceInINR - (originalPriceInINR * discountPercentage) / 100;
    const formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(discountedPriceInINR);
    return formattedPrice;
  }

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Link
      to={`/products/${props.id}/Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, cum?`}
    >
      <div className="product_carousel_container">
        <div className="product_carousel">
          <div className="card_img">
            <div className="add_to_wishlist_icon">🤍</div>
            <img
              src={
                loading
                  ? "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90"
                  : props.img
              }
              onLoad={handleImageLoad}
              alt=""
              loading="lazy"
            />

            <h5 className="card_description">
              {truncateTitle(props.description)}
            </h5>
            <div className="rating_btn">{props.rating}⭐</div>
            <div
              style={{
                display: "flex",
                gap: "9px",
                padding: "5px",
              }}
            >
              <h5 className="discounted_price">
                {DiscountPrice(props.price, props.discount)}
              </h5>
              <h5 className="card_price">₹{props.price * 80}</h5>
              <h5 style={{ color: "#279EFF" }}>{props.discount}% off</h5>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

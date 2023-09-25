import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SignleProduct.css";
import SingleProductSkeleton from "../../Components/Loading/SingleProductSkeleton";
const SingleProduct = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [img, setImg] = useState<string>("");
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      baseURL: "https://dummyjson.com",
      url: `/products/${id}`,
    })
      .then(({ data }) => {
        setData(data);
        setImg(data.thumbnail);
        console.log(data);
      })
      .catch((err) => console.dir(err))
      .finally(() => setLoading(false));
  }, [id]);

  // function DiscountPrice(originalPrice: number, discountPercentage: number) {
  //   const discountedPrice =
  //     originalPrice - (originalPrice * discountPercentage) / 100;
  //   return discountedPrice.toFixed(2);
  // }

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

  return (
    <>
      {loading ? (
        <SingleProductSkeleton />
      ) : (
        <div className="container_single_product shadow">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {data.images &&
              data?.images.map((imageUrl: string, index: number) => (
                <div
                  style={{
                    border: img === imageUrl ? "2px solid blue" : "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setImg(imageUrl)}
                  key={index}
                >
                  <img
                    style={{ objectFit: "cover" }}
                    src={imageUrl}
                    width="50px"
                    height="50px"
                    alt={`${index}`}
                  />
                </div>
              ))}
          </div>
          <div>
            <div className="product_img">
              <img src={img} alt="" loading="lazy" />
            </div>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "#ff9f00",
                  boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                  color: "#fff",
                  padding: "10px",
                  marginTop: "10px",
                  fontSize: "32px",
                  width: "100%",
                }}
              >
                Add to Cart
              </button>
              <button
                style={{
                  backgroundColor: "#fb641b",
                  boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                  color: "#fff",
                  padding: "10px",
                  marginTop: "10px",
                  fontSize: "32px",
                  width: "100%",
                }}
              >
                Buy Now
              </button>
            </div>
          </div>

          <div className="product_info">
            <h1>{data.title}</h1>
            <div style={{ marginTop: "10px" }}>
              <span
                style={{
                  color: "#fff",
                  backgroundColor: "green",
                  padding: "2px",
                  borderRadius: "4px",
                }}
              >
                {data.rating}
              </span>
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <h1> {DiscountPrice(data.price, data.discountPercentage)}</h1>
              <h4 style={{ color: "gray", textDecoration: "line-through" }}>
                ₹ {data.price * 80}
              </h4>
              <h3 style={{ color: "orange" }}>
                {data.discountPercentage} % Off
              </h3>
            </div>
            {data.stock > 0 ? (
              <div
                style={{
                  padding: "10px",
                  border: "1px solid green",
                  marginTop: "10px",
                }}
              >
                {"In Stock"}
              </div>
            ) : null}
            <div style={{ padding: "10px", marginTop: "10px" }}>
              <div style={{ padding: "10px", marginTop: "10px" }}>
                <h4>Category</h4>
                <p>{data.category}</p>
              </div>
              <div style={{ padding: "10px", marginTop: "10px" }}>
                <h4>Brand</h4>
                <p>{data.brand}</p>
              </div>

              <div style={{ padding: "10px", marginTop: "10px" }}>
                <h4>Description</h4>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;

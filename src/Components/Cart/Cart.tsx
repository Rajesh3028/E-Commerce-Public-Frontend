import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(true);
  const [code, setCode] = useState<number>();
  const [city, setCity] = useState<string>();

  const getPincode = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const userPincode = data?.address.postcode;
          const userCity = data?.address.city;
          setCode(userPincode);
          setCity(userCity);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getPincode();
  }, []);

  return (
    <>
      {cart ? (
        <div className="cart_main mx_auto">
          <div className="cart_container_wraper">
            <div className="cart_container_left">
              <div className="left_cart_heading">
                <h1 className="text_center">Cart</h1>
              </div>
              <div className="left_cart_address">
                <div
                  style={{
                    display: "flex",
                    flex: "3",
                    gap: "5px",
                    borderRadius: "4px",
                    color: "#111112",
                    lineHeight: "20px",
                    marginRight: "5px",
                  }}
                >
                  <div className="">Deliver To : </div>
                  <div>
                    <span className="location_span">
                      {city} - {code}
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <button className="change_btn">Change</button>
                  </div>
                </div>
              </div>
              <div className="cart_products">
                <div className="cart_product_deatails_main">
                  <div
                    style={{
                      width: "112px",
                      height: "112px",
                      position: "relative",
                    }}
                  >
                    <img
                      className="cart_img"
                      src="https://rukminim2.flixcart.com/image/224/224/kxp0mfk0/mini-ups/z/2/w/envibe-12d4-12-v-24-v-guard-original-imaga3ddrkd2wdpn.jpeg?q=90"
                      alt=""
                    />
                  </div>
                  <div className="cart_product_deatails">
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Totam consequuntur odit maxime. Minima, asperiores
                      voluptatem.
                    </div>
                  </div>
                  <div className="cart_product_delivery">
                    Lorem ipsum dolor sit amet.
                  </div>
                </div>
                <div className="qty_container">
                  <div className="qty_btn_container">
                    <div className="qty_btn_inner">
                      <button className="qty_btn">-</button>
                      <div className="qty_count">
                        <input type="text" className="qty_input" />
                      </div>
                      <button className="qty_btn">+</button>
                    </div>
                  </div>
                  <div className="qty_remove">
                    <div className="remove_btn">Remove</div>
                  </div>
                </div>
              </div>
              <div className="cart_products">
                <div className="cart_product_deatails_main">
                  <div
                    style={{
                      width: "112px",
                      height: "112px",
                      position: "relative",
                    }}
                  >
                    <img
                      className="cart_img"
                      src="https://rukminim2.flixcart.com/image/224/224/kxp0mfk0/mini-ups/z/2/w/envibe-12d4-12-v-24-v-guard-original-imaga3ddrkd2wdpn.jpeg?q=90"
                      alt=""
                    />
                  </div>
                  <div className="cart_product_deatails">
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Totam consequuntur odit maxime. Minima, asperiores
                      voluptatem.
                    </div>
                  </div>
                  <div className="cart_product_delivery">
                    Lorem ipsum dolor sit amet.
                  </div>
                </div>
                <div className="qty_container">
                  <div className="qty_btn_container">
                    <div className="qty_btn_inner">
                      <button className="qty_btn">-</button>
                      <div className="qty_count">
                        <input type="text" className="qty_input" />
                      </div>
                      <button className="qty_btn">+</button>
                    </div>
                  </div>
                  <div className="qty_remove">
                    <div className="remove_btn">Remove</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart_container_right">
              <div>
                <span className="price_span">price deatails</span>
              </div>
              <div className="price_container">
                <div className="price_items">
                  <div className="price_item">
                    <div className="price_item_heading">
                      <div>Price (1 item)</div>
                    </div>
                  </div>
                  <div>
                    <span>₹3,650</span>
                  </div>
                </div>
              </div>
              <div className="price_container">
                <div className="price_items">
                  <div className="price_item">
                    <div className="price_item_heading">
                      <div>Discount</div>
                    </div>
                  </div>
                  <div>
                    <span> - ₹1801</span>
                  </div>
                </div>
              </div>
              <div className="price_container">
                <div className="price_items">
                  <div className="price_item">
                    <div className="price_item_heading">
                      <div>Delivery Charges</div>
                    </div>
                  </div>
                  <div>
                    <span>Free</span>
                  </div>
                </div>
              </div>
              <div className="price_container">
                <div className="price_items">
                  <div className="price_item">
                    <div className="price_item_heading">
                      <div>Total Amount</div>
                    </div>
                  </div>
                  <div>
                    <span>₹ 1849</span>
                  </div>
                </div>
              </div>
              <div className="price_container">
                <div className="price_items">
                  <div className="price_saved">
                    You will save ₹1,801 on this order
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart_container mx_auto">
          <div className="cart_header">
            <h1 className="text_center">Cart</h1>
          </div>
          <div className="cart_body">
            <div className="empty_cart">
              <img
                src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                alt=""
              />
              <div className="empty_cart_missing">Missing Cart items?</div>
              <div className="empty_cart_login">
                Login to see the items you added previously
              </div>
              <button className="login_btn_cart">
                <span style={{ fontSize: "14px", cursor: "pointer" }}>
                  Login
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

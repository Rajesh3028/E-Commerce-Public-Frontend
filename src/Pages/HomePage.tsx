import React, { useState, useEffect } from "react";
import { useAppSelector } from "../Store/store";
import { Category } from "../Data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "../Components/ProductCard/ProductCard";
import axios from "axios";
import "./HomePage.css";
import CardSkeleton from "../Components/Loading/CardSkeleton";
import FilterSection from "../Components/FilterSection";

const HomePage = () => {
  const Users = useAppSelector((state) => state.users.users);
  console.log(Users);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  

  

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      baseURL: "https://dummyjson.com",
      url: `/products/${''}/${''}`,
    })
      .then(({ data }) => {
        setData(data.products);
        console.log(data);
      })
      .catch((err) => console.dir(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section>
        <div className="container">
          {Category.map((e) => (
            <div className="card" key={e.id}>
              <div className="card_header">
                <img src={e.img} alt="" />
              </div>
              <div className="card_body">
                <h4>{e.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="carousel_container">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            showArrows={true}
            interval={5000}
            transitionTime={500}
            swipeable={true}
            dynamicHeight={true}
            centerSlidePercentage={50}
            emulateTouch={true}
          >
            <div>
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/844/140/image/05adcdf765d309fd.jpg?q=50"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/844/140/image/5d7b3930dbada2c4.jpg?q=50"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/844/140/image/8e5e402be1f8e7b1.jpg?q=50"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/844/184/image/8a89ee09acc1a9e5.jpg?q=50"
                alt=""
              />
            </div>
          </Carousel>
        </div>
      </section>

      <section>
        <div className="main_grid mx_auto margin_bt">
          <div className="div_1">
              <section>
              <FilterSection/>
              </section>
          </div>
          <div className="div_2">
            <section>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                {/* <CardSkeleton noCard={2}/> */}
                
                {loading ? (
                  <CardSkeleton noCard={10}  />
                ) : (
                  data
                    ?.slice(page * 10 - 10, page * 10)
                    .map((e) => (
                      <ProductCard
                        discount={e.discountPercentage}
                        id={e.id}
                        key={e.id}
                        img={e.thumbnail}
                        description={e.title}
                        price={e.price}
                        rating={e.rating}
                        rate={e.rating.count}
                      />
                    ))
                )}
              </div>
              {data && data.length > 10 ? (
                <div className="pagination_container mx_auto">
                  <button
                    className="pagination_btn"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    PREV
                  </button>
                  {[...Array(data.length / 10)].map((_, i) => {
                    return (
                      <button
                        key={i}
                        className={
                          page === i + 1
                            ? "pagination_btn_active"
                            : "pagination_btn"
                        }
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    );
                  })}

                  <button
                    className="pagination_btn"
                    onClick={() => setPage(page + 1)}
                    disabled={page === data.length / 10}
                  >
                    NEXT
                  </button>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

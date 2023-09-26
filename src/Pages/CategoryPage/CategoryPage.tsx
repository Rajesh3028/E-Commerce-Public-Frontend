import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilterSection from "../../Components/FilterSection";
import CardSkeleton from "../../Components/Loading/CardSkeleton";
import ProductCard from "../../Components/ProductCard/ProductCard";

const CategoryPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      baseURL: "https://dummyjson.com",
      url: `/products/category/${id}`,
    })
      .then(({ data }) => {
        setData(data.products);
        console.log(data);
      })
      .catch((err) => console.dir(err))
      .finally(() => setLoading(false));
  }, [id]);
  return (
    <div>
      <section>
        <div className="main_grid mx_auto margin_bt">
          <div className="div_1">
            <section>
              <FilterSection />
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
                  <CardSkeleton noCard={10} />
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
    </div>
  );
};

export default CategoryPage;

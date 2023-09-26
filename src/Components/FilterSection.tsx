import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const FilterSection = () => {
  const [category, setCategory] = useState<string[]>();
  function fetchCategory() {
    axios({
      method: "GET",
      baseURL: "https://dummyjson.com/products",
      url: "/categories",
    }).then(({ data }) => {
      setCategory(data);
    });
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "4px",
        marginTop: "10px",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <div>
        <h1 className="text_center">Filter Section</h1>
        {category?.map((item, index) => {
          return (
            <Link
              to={`/category/${item}`}
              key={index}
              replace
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button
                style={{
                  margin: "5px 5px",
                  outline: "none",
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  padding: "7px 10px",
                  color: "#2874f0",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                {item}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;

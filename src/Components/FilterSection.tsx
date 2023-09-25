import axios from "axios";
import React, { useEffect, useState } from "react";

const FilterSection = () => {
  const [category, setCategory] = useState<string[]>();
  function fetchCategory() {
    axios({
      method: "GET",
      baseURL: "https://dummyjson.com/products",
      url: "/categories",
    }).then(({ data }) => {
      setCategory(data);
      console.log(data);
    });
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <h1>Filter Section</h1>
        {category?.map((item, index) => {
          return <button>{item}</button>;
        })}
      </div>
    </div>
  );
};

export default FilterSection;

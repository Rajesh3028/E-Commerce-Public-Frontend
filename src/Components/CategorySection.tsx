import React from "react";

import { Link } from "react-router-dom";

type Props = {
  img: string;
  name: string;
  url: string;
};

const CategorySection = (props: Props) => {
  return (
    <div>
      <Link to={`/category/${props.url}`}>
        <div className="card">
          <div className="card_header">
            <img src={props.img} alt="" />
          </div>
          <div className="card_body">
            <h4>{props.name}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategorySection;

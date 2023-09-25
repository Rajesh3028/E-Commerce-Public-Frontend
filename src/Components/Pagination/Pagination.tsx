import React from 'react';

type PaginationProps = {
  data: any[];
  page: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    props.data && props.data.length > 10 ? (
      <div className="pagination_container mx_auto">
        <button
          style={{ borderRadius: "50%", fontWeight: "bold" }}
          className="change_btn"
          onClick={() => props.setPage(props.page - 1)}
          disabled={props.page === 1}
        >
          &#8249;
        </button>
        {[...Array(Math.ceil(props.data.length / 10))].map((_, i) => {
          return (
            <button
              key={i}
              className={
                props.page === i + 1
                  ? "pagination_btn_active"
                  : "pagination_btn"
              }
              onClick={() => props.setPage(i + 1)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          style={{ borderRadius: "50%", fontWeight: "bold" }}
          className="change_btn"
          onClick={() => props.setPage(props.page + 1)}
          disabled={props.page === Math.ceil(props.data.length / 10)}
        >
          &#8250;
        </button>
      </div>
    ) : null
  );
};

export default Pagination;

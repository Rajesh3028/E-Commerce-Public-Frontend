import React from "react";

const SingleProductSkeleton = () => {
  return (
    <div className="shadow"
      style={{
        height: "80vh",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "grid",
        gridTemplateColumns: "1fr 5fr 6fr",
        gap: "20px",
        color: "#fff",
        marginTop: "10px",
      }}
    >
      <div
        className="skeleton"
        style={{
          backgroundColor: "#ccc",
          height: "60%",
          padding: "2px",
          marginTop: "17px",
          borderRadius: "3px",
          marginLeft:'18px'
          
        }}
      />
      <div style={{ backgroundColor: "#fff",marginTop: "10px", padding:'10px'}}>
        <div
          className="skeleton"
          style={{
            backgroundColor: "#ccc",
            height: "60%",
            padding: "10px",
            borderRadius: "3px",
          }}
        />
        <div
          className="skeleton"
          style={{
            backgroundColor: "#ccc",
            height: "30%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "3px",
          }}
        />
      </div>
      <div style={{ backgroundColor: "#fff", padding: "10px" }}>
        <div
          className="skeleton"
          style={{
            backgroundColor: "#ccc",
            height: "5%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "3px",
          }}
        />

        <div
          className="skeleton"
          style={{
            backgroundColor: "#ccc",
            height: "2%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "3px",
          }}
        />
        <div
          className="skeleton"
          style={{
            backgroundColor: "#ccc",
            height: "5%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "3px",
          }}
        />
        <div
          className="skeleton"
          style={{
            backgroundColor: "#ccc",
            height: "65%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "3px",
          }}
        />
      </div>
    </div>
  );
};

export default SingleProductSkeleton;

import React from "react";

type Props = {
  noCard: number;
};

const CardSkeleton = (props: Props) => {
  const mapped = Array.from({ length: props.noCard }).map((_, index) => {
    return (
      <div
        className="shadow"
        key={index}
        style={{
          width: "250px",
          height: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="skeleton"
          style={{
            width: "90%",
            height: "30px",
            backgroundColor: "#ccc",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "5px",
            borderRadius: "3px",
          }}
        ></div>
        <div
          className="skeleton"
          style={{
            height: "190px",
            width: "90%",
            backgroundColor: "#ccc",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "3px",
          }}
        ></div>
        <div
          className="skeleton"
          style={{
            width: "90%",
            height: "10px",
            backgroundColor: "#ccc",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2px",
            borderRadius: "3px",
          }}
        />
        <div
          className="skeleton"
          style={{
            width: "90%",
            height: "10px",
            backgroundColor: "#ccc",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2px",
            borderRadius: "3px",
          }}
        />
        <div
          className="skeleton"
          style={{
            width: "90%",
            height: "10px",
            backgroundColor: "#ccc",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "3px",
          }}
        />
      </div>
    );
  });

  return (
    <>
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
        {mapped}
      </div>
    </>
  );
};

export default CardSkeleton;

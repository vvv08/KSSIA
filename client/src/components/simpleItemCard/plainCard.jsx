import React from "react";
import "./plainCard.scss";

const PlainCard = (props) => {
    const name = props.data.product_name;
    const image = props.data.product_image;
  return (
    <>
      <div className="plainCardWrapper">
        <div className="plainCardContainer">
          <div className="plainCardTop">
            <img src={image} />
          </div>
          <div className="plainCardBottom">
            <p>{name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlainCard;

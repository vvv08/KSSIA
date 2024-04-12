import React from "react";
import { Link } from 'react-router-dom';
import "./itemCard.scss";

const ItemCard = (props) => {
  const image = props.details.image;
  const cardTitle = props.details.name;
  return (
    <>
      <Link to = {props.href} style={{textDecoration:"none"}}>
        <div className="itemCardWrapper">
          <div className="itemCardContainer">
            <div className="itemCardTop">
              <img src={image} />
            </div>
            <div className="itemCardBottom">
              <p>{cardTitle}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ItemCard;

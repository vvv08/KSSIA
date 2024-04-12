import React from "react";
import "./searchProducts.scss";
import ItemCard from "../../itemCard/itemCard";

const SearchProducts = (props) => {
  return (
    <>
      <div className="searchProductsWrapper">
        <div className="searchProductsContainer">
          {props.data[0] ? (
            <div className="searchProductsContent">
              {props.data.map((obj, index) => {
                return <ItemCard key={index} details={obj} href = {`/productCompanies/${obj.name}/${obj.id}`}/>;
              })}
            </div>
          ) : (
            <div className="searchProductsContentError">
              <p>No products for "{props.search}"</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchProducts;

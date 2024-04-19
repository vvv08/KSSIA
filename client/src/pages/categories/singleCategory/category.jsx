import React, { useEffect, useState } from "react";
import "./category.scss";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import ItemsList from "../../../components/itemsList/itemsList";
import { useParams } from "react-router-dom";
import { getProductsFromCategory } from "../../../repository/productsRepository";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

const Category = (props) => {
  const { categoryName, categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getProductsFromCategory(categoryId)
      .then((result) => {
        setProducts(result);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="categoryWrapper">
        <div className="categoryHeader">
          <Link to="/ourCategories" style={{ textDecoration: "none" }}>
            <span>
              <ArrowBackIosNewIcon />
              Back
            </span>
          </Link>
          <h2>{categoryName}</h2>
        </div>
        {!isLoading ? (
          (products[0] ? <ItemsList
            name={categoryName}
            href={"/productCompanies"}
            data={products}
            back={"/ourCategories"}
          /> : <div className="singleCategoryContent">
            <p className="singleCategoryContentError">Sorry no products</p>
          </div>)
        ) : (
          <div className="singleCategoryContent">
            <p className="singleCategoryContentLoading">Loading ...</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Category;

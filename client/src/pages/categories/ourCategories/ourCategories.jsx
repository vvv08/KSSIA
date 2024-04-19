import React, { useEffect, useState } from "react";
import "./ourCategories.scss";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import ItemsList from "../../../components/itemsList/itemsList";
import { getAllCategories } from "../../../repository/categoriesRepository";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

const OurCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getAllCategories()
      .then((result) => {
        setCategories(result);
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
      <Navbar current_tab={"categories"} />
      <div className="ourCategoriesWrapper">
        <div className="ourCategoriesHeader">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>
              <ArrowBackIosNewIcon />
              Back
            </span>
          </Link>
          <h2>Our Categories</h2>
        </div>
        {!isLoading ? (
          <ItemsList
            name={"Our Product Categories"}
            data={categories}
            href={"/category"}
            back={"/"}
          />
        ) : (
          <div className="ourCategoriesContent">
            <p className="ourCategoriesContentLoading">Loading ...</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OurCategories;

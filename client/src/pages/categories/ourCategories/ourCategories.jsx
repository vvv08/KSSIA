import React, { useEffect, useState } from 'react';
import './ourCategories.scss';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import ItemsList from '../../../components/itemsList/itemsList';
import { getAllCategories } from '../../../repository/categoriesRepository';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from 'react-router-dom';

const OurCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then((result) => {
      setCategories(result)
    })
  },[])

  return (
    <>
    <Navbar current_tab={"categories"}/>
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
      <ItemsList name = {"Our Product Categories"} data = {categories} href = {'/category'} back= {'/'}/>
    </div>
    <Footer/>
  </>
  )
}

export default OurCategories

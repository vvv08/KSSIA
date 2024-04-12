import React from "react";
import './addProduct.scss';
import { useNavigate } from 'react-router-dom';
import AddProductForm from "../../../../components/admin/products/addProduct/addProduct";

const AddProduct = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="kssia_addProductWrapper">
        <div className="kssia_addProductContainer">
          <div className="kssia_addProductBackBtn">
            <button
              onClick={() => {
                navigate("/admin/products");
              }}
              className="kssia_adminDeleteButton"
            >
              Back
            </button>
          </div>
          <h1>Add Product</h1>
          <AddProductForm/>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

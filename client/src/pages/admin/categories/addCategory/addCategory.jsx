import React from "react";
import "./addCategory.scss";
import { useNavigate } from 'react-router-dom';
import AddCategoryForm from "../../../../components/admin/categories/addCategory/addCategory";

const AddCategory = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="kssia_addCategoryWrapper">
        <div className="kssia_addCategoryContainer">
          <div className="kssia_addCategoryBackBtn">
            <button
              onClick={() => {
                navigate("/admin/categories");
              }}
              className="kssia_adminDeleteButton"
            >
              Back
            </button>
          </div>
          <h1>Add Category</h1>
          <AddCategoryForm/>
        </div>
      </div>
    </>
  );
};

export default AddCategory;

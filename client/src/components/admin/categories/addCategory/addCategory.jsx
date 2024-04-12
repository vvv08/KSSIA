import React, { useState } from "react";
import "./addCategory.scss";
import { addCategory } from "../../../../repository/categoriesRepository";
import { useNavigate } from 'react-router-dom';

const AddCategoryForm = () => {
    const navigate = useNavigate();
    const [isLoading,setIsloading] = useState(false);
    const [inputs, setInputs] = useState({
        category_name:"",
        category_image:null
    })
    const handleInputChange = (e) => {
        switch(e.target.id){
            case "category_name":{
                setInputs((state) => ({...state,category_name:e.target.value}))
                break
            }
            case "category_image": {
                const file = e.target.files[0];
                if (file && file.size <= 4 * 1024 * 1024) {
                  setInputs((state) => ({
                    ...state,
                    category_image: e.target.files[0],
                  }));
                } else {
                  alert("Please choose an image file smaller than 4MB.");
                  e.target.value = null; // Reset the file input
                }
                break;
              }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsloading(true)
        addCategory(inputs).then((result) => {
            alert("Category added successfully")
            navigate('/admin/categories')
        }).catch((err) => {
            navigate('/admin/categories')
        }).finally(() => {
            setIsloading(false)
        })
    }
  return (
    <>
      <div className="kssia_addCategoryFormWrapper">
        <div className="kssia_addCategoryFormContainer">
          <form onSubmit={handleSubmit}>
            <div className="kssia_addCategoryForm_1">
              <label htmlFor="category_name">Category name</label>
              <input
                id="category_name"
                onChange={handleInputChange}
                value={inputs.category_name}
                type="text"
                required
              />
            </div>
            <div className="kssia_addCategoryForm_7">
              <label htmlFor="category_image">Category Image :</label>
              <p>
                (allowed : ".png", ".jpg", ".jpeg", ".gif",".webp") | size
                should be less than 4Mb
              </p>
              <div className="kssia_addCategoryForm_7_image">
                <input
                  id="category_image"
                  onChange={handleInputChange}
                  type="file"
                  accept="image/*"
                  required
                />
                {inputs.category_image && (
                  <img
                    src={URL.createObjectURL(inputs.category_image)}
                    alt={inputs.category_name}
                  />
                )}
              </div>
            </div>

            <div className="kssia_formSubmitContainer">
              <button
                type="submit"
                className={
                  isLoading
                    ? "kssia_formSubmitButton_processing"
                    : "kssia_formSubmitButton"
                }
                disabled={isLoading}
              >
                {isLoading ? "adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategoryForm;

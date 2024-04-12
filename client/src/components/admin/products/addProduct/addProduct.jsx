import React, { useEffect, useState } from "react";
import "./addProduct.scss";
import { getAllCategoriesAdmin } from "../../../../repository/categoriesRepository";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { addProduct } from "../../../../repository/productsRepository";

const AddProductForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryState, setCategoryState] = useState("");
  const [inputs, setInputs] = useState({
    product_name: "",
    product_image: null,
    categories: [],
  });

  const addCategory = (e) => {
    e.preventDefault();
    if (!categoryState || categoryState == 0) return;
    setInputs((state) => {
      if (!state.categories.includes(categoryState)) {
        return {
          ...state,
          categories: [...state.categories, categoryState],
        };
      } else {
        return state;
      }
    });
    setCategoryState("");
  };

  const removeCategory = (item) => {
    setInputs((state) => {
      return {
        ...state,
        categories: state.categories.filter((i) => i !== item),
      };
    });
  };

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "product_name": {
        setInputs((state) => ({ ...state, product_name: e.target.value }));
        break;
      }
      case "product_image": {
        const file = e.target.files[0];
        if (file && file.size <= 4 * 1024 * 1024) {
          setInputs((state) => ({
            ...state,
            product_image: e.target.files[0],
          }));
        } else {
          alert("Please choose an image file smaller than 4MB.");
          e.target.value = null; // Reset the file input
        }
        break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addProduct({...inputs}).then((result) => {
        alert("Product added succesfully")
        navigate('/admin/products')
    }).catch((err) => {
        alert("Something went wrong")
        navigate('/admin/products')
    }).finally(() => {
        setIsLoading(false)
    })
  };

  useEffect(() => {
    getAllCategoriesAdmin()
      .then((result) => {
        setCategories(result);
      })
      .catch((err) => {
        navigate("admin/products");
      });
  }, []);

  return (
    <>
      <div className="kssia_addProductFormWrapper">
        <div className="kssia_addProductFormContainer">
          <form onSubmit={handleSubmit}>
            <div className="kssia_addProductForm_1">
              <label htmlFor="product_name">Product name</label>
              <input
                id="product_name"
                value={inputs.product_name}
                onChange={handleInputChange}
                type="text"
                required
              />
            </div>
            <div className="kssia_addProductForm_category">
              <label htmlFor="category">Choose categories</label>
              {categories && (
                <select
                  id="category"
                  type="text"
                  required
                  onChange={(e) => {
                    setCategoryState(e.target.value);
                  }}
                >
                  <option value={0}>Select</option>
                  {categories.map((obj) => {
                    return (
                      <option value={obj.id} key={obj.id}>
                        {obj.name}
                      </option>
                    );
                  })}
                </select>
              )}
              <button
                className="kssia_adminViewButton_v2"
                onClick={addCategory}
              >
                Add
              </button>
            </div>
            {inputs.categories && (
              <div className="selectedListWrapper">
                <div className="selectedListContainer">
                  {inputs.categories.map((obj) => {
                    return (
                      <div className="selectedListCard" key={obj}>
                        <p>{categories.filter(c => c.id==obj)[0].name}</p>
                        <span>
                          <CloseIcon
                            className="selectedListClose"
                            onClick={() => {
                              removeCategory(obj);
                            }}
                          />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="kssia_addProductForm_7">
              <label htmlFor="product_image">Product Image :</label>
              <p>
                (allowed : ".png", ".jpg", ".jpeg", ".gif",".webp") | size
                should be less than 4Mb
              </p>
              <div className="kssia_addProductForm_7_image">
                <input
                  id="product_image"
                  onChange={handleInputChange}
                  type="file"
                  accept="image/*"
                  required
                />
                {inputs.product_image && (
                  <img
                    src={URL.createObjectURL(inputs.product_image)}
                    alt={inputs.product_name}
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
                {isLoading ? "adding..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;

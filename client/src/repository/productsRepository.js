import makeRequest from "../utils/axios";

export const getProductsFromCategory = async (category_id) => {
  try {
    const result = await makeRequest.get(`/products?categoryId=${category_id}`);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};

//APIs for admin
//To fetch all products
export const getAllProductsAdmin = async () => {
  try {
    const result = await makeRequest.get("/products/admin/products", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    return err.response.data;
  }
};

//To add a new product
export const addProduct = async (product) => {
  try {
    console.log("Before: ", product);
    let formData = new FormData();
    product.categories = JSON.stringify(product.categories);
    for (let key in product) {
      formData.append(key, product[key]);
    }
    const result = await makeRequest.post(
      "/products/admin/addProduct",
      formData,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log("After: ", result.data);
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To delete a product
export const deleteProduct = async (product_id) => {
  try {
    const result = await makeRequest.post(
      "/products/admin/deleteProduct",
      {
        product_id: product_id,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log("Deleted: ",result.data)
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

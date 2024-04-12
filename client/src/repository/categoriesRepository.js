import makeRequest from "../utils/axios";

//To fetch all categories in a random order
export const getAllCategories = async () => {
  try {
    const result = await makeRequest.get("/categories");
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};

//APIs for admin
//To fetch all categories
export const getAllCategoriesAdmin = async () => {
  try {
    const result = await makeRequest.get("/categories/admin/categories", {
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

//To add a category
export const addCategory = async (category_details) => {
  try {
    console.log("before : ", category_details);
    let formData = new FormData();
    for (let key in category_details) {
      formData.append(key, category_details[key]);
    }
    const result = await makeRequest.post(
      "/categories/admin/addCategory",
      formData,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log("after : ", result.data);
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To delete a category
export const deleteCategory = async (category_id) => {
  try {
    const result = await makeRequest.post(
      `/categories/admin/deleteCategory`,
      {
        category_id: category_id,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log("Deleted: ", result.data)
  } catch (err) {
    console.log("Error: ", err);
    throw err
  }
};

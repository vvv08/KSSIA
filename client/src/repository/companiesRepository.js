import makeRequest from "../utils/axios";

//To fetch all companies for companies tab
export const getAllCompanies = async (district) => {
  try {
    const result = await makeRequest.get(`/companies?district=${district}`);
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};

//To fetch data of single company
export const getAboutCompany = async (company_id) => {
  try {
    const result = await makeRequest.get(
      `/companies/aboutCompany?companyId=${company_id}`
    );
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};

//To fetch companies by products
export const getCompaniesByproduct = async (product_id, district) => {
  try {
    const result = await makeRequest.get(
      `/companies/productCompanies?productId=${product_id}&district=${district}`
    );
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};

//Admin APIs
//To fetch all companies
export const getAllCompaniesAdmin = async () => {
  try {
    const result = await makeRequest.get("/companies/admin/companies", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To add a new company
export const addCompanyAdmin = async (comp_details) => {
  try {
    console.log("before : ", comp_details);
    let formData = new FormData();
    for (let key in comp_details) {
      formData.append(key, comp_details[key]);
    }
    const result = await makeRequest.post("/companies/admin/add", formData, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    console.log("after : ", result.data);
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To delete a company
export const deleteCompany = async (comp_id) => {
  try {
    const result = await makeRequest.post(
      "/companies/admin/delete",
      { comp_id: comp_id },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Edit
//To fetch company details for edit
export const getEditCompDetails = async (comp_id) => {
  try {
    const result = await makeRequest.get(
      `/companies/admin/GetEditCompany?companyId=${comp_id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//Editing the company
export const editCompany = async (comp_details) => {
  try {
    console.log("before : ", comp_details);
    let formData = new FormData();
    for (let key in comp_details) {
      formData.append(key, comp_details[key]);
    }
    const result = await makeRequest.post(
      "/companies/admin/editCompany",
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

//To fetch data of single company
export const getAboutCompanyAdmin = async (company_id) => {
  try {
    const result = await makeRequest.get(
      `/companies/admin/aboutCompany?companyId=${company_id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To get unlinked products for a company
export const getAllProductsLink = async (comp_id) => {
  try {
    const result = await makeRequest.get(
      `/companies/admin/unlinked?companyId=${comp_id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To unlink a product to a company
export const unlinkProduct = async (comp_id, product_id) => {
  try {
    const result = await makeRequest.post(
      "/companies/admin/unlinkProduct",
      {
        comp_id: comp_id,
        product_id: product_id,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

//To link a product to a company
export const linkProduct = async (comp_id, product_id) => {
  try {
    const result = await makeRequest.post(
      "/companies/admin/linkProduct",
      {
        comp_id: comp_id,
        product_id: product_id,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return result.data
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

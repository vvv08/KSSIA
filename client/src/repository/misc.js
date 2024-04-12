import makeRequest from "../utils/axios";

//API to fetch districts
export const getDistricts = async () => {
  try {
    const result = await makeRequest.get("/misc/districts");
    return result.data;

  } catch (err) {
    console.log("Error: ", err);
    throw err
  }
};

//API to fetch districts in admin panel with token verification
export const getDistrictsAdmin = async () => {
  try {
    const result = await makeRequest.get("/misc/districts/admin", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return result.data;

  } catch (err) {
    console.log("Error: ", err);
    throw err
  }
};

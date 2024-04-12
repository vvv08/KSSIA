import React, { useEffect, useState } from "react";
import "./categoryList.scss";
import AdminHeader from "../../../../components/admin/header/adminHeader";
import { deleteCategory, getAllCategoriesAdmin } from "../../../../repository/categoriesRepository";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (category_id) => {
    deleteCategory(category_id).then((result) => {
      alert("Category deleted")
      navigate('/admin')
    }).catch((err) => {
      alert("Something went wrong")
      navigate('/admin')
    })
  }
  useEffect(() => {
    getAllCategoriesAdmin().then((result) => {
      if (result.status === "authenticationError") {
        navigate("/admin/login");
      } else {
        setTableData(result);
        //new DataTable("#example");
        $(document).ready(function () {
          $("#example").DataTable();
        });
      }
    });
  }, []);
  return (
    <>
      <div className="adminCategoryListWrapper">
        <div className="adminCategoryListContainer">
          <AdminHeader
            name={"Categories"}
            button_one={"Products"}
            button_one_url={"/admin/products"}
            button_two={"Companies"}
            button_two_url={"/admin"}
            button_three={"Category"}
            button_three_url={"/admin/addCategory"}
          />
        </div>
        <div className="adminCategoryListTable">
          {tableData[0] && (
            <table
              id="example"
              className="table table-striped"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((obj) => {
                  return (
                    <tr scope = "row" key={obj.id}>
                      <td>{obj.id}</td>
                      <td>{obj.name}</td>
                      <td><img src={obj.image} alt={obj.name} /></td>
                      <td><button type="button" className="kssia_adminDeleteButton" onClick={() => {handleDelete(obj.id)}}>Delete</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryList;

import React, { useEffect, useState } from "react";
import "./productList.scss";
import AdminHeader from "../../../../components/admin/header/adminHeader";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getAllProductsAdmin,
} from "../../../../repository/productsRepository";

const ProductList = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (product_id) => {
    if (confirm("Are you sure?")) {
      deleteProduct(product_id)
        .then((result) => {
          alert("Product deleted")
          navigate('/admin')
        })
        .catch((err) => {
          alert("Something went wrong");
          navigate("/admin");
        });
    }
  };
  useEffect(() => {
    getAllProductsAdmin().then((result) => {
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
      <div className="adminProductListWrapper">
        <div className="adminProductListContainer">
          <AdminHeader
            name={"Products"}
            button_one={"Companies"}
            button_one_url={"/admin"}
            button_two={"Categories"}
            button_two_url={"/admin/categories"}
            button_three={"Product"}
            button_three_url={"/admin/addProduct"}
          />
        </div>
        <div className="adminProductListTable">
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
                  <th scope="col">Categories</th>
                  <th scope="col">Image</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((obj) => {
                  return (
                    <tr scope="row" key={obj.id}>
                      <td>{obj.id}</td>
                      <td>{obj.name}</td>
                      <td>
                        <ul>
                          {obj.category_name.map((e, index) => {
                            return <li key={index}>{e}</li>;
                          })}
                        </ul>
                      </td>
                      <td>
                        <img src={obj.image} alt={obj.name} />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="kssia_adminDeleteButton"
                          onClick={() => {handleDelete(obj.id)}}
                        >
                          Delete
                        </button>
                      </td>
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

export default ProductList;

import React, { useEffect, useState } from "react";
import "./companyList.scss";
import AdminHeader from "../../../../components/admin/header/adminHeader";
import {
  deleteCompany,
  getAllCompaniesAdmin,
} from "../../../../repository/companiesRepository";
import { useNavigate } from "react-router-dom";

const CompanyList = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const handleDeleteCompany = (comp_id) => {
    if (confirm("Are you sure?")) {
      deleteCompany(comp_id)
        .then((result) => {
          alert("Company deleted successfully");
          navigate('/admin')
        })
        .catch(() => {
          alert("Something went wrong!");
        });
    }
  };

  useEffect(() => {
    getAllCompaniesAdmin()
      .then((result) => {
        setTableData(result);
        //new DataTable("#example");
        $(document).ready(function () {
          $("#example").DataTable();
        });
      }).catch((err) => {
        navigate("/admin/login");
      });
  }, []);

  return (
    <>
      <div className="adminCompanyListWrapper">
        <div className="adminCompanyListContainer">
          <AdminHeader
            name={"Companies"}
            button_one={"Categories"}
            button_one_url={"/admin/categories"}
            button_two={"Products"}
            button_two_url={"/admin/products"}
            button_three={"Company"}
            button_three_url={"/admin/addCompany"}
          />
        </div>
        <div className="adminCompanyListTable">
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
                  <th scope="col">Address</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((obj) => {
                  return (
                    <tr scope="row" key={obj.id}>
                      <td>{obj.id}</td>
                      <td>{obj.name}</td>
                      <td>{obj.address}</td>
                      <td>
                        <button type="button" className="kssia_adminViewButton" onClick={() => {navigate(`/admin/viewCompany/${obj.id}`)}}>
                          View
                        </button>
                      </td>
                      <td>
                        <button onClick = {() => {navigate(`/admin/editCompany/${obj.id}`)}} type="button" className="kssia_adminEditButton">
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteCompany(obj.id)}
                          type="button"
                          className="kssia_adminDeleteButton"
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

export default CompanyList;

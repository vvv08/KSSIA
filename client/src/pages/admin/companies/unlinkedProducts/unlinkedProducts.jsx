import React, { useEffect, useState } from "react";
import "./unlinkedProducts.scss";
import {
  getAllProductsLink,
  linkProduct,
} from "../../../../repository/companiesRepository";
import { useParams, useNavigate } from "react-router-dom";

const UnlinkedProducts = () => {
  const [tableData, setTableData] = useState([]);
  const { companyId, companyName } = useParams();
  const navigate = useNavigate();
  const handleLink = (e, product_id) => {
    e.target.innerText = "Linking";
    e.target.disabled = true;
    linkProduct(companyId, product_id)
      .then((result) => {
        setTableData((state) =>
          state.filter((i) => i.product_id != product_id)
        );
      })
      .catch((err) => {
        navigate("/admin");
      });
  };
  useEffect(() => {
    getAllProductsLink(companyId)
      .then((result) => {
        setTableData(result);
        //new DataTable("#example");
        $(document).ready(function () {
          $("#example").DataTable();
        });
      })
      .catch((err) => {
        navigate("/admin");
      });
  }, []);

  return (
    <>
      <div className="kssia_unlinkedProductWrapper">
        <div className="kssia_unlinkedProductBackBtn">
          <button
            onClick={() => {
              navigate(`/admin/viewCompany/${companyId}`);
            }}
            className="kssia_adminDeleteButton"
          >
            Back
          </button>
        </div>
        <div className="kssia_unlinkedProductHeader">
          <h1>Link Products for {companyName}</h1>
        </div>
        {tableData[0] && (
          <div className="kssia_unlinkedProductTable">
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
                    <tr scope="row" key={obj.product_id}>
                      <td>{obj.product_id}</td>
                      <td>{obj.product_name}</td>
                      <td>
                        <ul>
                          {obj.category_name.map((e, index) => {
                            return <li key={index}>{e}</li>;
                          })}
                        </ul>
                      </td>
                      <td>
                        <img src={obj.product_image} alt={obj.product_name} />
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            handleLink(e, obj.product_id);
                          }}
                          type="button"
                          className="kssia_adminViewButton"
                        >
                          Link
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!tableData[0] && (
          <div className="kssiaunlinkedError">
            <p>No products to link...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UnlinkedProducts;

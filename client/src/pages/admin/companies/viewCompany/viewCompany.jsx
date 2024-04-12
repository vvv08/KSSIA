import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./viewCompany.scss";
import { getAboutCompanyAdmin } from "../../../../repository/companiesRepository";
import ViewCompanyCard from "../../../../components/admin/companies/viewCompany/viewCompany";
import ProductDetailsCard from "../../../../components/admin/companies/productDetails/productDetails";

const ViewCompany = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  useEffect(() => {
    getAboutCompanyAdmin(companyId).then((result) => {
        setCompany(result)
    }).catch((err) => {
        navigate('/admin')
    })
  },[])
  return (
    <>
      <div className="kssia_viewCompanyWrapper">
        <div className="kssia_viewCompanyContainer">
          <div className="kssia_viewCompanyBackBtn">
            <button
              onClick={() => {
                navigate("/admin");
              }}
              className="kssia_adminDeleteButton"
            >
              Back
            </button>
          </div>
          {company[0] && <ViewCompanyCard data = {company}/>}
          {company[1] && <ProductDetailsCard comp_id = {companyId} comp_name = {company[0].company_name} data = {company[1]}/>}
        </div>
      </div>
    </>
  );
};

export default ViewCompany;

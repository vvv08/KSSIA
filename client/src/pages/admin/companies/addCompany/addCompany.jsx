import React from "react";
import { useNavigate } from 'react-router-dom';
import "./addCompany.scss";
import AddCompanyForm from "../../../../components/admin/companies/addCompany/addCompany";

const AddCompany = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="kssia_addCompanyWrapper">
        <div className="kssia_addCompanyContainer">
        <div className="kssia_addCompanyBackBtn">
          <button onClick = {() => {navigate('/admin')}}className="kssia_adminDeleteButton">Back</button>
        </div>
          <h1>Add Company</h1>
          <AddCompanyForm />
        </div>
      </div>
    </>
  );
};

export default AddCompany;

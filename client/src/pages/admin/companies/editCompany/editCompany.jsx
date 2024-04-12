import React from 'react';
import { useNavigate } from 'react-router-dom';
import './editCompany.scss';
import EditCompanyForm from '../../../../components/admin/companies/editCompany/editCompany';

const EditCompany = () => {
    const navigate = useNavigate();
    return (
      <>
        <div className="kssia_editCompanyWrapper">
          <div className="kssia_editCompanyContainer">
          <div className="kssia_editCompanyBackBtn">
            <button onClick = {() => {navigate('/admin')}}className="kssia_adminDeleteButton">Back</button>
          </div>
            <h1>Edit Company</h1>
            <EditCompanyForm/>
          </div>
        </div>
      </>
    );
}

export default EditCompany

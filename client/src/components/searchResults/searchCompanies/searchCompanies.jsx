import React from "react";
import "./searchCompanies.scss";
import CompanyCard from "../../company/companyCard/companyCard";

const SearchCompanies = (props) => {
  return (
    <>
      <div className="searchCompaniesWrapper">
        <div className="searchCompaniesContainer">
          <div className="searchCompaniesContent">
            {props.data &&
              props.data.map((obj, index) => {
                return <CompanyCard key={index} data={obj} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCompanies;

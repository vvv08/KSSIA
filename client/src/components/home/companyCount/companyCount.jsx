import React from "react";
import "./companyCount.scss";
import CompanyCountCard from "./companyCountCard/companyCountCard";

const CompanyCount = (props) => {
  return (
    <>
      <div className="companyCountWrapper">
        <div className="companyCountContainer">
          <div className="companyCountHeader">
            <h2>Why use KSSIA products platform</h2>
          </div>
          <div className="companyCountContent">
                <CompanyCountCard title = {"Companies"} number = {props.count[1].company_count}/>
                <CompanyCountCard title = {"Categories"} number = {props.count[2].category_count} />
                <CompanyCountCard title = {"Products"} number = {props.count[0].product_count} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCount;

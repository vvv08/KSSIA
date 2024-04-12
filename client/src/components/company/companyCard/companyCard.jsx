import React from "react";
import "./companyCard.scss";
import { Link } from "react-router-dom";

const CompanyCard = (props) => {
  const name = props.data.company_name;
  const image = props.data.company_image;
  const company_id = props.data.company_id;
  return (
    <>
      <div className="companyCardWrapper">
        <div className="companyCardContainer">
          <div className="companyCardLeft">
            <img src={image} alt={name} />
          </div>
          <div className="companyCardRight">
            <div className="companyCardRightContent">
              <h2>{name}</h2>

              <Link
                to={`/aboutCompany/${name}/${company_id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="companyCardMoreButton">
                  <p>Know More</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCard;

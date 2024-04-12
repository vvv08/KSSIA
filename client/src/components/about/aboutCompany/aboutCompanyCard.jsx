import React from "react";
import "./aboutCompanyCard.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

const AboutCompanyCard = (props) => {
  const about = props.data[0].company_about;
  const address = props.data[0].address;
  const website = props.data[0].company_url;
  const image = props.data[0].company_image;
  const contact_list = props.data.slice(2);
  return (
    <>
      <div className="aboutCompanyCardWrapper">
        <div className="aboutCompanyCardContainer">
          <div className="aboutCompanyCardHeader">
            <span onClick={() => window.history.back()}>
              <ArrowBackIosNewIcon />
              Back
            </span>
            <h1>{props.name}</h1>
          </div>
          <div className="aboutCompanyCardContent">
            <div className="aboutCompanyCardLeft">
              <div className="aboutCompanyCardLogo">
                <img src={image} alt={props.name} />
              </div>
            </div>
            <div className="aboutCompanyCardRight">
              <div className="aboutCompanyCardAbout">
                <h3>About: </h3>
                <p>{about}</p>
              </div>
              <div className="aboutCompanyCardAddress">
                <h3>Address: </h3>
                <p>{address}</p>
              </div>
              {contact_list.map((obj, index) => {
                return (
                  <div className="aboutCompanyCardContact" key={index}>
                    <h4>Contact: </h4>
                    <p>{obj.contact}</p>
                  </div>
                );
              })}
              <div className="aboutCompanyCardWebsite">
                <a
                  href={`https://${website}`}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <div className="aboutCompanyCardWebsiteBtn">
                    <p>Website</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutCompanyCard;

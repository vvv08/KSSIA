import React from "react";
import "./viewCompany.scss";

const ViewCompanyCard = (props) => {
  const name = props.data[0].company_name;
  const about = props.data[0].company_about;
  const address = props.data[0].address;
  const website = props.data[0].company_url;
  const image = props.data[0].company_image;
  const contact_list = props.data.slice(2);
  return (
    <>
      <div className="viewCompanyCardWrapper">
        <div className="viewCompanyCardContainer">
          <div className="viewCompanyCardHeader">
            <h1>{name}</h1>
          </div>
          <div className="viewCompanyCardContent">
            <div className="viewCompanyCardLeft">
              <div className="viewCompanyCardLogo">
                <img src={image} alt={props.name}/>
              </div>
            </div>
            <div className="viewCompanyCardRight">
              <div className="viewCompanyCardAbout">
                <h3>About: </h3>
                <p>{about}</p>
              </div>
              <div className="viewCompanyCardAddress">
                <h3>Address: </h3>
                <p>{address}</p>
              </div>
              {contact_list.map((obj, index) => {
                return (
                  <div className="viewCompanyCardContact" key={index}>
                    <h4>Contact: </h4>
                    <p>{obj.contact}</p>
                  </div>
                );
              })}
              <div className="viewCompanyCardWebsite">
                <a
                  href={`https://${website}`}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <div className="viewCompanyCardWebsiteBtn">
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

export default ViewCompanyCard;

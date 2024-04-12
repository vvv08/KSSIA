import React, { useEffect, useState } from "react";
import "./aboutCompany.scss";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import AboutCompanyCard from "../../../components/about/aboutCompany/aboutCompanyCard";
import { useParams } from "react-router-dom";
import { getAboutCompany } from "../../../repository/companiesRepository";
import ProductTray from "../../../components/company/productTray/productTray";

const AboutCompany = () => {
  const { companyId, companyName } = useParams();
  const [aboutCompany, setAboutCompany] = useState([]);
  useEffect(() => {
    getAboutCompany(companyId).then((result) => {
      setAboutCompany(result);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="aboutCompanyWrapper">
        <div className="aboutCompanyTop">
          {aboutCompany[0] && (
            <AboutCompanyCard name={companyName} data={aboutCompany} />
          )}
        </div>
        {aboutCompany[1] && <div className="aboutCompanyBottom">
          <ProductTray data = {aboutCompany[1]}/>
        </div>}
      </div>
      <Footer />
    </>
  );
};

export default AboutCompany;

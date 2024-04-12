import React from "react";
import "./aboutUs.scss";
import Navbar from "../../components/navbar/navbar";
import AboutMain from "../../components/about/aboutMain/aboutMain";
import Footer from "../../components/footer/footer";

const AboutUs = () => {
  return (
    <>
      <Navbar current_tab={"about"}/>
      <div className="aboutUsContent">
        <AboutMain />
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

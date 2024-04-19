import React, { useEffect, useState } from "react";
import "./productCompanies.scss";
import CompanyCard from "../../../components/company/companyCard/companyCard";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useParams } from "react-router-dom";
import { getCompaniesByproduct } from "../../../repository/companiesRepository";
import { getDistricts } from "../../../repository/misc";

const ProductCompanies = () => {
  const { productId, productName } = useParams();
  const [companies, setCompanies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const districtChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  useEffect(() => {
    // getCompaniesByproduct(productId, selectedDistrict).then((result) => {
    //   setCompanies(result);
    // });
    getDistricts().then((result) => {
      setDistricts(result);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCompaniesByproduct(productId, selectedDistrict)
      .then((result) => {
        setCompanies(result);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedDistrict]);

  return (
    <>
      <Navbar />
      <div className="productCompaniesWrapper">
        <div className="productCompaniesContainer">
          <div className="productCompaniesHeader">
            <span onClick={() => window.history.back()}>
              <ArrowBackIosNewIcon />
              Back
            </span>
            {selectedDistrict ? (
              <h2>
                {productName} ({selectedDistrict})
              </h2>
            ) : (
              <h2>{productName}</h2>
            )}
          </div>
          <div className="productCompaniesDistrictList">
            <p>Filter by single district: </p>
            <select name="district" id="" onChange={districtChange}>
              <option value="">All</option>
              {districts.map((obj, index) => {
                return (
                  <option value={obj.district_name} key={index}>
                    {obj.district_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="productCompaniesContentContainer">
            {!isLoading ? (
              companies[0] ? (
                <div className="productCompaniesContent">
                  {companies.map((obj, index) => {
                    return <CompanyCard key={index} data={obj} />;
                  })}
                </div>
              ) : (
                <div className="productCompaniesContent">
                  <p className="productCompaniesContentError">
                    Sorry no companies for {productName} in {selectedDistrict}
                  </p>
                </div>
              )
            ) : (
              <div className="productCompaniesContent">
                <p className="productCompaniesContentLoading">Loading ...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCompanies;

import React, { useEffect, useState } from "react";
import "./ourCompanies.scss";
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import ItemsList from "../../../components/itemsList/itemsList";
import { getAllCompanies } from "../../../repository/companiesRepository";
import { getDistricts } from "../../../repository/misc";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

const OurCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const districtChange = (e) => {
    setSelectedDistrict(e.target.value);
  };
  useEffect(() => {
    getDistricts().then((result) => {
      setDistricts(result);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true)
    getAllCompanies(selectedDistrict).then((result) => {
      setCompanies(result);
    }).catch((err) => {
      console.log("Error:", err)
    }).finally(() => {
      setIsLoading(false)
    });
  }, [selectedDistrict]);

  return (
    <>
      <Navbar current_tab={"companies"}/>
      <div className="ourCompaniesWrapper">
        <div className="ourCompaniesHeader">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>
              <ArrowBackIosNewIcon />
              Back
            </span>
          </Link>
          {selectedDistrict ? (
            <h2>Our Companies ({selectedDistrict})</h2>
          ) : (
            <h2>Our Companies</h2>
          )}
        </div>
        <div className="ourCompaniesDistrictList">
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
        {!isLoading ? (companies[0] ? (
          <div className="ourCompaniesContentList">
            <ItemsList
              name={"Our Companies"}
              data={companies}
              href={"/aboutCompany"}
              back={"/"}
            />
          </div>
        ) : (
          <div className="ourCompaniesContent">
            <p className="ourCompaniesContentError">
              Sorry no companies in {selectedDistrict}
            </p>
          </div>
        )) : (
          <div className="ourCompaniesContent">
            <p className="ourCompaniesContentLoading">
              Loading ...
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OurCompanies;

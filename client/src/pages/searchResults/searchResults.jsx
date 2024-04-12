import React, { useEffect, useState } from "react";
import "./searchResults.scss";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { getSearchResults } from "../../repository/search";
import { useParams } from "react-router-dom";
import SearchCompanies from "../../components/searchResults/searchCompanies/searchCompanies";
import { getDistricts } from "../../repository/misc";
import SearchProducts from "../../components/searchResults/searchProducts/searchProducts";

const Searchresults = () => {
  const { searchTerm } = useParams();
  const [switchTab, setSwitchTab] = useState("companies");
  const [companiesResult, setCompaniesResult] = useState([]);
  const [productsResult, setProductsResult] = useState([]);
  const [suggestedProductsResult, setSuggestedProductsResult] = useState([]);
  const [districts, setDistricts] = useState();
  const [selectDistrict, setSelectDistrict] = useState("");

  const switchTabClick = (switchedTab) => {
    setSwitchTab(switchedTab);
  };

  useEffect(() => {
    getDistricts().then((result) => {
      setDistricts(result);
    });
  }, []);

  useEffect(() => {
    getSearchResults(searchTerm, selectDistrict).then((results) => {
      setCompaniesResult(results[0]);
      setSuggestedProductsResult(results[1]);
      setProductsResult(results[2]);
    });
  }, [searchTerm, selectDistrict]);

  useEffect(() => {
    setSelectDistrict("");
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <div className="searchResultsWrapper">
        <div className="searchResultsContainer">
          <div className="searchResultsHeader">
            <h2>Search results for "{searchTerm}"</h2>
          </div>
          <div className="searchResultsSwitchTab">
            <ul>
              <li
                className={
                  switchTab === "companies" ? "tabActive" : "tabInactive"
                }
                onClick={() => {
                  switchTabClick("companies");
                }}
              >
                Companies
              </li>
              <li
                className={
                  switchTab === "products" ? "tabActive" : "tabInactive"
                }
                onClick={() => {
                  switchTabClick("products");
                }}
              >
                Products
              </li>
              <li
                className={
                  switchTab === "suggested products"
                    ? "tabActive"
                    : "tabInactive"
                }
                onClick={() => {
                  switchTabClick("suggested products");
                }}
              >
                Suggested Products
              </li>
            </ul>
          </div>
          {companiesResult && (
            <div className="searchResultsContent">
              {switchTab === "companies" &&
                (companiesResult.length != 0 ? (
                  <div className="searchResultCompany">
                    <div className="searchResultCompanyDistrictList">
                      <p>Filter by single district: </p>
                      <select
                        name="district"
                        value={selectDistrict}
                        onChange={(e) => {
                          setSelectDistrict(e.target.value);
                        }}
                      >
                        <option value="">All</option>
                        {districts &&
                          districts.map((obj, index) => {
                            return (
                              <option value={obj.district_name} key={index}>
                                {obj.district_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <SearchCompanies data={companiesResult} />
                  </div>
                ) : (
                  <div className="searchResultCompany">
                    <div className="searchResultCompanyDistrictList">
                      <p>Filter by single district: </p>
                      <select
                        name="district"
                        value={selectDistrict}
                        onChange={(e) => {
                          setSelectDistrict(e.target.value);
                        }}
                      >
                        <option value="">All</option>
                        {districts &&
                          districts.map((obj, index) => {
                            return (
                              <option value={obj.district_name} key={index}>
                                {obj.district_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <p className="searchResultsContentError">
                      No companies for "{searchTerm}"
                    </p>
                  </div>
                ))}
              {switchTab === "products" && (
                <SearchProducts data={productsResult} search = {searchTerm}/>
              )}
              {switchTab === "suggested products" && (
                <SearchProducts data={suggestedProductsResult} search = {searchTerm}/>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Searchresults;

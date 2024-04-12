import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import "./home.scss";
import HomeImageCard from "../../components/home/homeImageCard/homeImageCard";
import CompanyCount from "../../components/home/companyCount/companyCount";
import { useEffect, useState } from "react";
import { getAllCounts } from "../../repository/homeRepository";

const Home = () => {
  const [countData, setCountData] = useState([]);
  useEffect(() => {
    getAllCounts().then((results) => {
      setCountData(results)
    })
  },[])

  return (
    <>
      <Navbar current_tab={"home"}/>
      <div className="kssia_homeImageCard">
        <HomeImageCard />
      </div>
      <div className="kssia_companyCount">
        {countData[0] && <CompanyCount count = {countData}/>}
      </div>
      <Footer />
    </>
  );
};

export default Home;

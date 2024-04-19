import React from "react";
import "./navbar.scss";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar/searchBar";
import logo from '/assets/KSSIA_logo.png'
const Navbar = ({current_tab}) => {
  const getColor = (tab) => {
    if(current_tab === tab){
      return "--kssiaSelectedLink"
    }else{
      return "--kssiaBackground"
    }
  }
  return (
    <>
      <div className="kssia_navBarWrapper">
        <div className="kssia_navBarContainer">
          <div className="kssia_navBarTop">
            <div className="kssia_navBarLogo">
              <img src={logo} alt="logo" />
            </div>
            <div className="kssia_navBarSearch">
              <SearchBar />
            </div>
            <div className="kssia_navBarList">
              <ul>
                <Link to="/ourCompanies" style={{ textDecoration: "none", color:`var(${getColor("companies")})`}}>
                  <li>Companies</li>
                </Link>
                <Link to="/ourCategories" style={{ textDecoration: "none", color:`var(${getColor("categories")})` }}>
                  <li>Categories</li>
                </Link>
                <Link to="/aboutUs" style={{ textDecoration: "none", color:`var(${getColor("about")})` }}>
                  <li>About</li>
                </Link>
                <Link to="/" style={{ textDecoration: "none", color:`var(${getColor("home")})` }}>
                  <li>Home</li>
                </Link>
                <Link
                  to="http://www.kssia.com/index.html"
                  target="_blank"
                  style={{ textDecoration: "none", color:"var(--kssiaBackground)" }}
                >
                  <li>KSSIA Website</li>
                </Link>
              </ul>
            </div>
            <div className="kssia_navBarContact">
              <div className="kssia_navBarContactContent">
                <span>
                  <MailOutlinedIcon />
                </span>
                <p>kssiapkd@rediffmail.com</p>
              </div>
              <div className="kssia_navBarContactContent">
                <span>
                  <LocalPhoneOutlinedIcon />
                </span>
                <p>8078054860</p>
              </div>
            </div>
          </div>
          <div className="kssia_navBarBottomLine"></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

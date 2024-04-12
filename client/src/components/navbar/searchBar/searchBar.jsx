import React, { useState } from "react";
import "./searchBar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if(searchTerm != ""){
      navigate(`/search/${searchTerm}`)
      setSearchTerm('')
    }else{
      navigate('/')
    }
  }
  return (
    <>
      <div className="navBarSearch">
        <div className="navBarSearchContainer">
          <form onSubmit={handleSubmit}>
            <span>
              <SearchOutlinedIcon />
            </span>
            <input type="text" placeholder="Search..."  value = {searchTerm} onChange = {(e) => {setSearchTerm(e.target.value)}}/>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchBar;

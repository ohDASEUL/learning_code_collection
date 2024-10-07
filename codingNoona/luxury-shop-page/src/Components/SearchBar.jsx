import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const search = (e) => {
    if (e.key === "Enter") {
      let keyword = e.target.value;
      navigate(`/?q=${keyword}`);
    }
  };

  return (
    <div>
      <FontAwesomeIcon icon={faSearch} className="navbar-search-icon" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={search}
      />
    </div>
  );
};

export default SearchBar;

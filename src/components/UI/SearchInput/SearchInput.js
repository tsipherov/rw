import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const searchButtonHandler = () => {
    navigate(`/search/1?query=${value}`);
  };
  return (
    <div className="searchInputWrap">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") searchButtonHandler();
        }}
        value={value}
        className="searchInputInp"
        type="search"
        placeholder="Movie title"
        aria-label="Search"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button className="searchInputBtn" onClick={searchButtonHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          className="bi bi-search"
          viewBox="-2 -1 20 20"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;

import React from "react";
import "../styles/SearchResult.css";

function SearchAuthorResult({ result, selectable, onSelect }) {
  const handleClick = () => {
    if (selectable && onSelect) {
      onSelect(result);
    }
  };

  return (
    <div
      className={`search-result ${selectable ? "selectable" : ""}`}
      onClick={handleClick}
    >
      <div className="search-result-details">
        <h1 className="search-result-title">{result.name}</h1>
        <p className="search-result-info">Email: {result.email}</p>
        <p className="search-result-info">Birth Date: {result.birth_date}</p>
        <p className="search-result-info">Biography: {result.biography}</p>
        <p className="search-result-info">Nationality: {result.nationality}</p>
      </div>
    </div>
  );
}

export default SearchAuthorResult;

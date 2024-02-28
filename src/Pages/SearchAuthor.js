import React, { useState } from "react";
import Header from "../components/Header";
import SearchAuthorResult from "../components/SearchAuthorResult";
import "../styles/Pages.css";

function SearchAuthor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch(
        `https://proyecto1db2-production.up.railway.app/authors/get/${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error("Error al buscar el autor:", response.statusText);
      }
    } catch (error) {
      console.error("Error al buscar el autor:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <h2>Search Author</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by author name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchSubmit}>Search</button>
      </div>
      <div className="search-results">
        {searchResults.map((author) => (
          <SearchAuthorResult key={author._id} result={author} />
        ))}
      </div>
    </div>
  );
}

export default SearchAuthor;

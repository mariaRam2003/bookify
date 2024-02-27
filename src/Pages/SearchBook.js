import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/Pages.css";

function SearchBook() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Implement search logic here
  };

  return (
    <div>
      <Header />
      <h2>Search Book</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBook;

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchResult from "../components/SearchResult";
import "../styles/Pages.css"; // Importamos el CSS específico para BooksList

function BooksList() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberInput, setPageNumberInput] = useState("");
  const searchResultsPerPage = 10;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://proyecto1db2-production.up.railway.app/libros/${currentPage}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error(
            "Error al obtener los resultados de búsqueda:",
            response.statusText
          );
        }
      } catch (error) {
        console.error(
          "Error al obtener los resultados de búsqueda:",
          error.message
        );
      }
    };

    fetchSearchResults();
  }, [currentPage]);

  const handlePageNumberChange = (e) => {
    setPageNumberInput(e.target.value);
  };

  const handlePageNumberSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(pageNumberInput);
    if (pageNumber > 0) {
      setCurrentPage(pageNumber);
    }
    setPageNumberInput("");
  };

  return (
    <div>
      <Header />
      <h2>Books List</h2>
      <form className="Pagination" onSubmit={handlePageNumberSubmit}>
        <input
        className="page-number-input"
          type="number"
          value={pageNumberInput}
          onChange={handlePageNumberChange}
          placeholder="Page number"
          min="1"
        />
        <button className="buttonPageNumber" type="submit">Go</button>
      </form>
      <div className="books-list">
        {searchResults.map((result) => (
          <SearchResult key={result._id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default BooksList;

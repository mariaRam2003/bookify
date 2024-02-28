import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchUsuariosResult from "../components/SearchUsuariosResult";
import "../styles/Pages.css";

function Usuarios() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [param, setParam] = useState("");
  const [pageNumberInput, setPageNumberInput] = useState("");
  const searchResultsPerPage = 10;

  useEffect(() => {
    fetchSearchResults();
  }, [currentPage, sortDirection, filterValue, param]);

  const fetchSearchResults = async () => {
    try {
      const requestBody = {
        sort: sortDirection,
        param: param,
      };

      // Agregar filter solo si filterValue no está vacío
      if (filterValue) {
        requestBody.filter = filterValue;
      }

      const response = await fetch(
        `https://proyecto1db2-production.up.railway.app/users/get/${
          pageNumberInput === "0" ? 0 : pageNumberInput || currentPage
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
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

  const handlePageNumberChange = (e) => {
    setPageNumberInput(e.target.value);
  };

  const handlePageNumberSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(pageNumberInput);
    setCurrentPage(pageNumber);
    setPageNumberInput("");
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(parseInt(e.target.value));
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleParamChange = (e) => {
    setParam(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  return (
    <div>
      <Header />
      <h2>Usuarios Page</h2>
      <form className="sort-filter-form" onSubmit={handleFormSubmit}>
        <label htmlFor="sortDirection">Sort Direction:</label>
        <select
          id="sortDirection"
          value={sortDirection}
          onChange={handleSortDirectionChange}
        >
          <option value={1}>Ascending</option>
          <option value={-1}>Descending</option>
        </select>
        <label htmlFor="filterValue">Filter Value:</label>
        <select
          id="filterValue"
          value={filterValue}
          onChange={handleFilterValueChange}
        >
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="username">Username</option>
          <option value="borrowed_books">Borrowed Books</option>
        </select>
        <label htmlFor="param">Parameter:</label>
        <select id="param" value={param} onChange={handleParamChange}>
          <option value="">Select Filter Value</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="username">Username</option>
          <option value="borrowed_books">Borrowed Books</option>
        </select>
        <label htmlFor="pageNumberInput">Page Number:</label>
        <input
          id="pageNumberInput"
          className="page-number-input"
          type="number"
          value={pageNumberInput}
          onChange={handlePageNumberChange}
          placeholder="Page number"
        />
        <button type="submit">Apply</button>
      </form>
      <div className="usuarios-list">
        {searchResults.map((result) => (
          <SearchUsuariosResult key={result._id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default Usuarios;

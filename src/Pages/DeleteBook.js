import React, { useState } from "react";
import Header from "../components/Header";
import SearchResult from "../components/SearchResult";
import "../styles/Pages.css";

function DeleteBook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Asegúrate de inicializar searchResults como un array vacío
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch(
        `https://proyecto1db2-production.up.railway.app/libros/get/${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();

        // Asegurarse de que data sea un array
        const searchResultsArray = Array.isArray(data) ? data : [data];

        setSearchResults(searchResultsArray);
      } else {
        console.error("Error al buscar el libro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al buscar el libro:", error.message);
    }
  };


  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setConfirmation(false);
    setSelectedBook(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://proyecto1db2-production.up.railway.app/libros/delete/${selectedBook._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Libro eliminado exitosamente");
        setDeleteSuccess(true);
        setDeleteError(null);
        setConfirmation(false);
        setSelectedBook(null);
      } else {
        console.error("Error al eliminar el libro:", response.statusText);
        setDeleteError("Error al eliminar el libro");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error.message);
      setDeleteError("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <Header />
      <h2>Delete Book</h2>
      <div className="delete-book-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        <div className="search-resultsDelete">
          {searchResults.map((book) => (
            <SearchResult
              key={book._id}
              result={book}
              selectable={true}
              onSelect={handleBookSelect}
            />
          ))}
        </div>
        {confirmation && (
          <div className="delete-confirm">
            <p>Are you sure you want to delete this book?</p>
            <button
              className="delete-confirmation-button"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className="delete-confirmation-button"
              onClick={handleDeleteCancel}
            >
              No
            </button>
          </div>
        )}
        {deleteSuccess && (
          <p className="success-message">
            The book has been deleted successfully!
          </p>
        )}
        {deleteError && <p className="error-message">{deleteError}</p>}
      </div>
    </div>
  );
}

export default DeleteBook;

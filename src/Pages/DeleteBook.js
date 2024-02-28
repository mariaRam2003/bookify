import React, { useState } from "react";
import Header from "../components/Header";
import SearchResult from "../components/SearchResult";
import "../styles/Pages.css";

function DeleteBook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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
        setSearchResults([data]);
      } else {
        console.error("Error al buscar el libro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al buscar el libro:", error.message);
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleDeleteConfirmation = () => {
    setConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setConfirmation(false);
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
      } else {
        console.error("Error al eliminar el libro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <h2>Delete Book</h2>
      <div className="delete-book-container">
        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        {/* Resultados de búsqueda */}
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
        {/* Confirmación de eliminación */}
        {selectedBook && !confirmation && (
          <div className="delete-confirm">
            <p>Are you sure you want to delete this book?</p>
            <button
              className="delete-confirmation-button"
              onClick={handleDeleteConfirmation}
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
        {/* Mensaje de éxito */}
        {deleteSuccess && (
          <p className="success-message">
            The book has been deleted successfully!
          </p>
        )}
      </div>
    </div>
  );
}

export default DeleteBook;

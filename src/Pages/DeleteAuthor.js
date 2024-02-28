import React, { useState } from "react";
import Header from "../components/Header";
import SearchAuthorResult from "../components/SearchAuthorResult";
import "../styles/Pages.css";

function DeleteAuthor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

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

  const handleAuthorSelect = (author) => {
    setSelectedAuthor(author);
    setConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setConfirmation(false);
    setSelectedAuthor(null); // Limpiar el autor seleccionado al cancelar
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://proyecto1db2-production.up.railway.app/authors/delete/${selectedAuthor._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Autor eliminado exitosamente");
        setDeleteSuccess(true);
        setDeleteError(null);
        setConfirmation(false);
        setSelectedAuthor(null); // Limpiar el autor seleccionado después de la eliminación exitosa
      } else {
        console.error("Error al eliminar el autor:", response.statusText);
        setDeleteError("Error al eliminar el autor");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error.message);
      setDeleteError("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <Header />
      <h2>Delete Author</h2>
      <div className="delete-author-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by author name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        <div className="search-resultsDelete">
          {searchResults.map((author) => (
            <SearchAuthorResult
              key={author._id}
              result={author}
              selectable={true}
              onSelect={handleAuthorSelect}
            />
          ))}
        </div>
        {confirmation && (
          <div className="delete-confirm">
            <p>Are you sure you want to delete this author?</p>
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
            The author has been deleted successfully!
          </p>
        )}
        {deleteError && <p className="error-message">{deleteError}</p>}
      </div>
    </div>
  );
}

export default DeleteAuthor;

// UpdateBook.js
import React, { useState } from "react";
import Header from "../components/Header";
import FormularioUpdate from "../components/FormularioUpdate";
import SearchResult from "../components/SearchResult";
import "../styles/Pages.css";

function UpdateBook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false); // Estado para el mensaje de éxito

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
    setUpdateSuccess(false); // Reiniciar el estado de éxito al seleccionar un nuevo libro
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(
        `https://proyecto1db2-production.up.railway.app/libros/update/${selectedBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Libro actualizado exitosamente");
        setUpdateSuccess(true); // Establecer el estado de éxito a true
      } else {
        console.error("Error al actualizar el libro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <h2>Update Book</h2>
      <div className="update-book-container">
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
        <div className="search-resultsUpdate">
          {searchResults.map((book) => (
            <SearchResult
              key={book._id}
              result={book}
              selectable={true}
              onSelect={handleBookSelect}
            />
          ))}
        </div>
        {/* Formulario de actualización */}
        {selectedBook && (
          <div className="update-form">
            <h3>Edit Book</h3>
            <FormularioUpdate
              libro={selectedBook}
              onSubmit={handleSubmit}
              updateSuccess={updateSuccess} // Pasar el estado de éxito como prop
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateBook;

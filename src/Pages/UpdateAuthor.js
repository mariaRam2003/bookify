import React, { useState } from "react";
import Header from "../components/Header";
import FormularioAuthorUpdate from "../components/FormularioAuthorUpdate";
import SearchAuthorResult from "../components/SearchAuthorResult";
import "../styles/Pages.css";

function UpdateAuthor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false); // Estado para el mensaje de éxito

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
    setUpdateSuccess(false); // Reiniciar el estado de éxito al seleccionar un nuevo autor
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(
        `https://proyecto1db2-production.up.railway.app/authors/update/${selectedAuthor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Autor actualizado exitosamente");
        setUpdateSuccess(true); // Establecer el estado de éxito a true
      } else {
        console.error("Error al actualizar el autor:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <h2>Update Author</h2>
      <div className="update-author-container">
        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by author name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        {/* Resultados de búsqueda */}
        <div className="search-resultsUpdate">
          {searchResults.map((author) => (
            <SearchAuthorResult
              key={author._id}
              result={author}
              selectable={true}
              onSelect={handleAuthorSelect}
            />
          ))}
        </div>
        {/* Formulario de actualización */}
        {selectedAuthor && (
          <div className="update-form">
            <h3>Edit Author</h3>
            <FormularioAuthorUpdate
              author={selectedAuthor}
              onSubmit={handleSubmit}
              updateSuccess={updateSuccess} // Pasar el estado de éxito como prop
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateAuthor;

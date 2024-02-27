  import React, { useState } from "react";
  import Header from "../components/Header";
  import SearchResult from "../components/SearchResult";
  import "../styles/Buscar.css";

  function Buscar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);

    const handleSearch = async (event) => {
      setSearchTerm(event.target.value);
    };


    const handleKeyPress = async (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        setShowResults(true);
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_DOMAIN}/libros/get/${searchTerm}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setResults([data]);
          } else {
            console.error("Error al buscar el libro:", response.statusText);
            setResults([]);
          }
        } catch (error) {
          console.error("Error al buscar el libro:", error.message);
          setResults([]);
        }
      }
    };

    return (
      <div>
        <Header />
        <div className="page-container">
          <div className="search-container">
            <h1 className="search-title">Encuentra tu libro</h1>
            <p className="search-text">
              Busca tu libro favorito y encuéntralo en nuestra biblioteca
            </p>
            <form>
              <label htmlFor="search">Buscar</label>
              <input
                id="search"
                type="search"
                pattern=".*\S.*"
                required
                autoComplete="off"
                value={searchTerm}
                onChange={handleSearch}
                onKeyPress={handleKeyPress}
              />
              <span className="caret"></span>
            </form>
            <div className="search-by">
              <p>Género</p>
              <p>Autor</p>
              <p>Título</p>
              <p>Año</p>
            </div>
          </div>
        </div>
        {showResults && (
          <div className="search-results">
            {results.map((result) => (
              <SearchResult key={result.id} result={result} authorId={result.author_id} />
            ))}
          </div>
        )}
      </div>
    );
  }

  export default Buscar;

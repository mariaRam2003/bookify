import React, { useState } from "react";
import Header from "../components/Header";
import Formulario from "../components/Formulario";
import SearchResult from "../components/SearchResult";
import "../styles/Pages.css";

function UpdateBook() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      year: 1949,
      isbn: "978-0-452-28423-4",
      copies: 10,
      reviews: 123,
      imageUrl: "https://via.placeholder.com/150",
      description: "A dystopian novel about totalitarianism.",
    },
    {
      id: 2,
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Science Fiction",
      year: 1932,
      isbn: "978-0-06-085052-4",
      copies: 8,
      reviews: 87,
      imageUrl: "https://via.placeholder.com/150",
      description: "An influential novel about a future society.",
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      year: 1965,
      isbn: "978-0-441-17271-7",
      copies: 12,
      reviews: 98,
      imageUrl: "https://via.placeholder.com/150",
      description: "A science fiction epic set in a distant future.",
    },
    // Agregar más libros según sea necesario
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === "") {
      setSearchResults([]);
      setSelectedBook(null);
    }
  };

  const handleSearchSubmit = () => {
    const filteredResults = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleSubmit = (event) => {
    // Lógica para enviar el formulario de actualización del libro
    event.preventDefault();
    console.log("Formulario enviado");
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
        {/* Resultados de búsqueda */}
        <div className="search-resultsUpdate">
          {searchResults.map((book) => (
            <SearchResult
              key={book.id}
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
            <Formulario libro={selectedBook} onSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateBook;

import React from "react";
import "../styles/SearchResult.css";

function SearchUsuariosResult({ result }) {
  return (
    <div className="search-result">
      <div className="search-result-details">
        <h1 className="search-result-title">{result.username}</h1>
        <p>Name: {result.name || "N/A"}</p>
        <p>Email: {result.email || "N/A"}</p>
        <div>
          <h4>Borrowed Books:</h4>
          {result.borrowed_books && result.borrowed_books.length > 0 ? (
            result.borrowed_books.map((book) => (
              <div key={book._id}>
                <p>Title: {book.title}</p>
              </div>
            ))
          ) : (
            <p>No borrowed books</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUsuariosResult;

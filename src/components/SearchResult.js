import React, { useState, useEffect } from "react";
import "../styles/SearchResult.css";

function SearchResult({ result, selectable, onSelect, authorId }) {
  const [authorName, setAuthorName] = useState("");
  const [bookImage, setBookImage] = useState("");

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}/authors/get/${authorId}`
        );
        if (response.ok) {
          const data = await response.json();
          setAuthorName(data.name);
        } else {
          console.error(
            "Error al obtener el nombre del autor:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al obtener el nombre del autor:", error.message);
      }
    };

    fetchAuthorName();
  }, [authorId]);

  useEffect(() => {
    const fetchBookImage = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}/libros/img/${encodeURIComponent(
            result.title
          )}`
        );
        if (response.ok) {
          const imageUrl = URL.createObjectURL(await response.blob());
          setBookImage(imageUrl);
        } else {
          console.error(
            "Error al obtener la imagen del libro:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al obtener la imagen del libro:", error.message);
      }
    };

    fetchBookImage();
  }, [result.title]);

  const handleClick = () => {
    if (selectable && onSelect) {
      onSelect(result);
    }
  };

  return (
    <div
      className={`search-result ${selectable ? "selectable" : ""}`}
      onClick={handleClick}
    >
      <img src={bookImage} alt={result.title} className="search-result-image" />
      <div className="search-result-details">
        <h1 className="search-result-title">{result.title}</h1>
        <p className="search-result-description">{result.description}</p>
        <p className="search-result-author">Author: {authorName}</p>
        <p className="search-result-info">
          Genre: {result.genre.join(", ")}
        </p>{" "}
        {/* Junta los elementos del array genre */}
        <p className="search-result-info">
          Publication Year: {new Date(result.publication_date).getFullYear()}
        </p>{" "}
        {/* Obtiene el año de publication_date */}
        <p className="search-result-info">ISBN: {result.ISBN}</p>{" "}
        {/* Utiliza ISBN en lugar de isbn */}
        <p className="search-result-info">
          Available Copies: {result.available_copies}
        </p>
        <div className="search-result-reviews">
          <h3>Reviews:</h3>
          {result.reviews.map((review, index) => (
            <div key={index} className="search-result-review">
              <p>Reviewer: {review.reviewer}</p>
              <p>Comment: {review.comment}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;

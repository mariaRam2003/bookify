import React, { useState, useEffect } from "react";
import Formulario from "../components/Formulario";
import Header from "../components/Header";
import "../styles/Pages.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState({ label: "", _id: "" });
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [ISBN, setISBN] = useState("");
  const [availableCopies, setAvailableCopies] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAuthors = async (keyword) => {
    try {
      const response = await fetch(
        `https://proyecto1db2-production.up.railway.app/authors/get/${keyword}`
      );
      if (response.ok) {
        const data = await response.json();
        const authorOptions = data.map((author) => ({
          label: author.name,
          _id: author._id,
        }));
        setAuthorOptions(authorOptions);
      } else {
        console.error("Error al obtener los autores:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener los autores:", error.message);
    }
  };

  useEffect(() => {
    fetchAuthors("");
    return () => setAuthorOptions([]);
  }, []);

  const handleAuthorChange = async (value) => {
    setAuthor(value);
    fetchAuthors(value.label);
  };

  const addBook = async () => {
    try {
      const response = await fetch(
        `https://proyecto1db2-production.up.railway.app/libros/add/${author._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            genre: [genre],
            publication_date: publicationDate,
            ISBN,
            available_copies: availableCopies,
            reviews,
            author_id: author._id,
          }),
        }
      );
      if (response.ok) {
        setSuccessMessage("Libro agregado exitosamente.");
        // Resetear los campos del formulario después de enviarlo
        setTitle("");
        setAuthor({ label: "", _id: "" });
        setGenre("");
        setPublicationDate("");
        setISBN("");
        setAvailableCopies(0);
        setReviews([]);
      } else {
        setErrorMessage("Error al agregar el libro.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBook();
  };

  return (
    <div>
      <Header />
      <h2>Add New Book</h2>
      <Formulario
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={handleAuthorChange}
        genre={genre}
        setGenre={setGenre}
        publicationDate={publicationDate}
        setPublicationDate={setPublicationDate}
        ISBN={ISBN}
        setISBN={setISBN}
        availableCopies={availableCopies}
        setAvailableCopies={setAvailableCopies}
        reviews={reviews}
        setReviews={setReviews}
        authorOptions={authorOptions}
        setAuthorOptions={setAuthorOptions}
        fetchAuthors={fetchAuthors}
      />
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddBook;

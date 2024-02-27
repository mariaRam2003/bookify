import React, { useState } from "react";
import Formulario from "../components/Formulario"; // Importa el componente de formulario que creaste
import Header from "../components/Header";
import "../styles/Pages.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    console.log("Datos del formulario:", { title, author, genre });
    // Puedes enviar los datos a través de una función prop o a un endpoint de la API
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
        setAuthor={setAuthor}
        genre={genre}
        setGenre={setGenre}
      />
    </div>
  );
};

export default AddBook;

import React, { useState } from "react";
import Header from "../components/Header";
import FormularioAuthors from "../components/FormularioAuthors";
import "../styles/Pages.css";

const AddAuthor = () => {
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const handleSubmit = async (formData) => {
    try {
      // Modifica el nombre del campo birthDate a birth_date
      formData.birth_date = formData.birthDate;
      delete formData.birthDate; // Elimina la propiedad birthDate
      const response = await fetch(
        "https://proyecto1db2-production.up.railway.app/authors/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.text(); // Leer la respuesta como texto
      if (response.ok) {
        // Si la respuesta contiene "Success", mostrar mensaje de éxito
        if (responseData.includes("Success")) {
          setSuccessMessage("Autor agregado con éxito");
          setErrorMessage(""); // Limpiar mensaje de error si existe
        } else {
          const data = JSON.parse(responseData);
          console.log("Autor agregado:", data);
        }
      } else {
        setErrorMessage("Error al agregar autor"); // Establecer mensaje de error
        setSuccessMessage(""); // Limpiar mensaje de éxito si existe
        console.error("Error al agregar autor:", responseData);
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor"); // Establecer mensaje de error
      setSuccessMessage(""); // Limpiar mensaje de éxito si existe
      console.error("Error al agregar autor:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <h2>Add Author</h2>
      <FormularioAuthors handleSubmit={handleSubmit} />
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}{" "}
      {/* Mostrar mensaje de éxito si está presente */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
      {/* Mostrar mensaje de error si está presente */}
    </div>
  );
};

export default AddAuthor;

import React from "react";
import Header from "../components/Header";
import FormularioAuthors from "../components/FormularioAuthors";
import "../styles/Pages.css";

const AddAuthor = () => {
  const handleSubmit = async (formData) => {
    try {
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
      if (response.ok) {
        const data = await response.json();
        console.log("Autor agregado:", data);
      } else {
        console.error("Error al agregar autor:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar autor:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <h2>Add Author</h2>
      <FormularioAuthors handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddAuthor;

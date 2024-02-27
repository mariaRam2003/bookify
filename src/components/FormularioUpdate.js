// FormularioUpdate.js
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "100%",
    height: "auto",
  },
}));

function FormularioUpdate({ libro, onSubmit, updateSuccess }) {
  const classes = useStyles();
  const [title, setTitle] = useState(libro.title);
  const [genre, setGenre] = useState(libro.genre.join(", "));
  const [publicationDate, setPublicationDate] = useState(
    libro.publication_date
  );
  const [ISBN, setISBN] = useState(libro.ISBN);
  const [availableCopies, setAvailableCopies] = useState(
    libro.available_copies.toString()
  );
  const [reviews, setReviews] = useState(libro.reviews.join(", "));
  const [imageUrl, setImageUrl] = useState(libro.image_url); // Estado para la URL de la imagen

  useEffect(() => {
    setTitle(libro.title);
    setGenre(libro.genre.join(", "));
    setPublicationDate(libro.publication_date);
    setISBN(libro.ISBN);
    setAvailableCopies(libro.available_copies.toString());
    setReviews(libro.reviews.join(", "));
    setImageUrl(libro.image_url); // Establecer la URL de la imagen original
  }, [libro]);

  useEffect(() => {
    if (updateSuccess) {
      // Resetear los campos del formulario después de una actualización exitosa
      setTitle("");
      setGenre("");
      setPublicationDate("");
      setISBN("");
      setAvailableCopies("");
      setReviews("");
      setImageUrl(imageUrl);
    }
  }, [updateSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      title,
      genre: genre.split(","),
      publication_date: publicationDate,
      ISBN,
      available_copies: parseInt(availableCopies),
      reviews: libro.reviews, // Mantener las mismas reseñas
      // Incluir otros campos según sea necesario
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {imageUrl && (
        <img src={imageUrl} alt="Book Cover" className={classes.image} />
      )}
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <TextField
        label="Publication Date"
        value={publicationDate}
        onChange={(e) => setPublicationDate(e.target.value)}
      />
      <TextField
        label="ISBN"
        value={ISBN}
        onChange={(e) => setISBN(e.target.value)}
      />
      <TextField
        label="Available Copies"
        value={availableCopies}
        onChange={(e) => setAvailableCopies(e.target.value)}
      />
      <TextField
        label="Reviews"
        value={reviews}
        disabled // Campo deshabilitado, no editable
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
      {updateSuccess && <p>Book updated successfully!</p>}
    </form>
  );
}

export default FormularioUpdate;

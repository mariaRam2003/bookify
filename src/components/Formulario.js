import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@mui/material/Autocomplete";

const useStyles = makeStyles((theme) => ({
  formulario: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400,
    margin: "0 auto",
    padding: theme.spacing(3),
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  campo: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#5f83c5",
    color: "white",
    "&:hover": {
      backgroundColor: "#7baad8",
    },
  },
}));

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Western",
  "Horror",
  "Historical Fiction",
];

function Formulario({
  handleSubmit,
  title,
  setTitle,
  author,
  setAuthor,
  genre,
  setGenre,
  publicationDate,
  setPublicationDate,
  ISBN,
  setISBN,
  availableCopies,
  setAvailableCopies,
  reviews,
  setReviews,
  authorOptions,
  setAuthorOptions,
  fetchAuthors,
}) {
  const classes = useStyles();
  const autorRef = useRef(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [review, setReview] = useState("");

  const handleFocusAutor = () => {
    if (autorRef.current) {
      autorRef.current.focus();
    }
  };

  const handleGenreChange = (event, value) => {
    setSelectedGenres(value);
    setGenre(value.join(", "));
  };

  return (
    <form className={classes.formulario} onSubmit={handleSubmit}>
      <TextField
        className={classes.campo}
        label="Título del Libro"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        required
      />
      <Autocomplete
        disablePortal
        options={authorOptions}
        sx={{ width: 350 }}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.campo}
            label="Autor"
            value={author.label}
            onChange={(e) => {
              setAuthor({ label: e.target.value, _id: "" });
              setAuthorOptions([]);
              fetchAuthors(e.target.value);
            }}
            variant="outlined"
            required
            onFocus={handleFocusAutor}
            ref={autorRef}
          />
        )}
        onChange={(event, value) => {
          setAuthor(value);
          setAuthorOptions([]);
        }}
      />
      <Autocomplete
        disablePortal
        options={genres}
        sx={{ width: 350 }}
        multiple
        value={selectedGenres}
        onChange={handleGenreChange}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.campo}
            label="Género"
            variant="outlined"
          />
        )}
      />
      <TextField
        className={classes.campo}
        label="Año de Publicación"
        value={publicationDate}
        onChange={(e) => setPublicationDate(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        className={classes.campo}
        label="ISBN"
        value={ISBN}
        onChange={(e) => setISBN(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        className={classes.campo}
        label="Copias Disponibles"
        value={availableCopies}
        onChange={(e) => setAvailableCopies(e.target.value)}
        variant="outlined"
        type="number"
        required
      />
      <TextField
        className={classes.campo}
        label="Reseña"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        variant="outlined"
        multiline
        rows={4}
      />
      <Button className={classes.button} type="submit" variant="contained">
        Save
      </Button>
    </form>
  );
}

export default Formulario;

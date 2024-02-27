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

const authors = [
  { label: "Isaac Asimov" },
  { label: "George Orwell" },
  { label: "Ray Bradbury" },
  { label: "Aldous Huxley" },
  { label: "Philip K" },
];
const genres = [
  { label: "Ciencia Ficción" },
  { label: "Distopía" },
  { label: "Fantasía" },
  { label: "Terror" },
  { label: "Romance" },
];

function Formulario({ onSubmit, libro }) {
  const classes = useStyles();
  const autorRef = useRef(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleFocusAutor = () => {
    if (autorRef.current) {
      autorRef.current.focus();
    }
  };

  const handleGenreChange = (event, value) => {
    if (value.length <= 3) {
      setSelectedGenres(value);
    }
  };

  return (
    <form className={classes.formulario} onSubmit={onSubmit}>
      <TextField
        className={classes.campo}
        label="Título del Libro"
        id="titulo"
        name="titulo"
        defaultValue={libro ? libro.title : ""}
        variant="outlined"
        required
      />
      <Autocomplete
        disablePortal
        id="autor"
        options={authors}
        sx={{ width: 350 }}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.campo}
            label="Autor"
            id="autor"
            name="autor"
            defaultValue={libro ? libro.author : ""}
            variant="outlined"
            required
            onFocus={handleFocusAutor}
            ref={autorRef}
          />
        )}
      />
      <Autocomplete
        disablePortal
        id="genero"
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
            id="genero"
            name="genero"
            defaultValue={libro ? libro.genre : ""}
            variant="outlined"
            required
          />
        )}
      />
      <TextField
        className={classes.campo}
        label="Año de Publicación"
        id="anio"
        name="anio"
        defaultValue={libro ? libro.year : ""}
        type="text"
        variant="outlined"
        required
      />
      <TextField
        className={classes.campo}
        label="ISBN"
        id="isbn"
        name="isbn"
        defaultValue={libro ? libro.isbn : ""}
        variant="outlined"
        required
      />
      <TextField
        className={classes.campo}
        label="Copias Disponibles"
        id="copias"
        name="copias"
        defaultValue={libro ? libro.copies : ""}
        variant="outlined"
        type="number"
        required
      />
      <TextField
        className={classes.campo}
        label="Reseña"
        id="resena"
        name="resena"
        defaultValue={libro ? libro.description : ""}
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

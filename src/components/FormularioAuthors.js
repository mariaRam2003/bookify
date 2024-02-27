import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

function FormularioAuthors({ handleSubmit }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [biography, setBiography] = useState("");
  const [nationality, setNationality] = useState("");

  const handleSubmitForm = (event) => {
    event.preventDefault();
    handleSubmit({ name, email, birthDate, biography, nationality });
    setName("");
    setEmail("");
    setBirthDate("");
    setBiography("");
    setNationality("");
  };

  return (
    <form className={classes.formulario} onSubmit={handleSubmitForm}>
      <TextField
        className={classes.campo}
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        className={classes.campo}
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        className={classes.campo}
        label="Birth Date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        className={classes.campo}
        label="Biography"
        value={biography}
        onChange={(e) => setBiography(e.target.value)}
        variant="outlined"
        multiline
        rows={4}
        required
      />
      <TextField
        className={classes.campo}
        label="Nationality"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
        variant="outlined"
        required
      />
      <Button className={classes.button} type="submit" variant="contained">
        Save
      </Button>
    </form>
  );
}

export default FormularioAuthors;

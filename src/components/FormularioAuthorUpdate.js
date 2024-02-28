import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function FormularioAuthorUpdate({ author, onSubmit, updateSuccess }) {
  const [name, setName] = useState(author.name);
  const [email, setEmail] = useState(author.email);
  const [birthDate, setBirthDate] = useState(author.birth_date);
  const [biography, setBiography] = useState(author.biography);
  const [nationality, setNationality] = useState(author.nationality);

  useEffect(() => {
    setName(author.name);
    setEmail(author.email);
    setBirthDate(author.birth_date);
    setBiography(author.biography);
    setNationality(author.nationality);
  }, [author]);

  useEffect(() => {
    if (updateSuccess) {
      // Resetear los campos del formulario después de una actualización exitosa
      setName("");
      setEmail("");
      setBirthDate("");
      setBiography("");
      setNationality("");
    }
  }, [updateSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: name,
      email: email,
      birth_date: birthDate,
      biography: biography,
      nationality: nationality,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Birth Date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <TextField
        label="Biography"
        value={biography}
        onChange={(e) => setBiography(e.target.value)}
        multiline
        rows={4}
      />
      <TextField
        label="Nationality"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
      {updateSuccess && <p>Author updated successfully!</p>}
    </form>
  );
}

export default FormularioAuthorUpdate;

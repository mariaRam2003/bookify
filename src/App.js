import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Style
import "./index.css";

//Pages
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import Buscar from "./Pages/Buscar";
import Usuarios from "./Pages/Usuarios";
import AddBook from "./Pages/AddBook";
import BooksList from "./Pages/BooksList";
import UpdateBook from "./Pages/UpdateBook";
import DeleteBook from "./Pages/DeleteBook";
import SearchBook from "./Pages/SearchBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BOOKS" element={<Books />} />
          <Route path="/BUSCAR" element={<Buscar />} />
          <Route path="/USUARIOS" element={<Usuarios />} />
          <Route path="/ADDBOOK" element={<AddBook />} />
          <Route path="/BOOKSLIST" element={<BooksList />} />
          <Route path="/UPDATEBOOK" element={<UpdateBook />} />
          <Route path="/DELETEBOOK" element={<DeleteBook />} />
          <Route path="/SEARCHBOOK" element={<SearchBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

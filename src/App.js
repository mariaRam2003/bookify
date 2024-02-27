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
import Authors from "./Pages/Authors";
import AddAuthor from "./Pages/AddAuthor";
import UpdateAuthor from "./Pages/UpdateAuthor";
import DeleteAuthor from "./Pages/DeleteAuthor";
import SearchAuthor from "./Pages/SearchAuthor";

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
          <Route path="/AUTHORS" element={<Authors />} />
          <Route path="/ADD_AUTHOR" element={<AddAuthor />} />
          <Route path="/UPDATE_AUTHOR" element={<UpdateAuthor />} />
          <Route path="/DELETE_AUTHOR" element={<DeleteAuthor />} />
          <Route path="/SEARCH_AUTHOR" element={<SearchAuthor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

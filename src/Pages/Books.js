import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/Books.css";
// images
import book1 from "../images/book1.png";
import book2 from "../images/book2.png";
import book3 from "../images/book3.png";
import book4 from "../images/book4.png";
import book5 from "../images/book5.png";
import book6 from "../images/book6.png";
import book7 from "../images/book7.png";
import book8 from "../images/book8.png";
import { Link } from "react-router-dom";

const Books = () => {
  const [showBooks, setShowBooks] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBooks(true);
      setTimeout(() => {
        setShowButtons(true);
      }, 1900); // Adjust timing as needed
    }, 1900); // Adjust timing as needed
  }, []);

  return (
    <div className="books-container">
      <Header />

      <div className={`books ${showBooks ? "books-show" : ""}`}>
        <img src={book1} alt="Book" className="book-image book1-move" />
        <img src={book2} alt="Book" className="book-image book2-move" />
        <img src={book3} alt="Book" className="book-image book3-move" />
        <img src={book4} alt="Book" className="book-image book4-move" />
        <img src={book5} alt="Book" className="book-image book5-move" />
        <img src={book6} alt="Book" className="book-image book6-move" />
        <img src={book7} alt="Book" className="book-image book7-move" />
        <img src={book8} alt="Book" className="book-image book8-move" />
        <div className={`text-container ${showBooks ? "text-show" : ""}`}>
          <h1>Gestiona los libros</h1>
          <p>
            En esta página puedes gestionar los libros de la librería, agregar,
            editar, ver y buscar.
          </p>
          <div
            className={`buttons-container ${showButtons ? "buttons-show" : ""}`}
          >
            <Link
              to="/ADDBOOK"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="buttonBooks">Agregar libro</div>
            </Link>
            <Link
              to="/BOOKSLIST"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="buttonBooks">Listar libros</div>
            </Link>
            <Link
              to="/UPDATEBOOK"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="buttonBooks">Actualizar libro</div>
            </Link>
            <Link
              to="/DELETEBOOK"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="buttonBooks">Eliminar libro</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;

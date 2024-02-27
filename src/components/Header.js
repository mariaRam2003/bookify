import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="button-container">
        <Link to="/books" className="button">
          Books
        </Link>
        <Link to="/buscar" className="button">
          Buscar
        </Link>
        <Link to="/usuarios" className="button">
          Usuarios
        </Link>
      </div>
    </header>
  );
};

export default Header;

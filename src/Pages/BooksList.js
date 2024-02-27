import React, { useState } from "react";
import Header from "../components/Header";
import SearchResult from "../components/SearchResult";
import "../styles/Pages.css";

function BooksList() {
  // Lista de libros de ejemplo
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Libro de ejemplo 1",
      author: "Autor de ejemplo 1",
      imageUrl: "https://via.placeholder.com/150",
      description: "Descripción del libro de ejemplo 1",
    },
    {
      id: 2,
      title: "Libro de ejemplo 2",
      author: "Autor de ejemplo 2",
      imageUrl: "https://via.placeholder.com/150",
      description: "Descripción del libro de ejemplo 2",
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      year: 1925,
      isbn: "978-0743273565",
      copies: 8,
      reviews: 15,
      imageUrl: "https://via.placeholder.com/150",
      description: "A novel depicting the lavish lifestyle of the Jazz Age.",
    },
    {
      id: 4,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic",
      year: 1960,
      isbn: "978-0061120084",
      copies: 6,
      reviews: 12,
      imageUrl: "https://via.placeholder.com/150",
      description:
        "A story of racial injustice and loss of innocence in the American South.",
    },
    {
      id: 5,
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      year: 1949,
      isbn: "978-0451524935",
      copies: 10,
      reviews: 20,
      imageUrl: "https://via.placeholder.com/150",
      description:
        "A dystopian novel portraying a totalitarian regime and surveillance state.",
    },
    {
      id: 6,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      year: 1813,
      isbn: "978-0141439518",
      copies: 7,
      reviews: 18,
      imageUrl: "https://via.placeholder.com/150",
      description:
        "A romantic comedy of manners set in early 19th-century England.",
    },
    {
      id: 7,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Coming-of-age",
      year: 1951,
      isbn: "978-0316769488",
      copies: 4,
      reviews: 9,
      imageUrl: "https://via.placeholder.com/150",
      description:
        "A novel about teenage angst and alienation in post-war America.",
    },
    {
      id: 8,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      year: 1954,
      isbn: "978-0544003415",
      copies: 12,
      reviews: 25,
      imageUrl: "https://via.placeholder.com/150",
      description:
        "An epic high-fantasy novel set in the fictional world of Middle-earth.",
    },
    {
      id: 9,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      year: 1997,
      isbn: "978-0747532743",
      copies: 15,
      reviews: 30,
      imageUrl: "https://via.placeholder.com/150",
      description:
        "The first book in the Harry Potter series, chronicling the adventures of a young wizard.",
    },
    {
      id: 10,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      genre: "Mystery",
      year: 2003,
      isbn: "978-0307474278",
      copies: 9,
      reviews: 17,
      imageUrl: "https://via.placeholder.com/150",
      description:
        "A mystery thriller novel involving a symbologist and a murder investigation.",
    },
  ]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; // Número de libros por página

  // Índices de los libros a mostrar en la página actual
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <h2>Books List</h2>
      <div className="books-list">
        {currentBooks.map((book) => (
          <SearchResult key={book.id} result={book} />
        ))}
      </div>
      {/* Paginación */}
      <div className="pagination">
        {[...Array(Math.ceil(books.length / booksPerPage)).keys()].map(
          (number) => (
            <button key={number} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default BooksList;

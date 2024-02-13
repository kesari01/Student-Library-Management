import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../bookCard/BookCard";
import "./Books.css";

function Books({ role }) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/book/books").then((res) => {
      setBooks(res.data);
      console.log("res.data in Book.jsx", res.data);
    });
  }, []);
  return (
    <div className="book-list">
      {books.map((book) => {
        console.log("book----->", book);
        return <BookCard key={book.bookId} book={book} role={role}></BookCard>;
      })}
    </div>
  );
}

export default Books;

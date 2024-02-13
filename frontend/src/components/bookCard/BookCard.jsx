import { Link } from "react-router-dom";
import "./BookCard.css";
function BookCard({ book, role }) {
  const { bookName, author, bookId, bookImg } = book;
  console.log("books in BookCard.jsx" + book);
  return (
    <div className="book-card">
      <img src={bookImg} alt={bookName} className="book-img" />
      <div className="book-detail">
        <h3>{bookName}</h3>
        <p>Author: {author}</p>
        <p> Book ID: {bookId}</p>
      </div>
      {role === "admin" && (
        <div className="book-action">
          <Link to={`/update-book/${book._id}`}>
            <button className="btn-edit">edit</button>
          </Link>
          <Link to={`/delete-book/${book._id}`}>
            <button className="btn-delete">delete</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookCard;

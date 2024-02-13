import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

function AddBook() {
  const [bookName, setBookName] = useState();
  const [author, setAuthor] = useState();
  const [bookId, setBookId] = useState();
  const [bookImg, setBookImg] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AddBook page", bookName, author, bookId, bookImg);
    axios
      .post("http://localhost:3001/book/add", {
        bookName,
        author,
        bookId,
        bookImg,
      })
      .then((res) => {
        console.log(res);
        if (res.data.added) {
          navigate("/books");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="book-form-container">
      <form className="add-book" onSubmit={handleSubmit}>
        <h2>Add Book</h2>
        <div className="form-group">
          <input
            type="text"
            id="bookName"
            placeholder="Enter Book Name"
            onChange={(e) => setBookName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="author"
            placeholder="Enter Author"
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="bookId"
            placeholder="Enter BookId"
            onChange={(e) => setBookId(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="bookImg"
            placeholder="Paste Image URL"
            onChange={(e) => setBookImg(e.target.value)}
          ></input>
        </div>
        <div className="btn-addBook">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;

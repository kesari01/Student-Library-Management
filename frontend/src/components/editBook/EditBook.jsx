import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const [bookName, setBookName] = useState();
  const [author, setAuthor] = useState();
  const [bookId, setBookId] = useState();
  const [bookImg, setBookImg] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/book/update-book/${id}`)
      .then((res) => {
        // console.log("--", res);
        setBookName(res.data.bookName);
        setAuthor(res.data.author);
        setBookId(res.data.bookId);
        setBookImg(res.data.bookImg);
      })
      .catch((err) => {
        console.log("err in EditBook", err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("EditBook page", bookName, author, bookId, bookImg);
    axios
      .put(`http://localhost:3001/book/update-book/${id}`, {
        bookName,
        author,
        bookId,
        bookImg,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.updated) {
          navigate("/books");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="book-form-container">
      <form className="add-book" onSubmit={handleSubmit}>
        <h2>Edit Book</h2>
        <div className="form-group">
          <input
            type="text"
            id="bookName"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="bookId"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="bookImg"
            value={bookImg}
            onChange={(e) => setBookImg(e.target.value)}
          ></input>
        </div>
        <div className="btn-addBook">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditBook;

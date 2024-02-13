import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Books from "./components/books/Books";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import AddStudent from "./components/addStudent/AddStudent";
import Logout from "./components/logout/Logout";
import AddBook from "./components/addBook/AddBook";
import EditBook from "./components/editBook/EditBook";
import DeleteBook from "./components/deleteBook/DeleteBook";
import Students from "./components/students/Students";
import EditStudent from "./components/editStudent/EditStudent";
import DeleteStudent from "./components/deleteStudent/DeleteStudent";

function App() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify")
      .then((res) => {
        if (res.data.login) {
          // console.log("res.data in App.jsx", res.data);
          // console.log("res.data.role in App.jsx", res.data.role);
          // console.log("profile", res.data.profile);
          setRole(res.data.role);
          setUsername(res.data.username);
        } else {
          setRole("");
          setUsername("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [role, username]);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home username={username} />} />
        <Route path="/books" element={<Books role={role} />} />
        <Route path="/students" element={<Students />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/logout" element={<Logout setRole={setRole} />} />
        <Route path="/update-book/:id" element={<EditBook />} />
        <Route path="/delete-book/:id" element={<DeleteBook />} />
        <Route path="/update-student/:id" element={<EditStudent />} />
        <Route path="/delete-student/:id" element={<DeleteStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ role }) {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-title">
          <Link to="/" className="navbar-link">
            Book Store
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        {role !== "" && (
          <>
            <Link to="/books" className="navbar-link">
              Books
            </Link>
          </>
        )}
        {role === "admin" && (
          <>
            <Link to="/students" className="navbar-link">
              Students
            </Link>
            <Link to="/add-book" className="navbar-link">
              Add Books
            </Link>
            <Link to="/add-student" className="navbar-link">
              Add Student
            </Link>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </>
        )}
        {role === "" ? (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        ) : (
          <Link to="/logout" className="navbar-link">
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;

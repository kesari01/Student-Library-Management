import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [books, setBooks] = useState();
  const [students, setStudents] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data.ok) {
          setStudents(res.data.students);
          setBooks(res.data.books);
        }
      })
      .catch((err) => console.log("error in dashboard.jsx", err));
  }, []);
  return (
    <div className="dashboard">
      <h1>welcome to dashboard</h1>
      <div className="dashboard-box">
        <h2>Total Books: {books}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Total Students: {students}</h2>
      </div>
    </div>
  );
}

export default Dashboard;

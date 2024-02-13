import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentCard from "../studentCard/StudentCard";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/student/students").then((res) => {
      setStudents(res.data);
      console.log("res.data in Student.jsx", res.data);
    });
  }, []);
  return (
    <div className="student-list">
      <h2>Student-detail</h2>
      <div className="student-info">
        <p>Username</p>
        <p>Name</p>
        <p>Semester</p>
      </div>
      {students.map((student) => {
        console.log("student in Student.jsx", students);
        return (
          <StudentCard key={student.studentId} student={student}></StudentCard>
        );
      })}
    </div>
  );
}

export default Students;

import React from "react";
import "./StudentCard.css";
import { Link } from "react-router-dom";

function StudentCard({ student }) {
  const { username, name, semester } = student;
  //   console.log("username", username);
  //   console.log("name", name);
  //   console.log("semester", semester);
  return (
    <div className="student-card">
      <div className="student-details">
        <div className="student-username">{username}</div>
        <div className="student-name">{name}</div>
        <div className="student-semester">{semester}</div>
        <div className="student-action">
          <Link to={`/update-student/${student._id}`}>
            <button className="btn-edit">edit</button>
          </Link>
          <Link to={`/delete-student/${student._id}`}>
            <button className="btn-delete">delete</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;

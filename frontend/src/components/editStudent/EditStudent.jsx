import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/student/update-student/${id}`)
      .then((res) => {
        // console.log("--", res);
        setUsername(res.data.username);
        setName(res.data.name);
        setSemester(res.data.semester);
        setPassword(res.data.password);
      })
      .catch((err) => {
        console.log("err in EditStudent", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/student/update-student/${id}`, {
        username,
        name,
        semester,
        password,
      })
      .then((res) => {
        if (res.data.updated) {
          navigate("/students");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="student-form-container">
      <form className="add-student" onSubmit={handleSubmit}>
        <h2>Edit Student</h2>
        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="Enter Roll No."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="semester"
            placeholder="Enter Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="btn-addStudent">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;

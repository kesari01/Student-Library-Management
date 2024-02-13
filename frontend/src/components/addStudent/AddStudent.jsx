import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

function AddStudent() {
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [semester, setSemester] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/student/register", {
        username,
        name,
        semester,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.registered) {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="student-form-container">
      <form className="add-student" onSubmit={handleSubmit}>
        <h2>Add Student</h2>
        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="Enter Roll No."
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="semester"
            placeholder="Enter Semester"
            onChange={(e) => setSemester(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="btn-addStudent">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;

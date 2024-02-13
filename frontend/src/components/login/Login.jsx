import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("student");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    console.log("username", username);
    console.log("password", password);
    console.log("profile", profile);
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", {
        username,
        password,
        profile,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.login);
        console.log(res.data.profile);
        if (res.data.login && res.data.profile === "admin") {
          console.log("res.data.profile", res.data.profile);
          setRole("admin");
          navigate("/dashboard");
        } else if (res.data.login && res.data.profile === "student") {
          console.log("res.data.profile", res.data.profile);
          setRole("student");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-form">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-username">
          <input
            type="text"
            id="username"
            placeholder="userName"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br />
        </div>
        <div className="input-password">
          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
        </div>
        <div className="input-profile">
          <label htmlFor="Profile">Choose Profile</label>
          <select
            id="profile"
            name="profile"
            onChange={(e) => {
              setProfile(e.target.value);
            }}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="btn-login">
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

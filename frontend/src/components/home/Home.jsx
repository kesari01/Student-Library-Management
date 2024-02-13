import { useEffect } from "react";
import "./Home.css";
import axios from "axios";

function Home({ username }) {
  return (
    console.log("username in Home.jsx", username),
    (
      <div className="home">
        <div className="home-content">
          <h1 className="home-title">Welcome to our Book Store! {username}</h1>
          <p className="home-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque,
            rem mollitia tempore id sequi corrupti perferendis praesentium,
            officiis expedita? Debitis!
          </p>
        </div>
        <div className="home-image"></div>
      </div>
    )
  );
}

export default Home;

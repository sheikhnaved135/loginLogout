import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <button
        onClick={() => navigate("/login")}
        style={{ width: "50vh", marginRight: "20px" }}
      >
        Login
      </button>
      <button onClick={() => navigate("/register")} style={{ width: "50vh" }}>
        Register
      </button>
    </div>
  );
};

export default Home;

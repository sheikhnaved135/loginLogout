import React, { useState } from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgres] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgres(10);
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email,
        password,
      });
      setProgres(70);

      if (res?.data.success) {
        // toast.success(res.data.message);
        navigate("/");
        setProgres(100);
      }
    } catch (error) {
      console.log(error);
      setProgres(100);
    }
    setProgres(100);
  };
  return (
    <div className="container">
      <LoadingBar progress={progress} />
      {/* <ToastContainer position="top-center" autoClose={500} /> */}
      <form className="login" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group email">
          <label htmlFor="exampleInputEmail1">Email </label>
          <input
            type="email"
            className="form-control email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          style={{ marginTop: "10px", placeItems: "center" }}
          type="submit form"
          className="btn btn-primary form-control"
        >
          Submit
        </button>
        <button
          style={{ marginTop: "10px", placeItems: "center" }}
          type="submit form"
          className="btn btn-primary form-control"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;

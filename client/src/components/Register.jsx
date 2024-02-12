import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);

  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(0);
    try {
      const userData = new FormData();
      userData.append("name", name);
      userData.append("email", email);
      userData.append("password", password);
      userData.append("photo", photo);
      setProgress(50);

      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        userData
      );
      if (res.data.success) {
        navigate("/");
      }
      setProgress(70);
    } catch (error) {}
    setProgress(100);
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
        <div className="form-group email">
          <label htmlFor="exampleInputEmail1">Email </label>
          <input
            type="text"
            className="form-control email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        </div>{" "}
        <div>
          <label className="btn btn-outline-secondary w-100 mt-3 ">
            {photo ? photo.name : "Upload profile photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              hidden
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
        </div>
        {/* {console.log(URL.createObjectURL(photo))} */}
        <div className="text-center mt-3">
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt=""
              style={{ height: "200px" }}
            />
          )}
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
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;

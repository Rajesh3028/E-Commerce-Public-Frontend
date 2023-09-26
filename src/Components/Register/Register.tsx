import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Store/store";
import { addUser } from "../../Store/features/userSlice";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function registerHandler(e: any) {
    e.preventDefault();
    const data = {
      id: Math.floor(Math.random() * 1000000),
      name: name,
      email: email,
      password: password,
    };
    dispatch(addUser(data));
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    alert("Registered Successfully");
    navigate("/login");
  }

  return (
    <div className="register-container">
      <form className="form" onSubmit={registerHandler}>
        <div>
          <h1 className="register-title">Register</h1>
        </div>
        <div className="form-ip-sec">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter full name"
            required
            onChange={(e: any) => setName(e.target.value)}
          ></input>
        </div>

        <div className="form-ip-sec">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e: any) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="form-ip-sec">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e: any) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="form-ip-sec">
          <label htmlFor="confirmpassword">Password:</label>
          <input
            type="password"
            id="confirmpassword"
            placeholder="Confirm password"
            required
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label />
          <button className="submit-btn" type="submit">
            Register
          </button>
        </div>
        <div className="new-user-register">
          <label />
          <div>
            Already have an account?
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

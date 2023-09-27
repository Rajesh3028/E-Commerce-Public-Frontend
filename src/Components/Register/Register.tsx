import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Store/store";
import { signUpUser } from "../../Store/features/authSlice";
import { useAppSelector } from "../../Store/store";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error, message } = useAppSelector((state) => state.user);

  function registerHandler(e: any) {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      first_name: name,
      last_name: "Muneshwar",
      phone_number: phone,
      date_of_birth: "12/01/1998",
      address: "abcd efgh i",
      confirm_password: password,
    };
    dispatch(signUpUser(data));

    // navigate("/login");
  }

  return (
    <div className="register-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {message && <p>{message} </p>}
      <form className="form" onSubmit={registerHandler}>
        <div>
          <h1 className="register-title">Register</h1>
        </div>
        <div className="form-ip-sec">
          <label htmlFor="name">User Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Your User Name"
            required
            onChange={(e: any) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="form-ip-sec">
          <label htmlFor="name">Phone:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Mobile No."
            required
            onChange={(e: any) => setPhone(e.target.value)}
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
          <label htmlFor="confirmpassword">Name:</label>
          <input
            type="text"
            id="confirmpassword"
            placeholder="Your Name"
            required
            onChange={(e: any) => setName(e.target.value)}
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

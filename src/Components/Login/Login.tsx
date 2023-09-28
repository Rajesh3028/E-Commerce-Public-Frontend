import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../Store/features/authSlice";
import { useAppDispatch } from "../../Store/store";
import { useAppSelector } from "../../Store/store";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { loading, message } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const signInHandler = async (e: any) => {
    e.preventDefault();
    const id = toast.loading("Logging in");
    const data = {
      username: email,
      password: password,
    };
    try {
      const response = await dispatch(signInUser(data));

      if (response.payload.success) {
        navigate("/");
        toast.update(id, {
          render: "Logged In Successful",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
      }
    } catch (error) {}
  };

  return (
    <div className="signin-container">
      <form className="form" onSubmit={signInHandler}>
        <div>
          <h1>Sign In</h1>
        </div>

        <div className="form-ip-sec">
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="form-ip-sec">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="submit-btn" type="submit">
            Sign In
          </button>
        </div>
        <div className="new-user-register">
          <label />
          <div>
            New user?
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

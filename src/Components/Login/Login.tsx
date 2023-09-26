import React, { useState } from "react";
import "./Login.css";
import { Link,useNavigate } from "react-router-dom";
import { useAppSelector } from "../../Store/store";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
 
  const navigate = useNavigate();

  const Users = useAppSelector((state) => state.users.users);

  console.log(Users);

  const signInHandler = (e:any) => {
    e.preventDefault();
    console.log(Users);
   const signIn = Users.find((user) => user.email === email && user.password === password);
   console.log(signIn);
   if(signIn){
     alert('Login Successful');
     localStorage.setItem('user',JSON.stringify(signIn));
     navigate('/');

   }else{
    alert('Login Failed');
   }
  }
  ;

  return (
    <div className="signin-container">
      <form className="form" onSubmit={signInHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {/* {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>} */}
        <div className="form-ip-sec">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
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
            <Link to='/register'>Create Account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

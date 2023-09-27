import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { FcShop } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch } from "../../Store/store";
import { logOut } from "../../Store/features/authSlice";
import { useAppSelector } from "../../Store/store";
const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <nav className="navbar-main">
      <div className="container-navbar">
        <div className="logo">
          <Link to="/">
            <FcShop size={30} />
          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <GiHamburgerMenu size={30} />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

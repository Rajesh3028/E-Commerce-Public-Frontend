import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { FcShop } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch } from "../../Store/store";
import { logOut } from "../../Store/features/authSlice";
import { useAppSelector } from "../../Store/store";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.user);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Logout Successfull");
  };
  return (
    <nav className="navbar-main">
      <div className="container-navbar">
        <div className="logo">
          <Link to="/">
            <FcShop size={30} />
          </Link>
        </div>

        <div className="search_container shadow">
          <div className="search_box">
            <button className="search_btn">
              <svg
                width="24"
                height="24"
                className=""
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                
                <path
                  d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
                  stroke="#717478"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M16 16L21 21"
                  stroke="#717478"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <div className="search_input">
              <input className="search" type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "200px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="dropdown">
            <div className="dropbtn">
              <img
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg"
                alt=""
              />
              <button className="dropbtn">
                {user.first_name ? user.first_name : "Sign In"}
              </button>
            </div>
            <div className="dropdown-content">
              <div>
                {!isAuthenticated && (
                  <div className="new_customer">
                    <Link className="register_link" to="/register">
                      <span>New Customer?</span>
                      <span> Register</span>
                    </Link>
                  </div>
                )}

                <Link className="dropdown_item" to="/profile">
                  <div className="dropdown_subitems">
                    <img
                      src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-815786.svg"
                      alt=""
                    />
                  </div>
                  My Profile
                </Link>
                <Link className="dropdown_item" to="/profile">
                  <div className="dropdown_subitems">
                    <img
                      src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/orders-bfe8c4.svg"
                      alt=""
                    />
                  </div>
                  Orders
                </Link>

                {isAuthenticated && (
                  <button
                    className="dropdown_item"
                    onClick={handleLogout}
                    style={{ border: "none", outline: "none" }}
                  >
                    <div className="dropdown_subitems">
                      <img
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logout-e63ddf.svg"
                        alt=""
                      />
                    </div>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="cart_container_icon">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg"
              alt=""
            />
            <Link style={{ padding: "5px" }} to="/cart">
              Cart
            </Link>
          </div>
        </div>

        <div className="menu-icon" onClick={handleShowNavbar}>
          <GiHamburgerMenu size={30} />
        </div>

        {/* <div className={`nav-elements  ${showNavbar && "active"}`}>
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
              {isAuthenticated && (
                <button onClick={handleLogout}>
                  {user ? user.username : "Guest"}Logout
                </button>
              )}
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;

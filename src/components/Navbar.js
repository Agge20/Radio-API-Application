import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Styles from "../styles/NavbarS.module.css";

const Navbar = () => {
  const { registerUser, isLoggedIn } = useContext(UserContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="Link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/all-channels" className="Link">
            Channels
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/profile" className="Link">
              Profile
            </Link>
          ) : (
            <Link to="/register-and-login" className="Link">
              Register/Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

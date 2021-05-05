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
            Hem
          </Link>
        </li>
        <li>
          <Link to="/all-channels" className="Link">
            Kanaler
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/profile" className="Link">
              Profil
            </Link>
          ) : (
            <Link to="/register-and-login" className="Link">
              Registrera/Logga in
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

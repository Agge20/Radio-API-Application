import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import styles from "../styles/RegisterLogin.module.css";

const RegisterLogin = () => {
  const history = useHistory();
  const { registerUser, logInUser, isLoggedIn } = useContext(UserContext);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    registerUser(registerEmail, registerPassword);
    history.push("registered");
  };
  const handleRegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };
  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    logInUser(loginEmail, loginPassword);
  };
  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };
  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };
  if (isLoggedIn) {
    history.push("/logged-in");
  }
  return (
    <div className={styles.main_wrapper}>
      <h2 className={styles.header}>Registrera dig</h2>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="text"
          placeholder="Enter an email"
          value={registerEmail}
          onChange={handleRegisterEmailChange}
        />
        <input
          type="text"
          placeholder="Enter a password"
          value={registerPassword}
          onChange={handleRegisterPasswordChange}
        />
        <button onClick={handleRegister}>Registrera</button>
      </form>

      <h2 className={styles.header}> Eller logga in</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="text"
          placeholder="Enter an email"
          value={loginEmail}
          onChange={handleLoginEmailChange}
        />
        <input
          type="text"
          placeholder="Enter a password"
          value={loginPassword}
          onChange={handleLoginPasswordChange}
        />
        <button onClick={handleLogin}>Logga in</button>
      </form>
    </div>
  );
};

export default RegisterLogin;

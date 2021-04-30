import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

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
    history.push("profile");
  }
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button onClick={handleRegister}>Submit</button>
      </form>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button onClick={handleLogin}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterLogin;

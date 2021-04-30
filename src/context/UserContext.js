import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  //Register user fetch
  const registerUser = async (newEmail, newPassword) => {
    let userToRegister = {
      email: `${newEmail}`,
      password: `${newPassword}`,
    };
    await fetch("/api/v1/users/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userToRegister),
    });
  };

  //Login the user
  const logInUser = async (email, password) => {
    let personToLogIn = {
      email: `${email}`,
      password: `${password}`,
    };
    let status = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(personToLogIn),
    });

    status = await status.json();
    console.log("this is status", status);
    //Now we check if a person was logged in

    // if (status.success) {
    //   setIsLoggedIn(true);
    //   setLoggedInUser(status.loggedInUser);
    //   alert("logged in!");
    // } else {
    //   alert("An error occured!");
    // }
  };

  const values = { registerUser, isLoggedIn, logInUser, loggedInUser };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;

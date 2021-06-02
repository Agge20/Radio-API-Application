import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    email: "please log in to view this page",
  });

  const whoami = async () => {
    let sessionUser = await fetch("/api/v1/users/whoami", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    sessionUser = await sessionUser.json();
    console.log("whoami result: ", sessionUser);
    if (sessionUser.email) {
      setLoggedInUser(sessionUser);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    whoami();
  }, []);
  //Register user fetch
  const registerUser = async (newEmail, newPassword) => {
    let userToRegister = {
      email: `${newEmail}`,
      password: `${newPassword}`,
    };
    let result = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userToRegister),
    });
    //Check if userAlready exist property exists
    if (result.alreadyExist) {
      alert("That user already exists!");
    }
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

    if (status.success) {
      setIsLoggedIn(true);
      console.log("JUMO", status.loggedInUser);
      setLoggedInUser(status.loggedInUser);
    } else {
      alert("Not correct password/email");
    }
  };

  const logOutUser = async () => {
    let status = await fetch("/api/v1/users/logout");
    status = await status.json();
    if (status.success) {
      setIsLoggedIn(false);
      setLoggedInUser({
        email: "please log in to view this page",
      });
    } else {
      alert("An error occured!");
    }
  };

  const values = {
    registerUser,
    isLoggedIn,
    logInUser,
    loggedInUser,
    logOutUser,
    whoami,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;

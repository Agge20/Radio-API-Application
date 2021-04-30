import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const history = useHistory();
  const { loggedInUser, logOutUser, isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    history.push("/");
  }

  return (
    <div>
      <h1>Welcome, {loggedInUser.email}</h1>
      <button onClick={logOutUser}>Log out</button>
    </div>
  );
};

export default Profile;

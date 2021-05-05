import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const FavoritesContext = createContext();

const FavoritesProvider = (props) => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const [userFavourites, setUserFavourites] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);

  const addFavoriteToUser = async (dataToSend) => {
    console.log("Data to send", dataToSend);
    let result = await fetch("/api/v1/favorites/save-favorite", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    result = await result.json();
    if (result.success) {
      alert("added favorite!");
    }
    return result;
  };

  const getAllFavorites = async (userId) => {
    let allFavorites = await fetch(`/api/v1/favorites/all-favorites`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    allFavorites = await allFavorites.json();
    setUserFavorites(allFavorites);
    console.log("Here is userFavorites in Context:", userFavorites);
  };
  const values = {
    addFavoriteToUser,
    getAllFavorites,
    userFavorites,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;

import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const FavoritesContext = createContext();

const FavoritesProvider = (props) => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  const [userFavourites, setUserFavourites] = useState(null);
  const [userProgramFavorites, setUserProgramFavorites] = useState([]);
  const [userFavorites, setUserFavorites] = useState({});

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
      alert("Tillagd som favorit!");
    } else {
      alert("Redan tillagd som favorit!");
    }
    return result;
  };

  const getAllFavorites = async (userId) => {
    let allFavorites = await fetch("/api/v1/favorites/all-channel-favorites", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userId),
    });

    allFavorites = await allFavorites.json();
    console.log("allFavorites", allFavorites);
    setUserFavorites(allFavorites);
    console.log("Here is userFavorites in Context:", userFavorites);
  };

  const getAllProgramFavorites = async (userId) => {
    let allFavorites = await fetch("/api/v1/favorites/all-program-favorites", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    allFavorites = await allFavorites.json();
    console.log("allFavorites in context", allFavorites);
    setUserProgramFavorites(allFavorites);
    console.log("userProgramFavorites in context", userProgramFavorites);
  };

  const deleteFavoriteChannel = async (userId, channelId) => {
    let bodyToSend = { userId: `${userId}`, channelId: `${channelId}` };
    let favoriteToDelete = await fetch(
      "/api/v1/favorites/delete-favorite-channel",
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bodyToSend),
      }
    );
    favoriteToDelete = await favoriteToDelete.json();
    //Reset the list of userFavorites
    if (favoriteToDelete.success) {
      setUserFavourites(favoriteToDelete);
    }
  };

  const deleteFavoriteProgram = async (userId, programId) => {
    let bodyToSend = { userId: `${userId}`, programId: `${programId}` };
    let favoriteToDelete = await fetch(
      "/api/v1/favorites/delete-favorite-program",
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bodyToSend),
      }
    );
    favoriteToDelete = await favoriteToDelete.json();
    //Reset the list of userFavorites
    if (favoriteToDelete.success) {
      setUserProgramFavorites(favoriteToDelete);
    }
  };

  const values = {
    addFavoriteToUser,
    getAllFavorites,
    userFavorites,
    deleteFavoriteChannel,
    getAllProgramFavorites,
    userProgramFavorites,
    deleteFavoriteProgram,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;

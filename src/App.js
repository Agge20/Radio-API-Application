import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Channels from "./pages/Channels.js";
import Channel from "./pages/Channel.js";
import Profile from "./pages/Profile.js";
import CategoryPrograms from "./pages/CategoryPrograms.js";
import ChannelsProvider from "./context/ChannelsContext";
import UserProvider from "./context/UserContext.js";
import FavoritesProvider from "./context/FavoritesContext.js";
import Navbar from "./components/Navbar.js";
import RegisterLogin from "./pages/RegisterLogin.js";
import Registered from "./pages/Registered.js";
import LoggedIn from "./pages/LoggedIn.js";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <FavoritesProvider>
          <ChannelsProvider>
            <BrowserRouter>
              <Navbar />
              <Route exact path="/" component={Home} />
              <Route exact path="/all-channels" component={Channels} />
              <Route exact path="/channel/:channelId" component={Channel} />
              <Route
                path="/kategori/:categoryId"
                component={CategoryPrograms}
              />
              <Route path="/profile" component={Profile} />
              <Route path="/register-and-login" component={RegisterLogin} />
              <Route path="/registered" component={Registered} />
              <Route path="/logged-in" component={LoggedIn} />
            </BrowserRouter>
          </ChannelsProvider>
        </FavoritesProvider>
      </UserProvider>
    </div>
  );
}

export default App;

import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Channels from "./pages/Channels.js";
import Channel from "./pages/Channel.js";
import CategoryPrograms from "./pages/CategoryPrograms.js";
import ChannelsProvider from "./context/ChannelsContext";

function App() {
  return (
    <div className="App">
      <ChannelsProvider>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/all-channels" component={Channels} />
          <Route exact path="/channel/:channelId" component={Channel} />
          <Route path="/kategori/:categoryId" component={CategoryPrograms} />
        </BrowserRouter>
      </ChannelsProvider>
    </div>
  );
}

export default App;

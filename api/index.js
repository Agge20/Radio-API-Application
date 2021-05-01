express = require("express");
const session = require("express-session");

const port = 3001;

const channelRoutes = require("./routes/channelRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const favoritesRoutes = require("./routes/favoritesRoutes.js");

// const programRoutes = require("./routes/programRoutes");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "veni vidi vici",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use("/api/v1", channelRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/favorites", favoritesRoutes);
// JAG GLÖMDE LÄGGA PROGRAM-ROUTES I EN EGEN ROUTES-FIL - URSÄKTA ^^
// app.use("/api/v1/programs", programRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

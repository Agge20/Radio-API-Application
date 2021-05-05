const path = require("path");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  path.join(__dirname, "../../radio-SE-Database.db")
);

// const getAllFavorites = (req, res) => {
//   const allFavorites = {};
//   db.all(`SELECT * FROM `)
// };

const saveFavorite = (req, res) => {
  //User added a channel to favorites
  if (req.body.channelId) {
    let query = `INSERT INTO channels (channelId, channelName, userId) VALUES ($channelId, $channelName, $userId)`;
    let params = {
      $userId: req.body.userId,
      $channelId: req.body.channelId,
      $channelName: req.body.channelName,
    };

    db.run(query, params, function (err, result) {
      if (err) {
        res.status(404).json({ error: err });
        return;
      } else {
        res.json({ success: "New channel added to favorites" });
      }
    });
  }
  //If user added a program
  else if (req.body.programId) {
    let query = `INSERT INTO programs (programId, programName, userId) VALUES ($programId, $programName, $userId)`;
    let params = {
      $userId: req.session.user.userId,
      $program: req.body.programId,
      $programName: req.body.programName,
    };

    //Now we run the query
    db.run(query, params, (err, status) => {
      if (err) {
        res.status(404).json({ error: err });
        return;
      } else {
        res.json({ success: "New program added to favorites" });
      }
    });
  }
};

getAllFavorites = (req, res) => {
  const allFavorites = {};
  db.all(
    `SELECT * FROM channels WHERE userId = $id`,
    { $id: req.body.userId },
    (err, result) => {
      if (err) {
        res.json({ error: err });
        return;
      } else {
        allFavorites.channels = result;
        res.json(allFavorites);
      }
    }
  );
};

module.exports = {
  saveFavorite,
  getAllFavorites,
};

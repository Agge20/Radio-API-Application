const path = require("path");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
  path.join(__dirname, "../../radio-SE-Database.db")
);

// const getAllFavorites = (req, res) => {
//   const allFavorites = {};
//   db.all(`SELECT * FROM `)
// };

//add channel to favorites
const saveFavorite = (req, res) => {
  //User added a channel to favorites
  if (req.body.channelId) {
    console.log(req.body);

    let firstQuery = `SELECT * FROM channels WHERE channelId = $channelId AND userId = $userId`;
    let firstParams = {
      $userId: req.body.userId,
      $channelId: req.body.channelId,
    };

    db.get(firstQuery, firstParams, function (err, result) {
      console.log("KAMBUGA:", result);
      if (err) {
        res.status(404).json({ error: err });
        return;
      }
      if (!result) {
        secondQuery = `INSERT INTO channels (channelId, channelName, userId) VALUES ($channelId, $channelName, $userId)`;
        secondParams = {
          $userId: req.body.userId,
          $channelId: req.body.channelId,
          $channelName: req.body.channelName,
        };

        db.run(secondQuery, secondParams, function (err, result) {
          if (err) {
            res.status(404).json({ error: err });
            return;
          } else {
            res.json({
              success: "New channel added to favorites",
              result: result,
            });
          }
        });
        return;
      } else {
        res
          .status(404)
          .json({ error: "Already marked that channel as favorite" });
        return;
      }
    });
  }
  //If user added a program
  else if (req.body.programId) {
    let firstQuery = `SELECT * FROM programs WHERE programId = $programId AND userId = $userId`;
    let firstParams = {
      $userId: req.body.userId,
      $programId: req.body.programId,
    };
    db.get(firstQuery, firstParams, function (err, result) {
      if (err) {
        res.status(404).json({ error: err });
        return;
      }
      if (!result) {
        secondQuery = `INSERT INTO programs (programId, programName, userId, programUrl) VALUES ($programId, $programName, $userId, $programUrl)`;
        secondParams = {
          $userId: req.body.userId,
          $programId: req.body.programId,
          $programName: req.body.programName,
          $programUrl: req.body.programUrl,
        };

        db.get(secondQuery, secondParams, function (err, result) {
          if (err) {
            res.status(404).json({ error: err });
            return;
          } else {
            res.json({
              success: "New program added to favorites",
              result: result,
            });
          }
        });
        return;
      } else {
        res
          .status(404)
          .json({ error: "Already marked that program as favorite" });
        return;
      }
    });
  }
};

const getAllChannelFavorites = (req, res) => {
  let allFavorites = {};
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

const getAllProgramFavorites = (req, res) => {
  let allFavorites = {};
  db.all(
    `SELECT * FROM programs WHERE userId = $id`,
    { $id: req.body.userId },
    (err, result) => {
      if (err) {
        res.json({ error: err });
        return;
      } else {
        allFavorites.programs = result;
        console.log(allFavorites);
        res.json(allFavorites);
      }
    }
  );
};

//Delete favorite channel from user
const deleteFavorite = (req, res) => {
  let query;
  let params = { $channelId: req.body.channelId, $userId: req.body.userId };

  //If user wants to delete a channel...
  if (req.body.channelId) {
    query = `DELETE FROM channels WHERE channelId = $channelId AND userId = $userId `;
    db.run(query, params, function (err) {
      if (err) {
        res.json({ error: "error", err });
      } else {
        res.json({
          success: "The channel has been deleted from userFavorites",
          changes: this.changes,
        });
      }
    });
  }
};

//Delete favorite from user
const deleteProgramFavorite = (req, res) => {
  let query;
  let params = { $programId: req.body.programId, $userId: req.body.userId };

  //If user wants to delete a channel...
  if (req.body.programId) {
    query = `DELETE FROM programs WHERE programId = $programId AND userId = $userId `;
    db.run(query, params, function (err) {
      if (err) {
        res.json({ error: "error", err });
      } else {
        res.json({
          success: "The program has been deleted from userFavorites",
          changes: this.changes,
        });
      }
    });
  }
};

module.exports = {
  saveFavorite,
  getAllChannelFavorites,
  getAllProgramFavorites,
  deleteFavorite,
  deleteProgramFavorite,
};

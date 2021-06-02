const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt");
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../../radio-SE-Database.db")
);

// With the whoami we check if someone is logged in
const whoami = (req, res) => {
  let user;
  if (req.session.user) {
    user = req.session.user;
    res.json(user);
    return;
  } else {
    user = "No session user";
    res.json(user);
    return;
  }
};

const login = (req, res) => {
  //First we find a email that matches the req.body.email inside the database
  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };

  //Now we get that user from the database with the following syntax
  db.get(query, params, (err, dbUser) => {
    if (err) {
      res.status(404).json({ error: "Error" });
    }

    if (!dbUser) {
      res.status(404).json({ error: "That user does not exist." });
      return;
    }

    //Here we want to hash to password so it can be matched with the hashed password in the database
    req.body.password = Encrypt.encrypt(req.body.password);

    //After that we check if the password also is correct
    if (dbUser.password === req.body.password) {
      delete dbUser.password;
      req.session.user = dbUser;
      res.json({ success: "You are now logged in", loggedInUser: dbUser });
      return;
    } else {
      res.status(401).json({ error: "Not correct credentials" });
      return;
    }
  });
};

//Logout user
const logout = (req, res) => {
  delete req.session.user;
  res.json({ success: "Logout Successfully" });
};

//register user
const register = (req, res) => {
  let userToRegister = req.body;
  //Checking if user already exist

  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: userToRegister.email };
  db.get(query, params, (err, existingUser) => {
    if (existingUser) {
      res
        .status(400)
        .json({ alreadyExist: "User with that email already exists" });
      return;
    } else if (err) {
      res.status(404).json({ error: "An error occured..." });
    }
  });

  //If the user dosen't already exist then we can proceed to create one
  userToRegister.password = Encrypt.encrypt(userToRegister.password);
  query = `INSERT INTO users (email, password) VALUES ($email, $password)`;
  params = {
    $email: userToRegister.email,
    $password: userToRegister.password,
  };

  //We do a db run when we want to add something to the database
  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "User register successfull", lastID: this.lastID });
  });
};

// Export the differents route handlers
module.exports = { whoami, login, register, logout };

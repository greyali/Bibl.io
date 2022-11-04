const express = require("express");
const cookieSession = require("cookie-session");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const mongoURI = "mongodb://localhost:27017";
const assert = require("assert");
const bodyParser = require("body-parser");
const dbName = "Literate";
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
router.use(express.json());
// Middleware that parses urlencoded bodies and looks at requests where the Content-Type header matches the type option.
router.use(express.urlencoded({ extended: true }));

const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

client.connect((err) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
});

// Get (Read) user route
// Verify user
router.get("/login/:username/:password", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("users");
  const username = req.params.username;
  const password = req.params.password;

  try {
    const user = await collection.findOne({ username: username });
    const foundPass = user.password;
    if (foundPass === password) {
      res.status(200).send({ message: "User verified" });
    } else {
      res.status(200).send({ message: "User/PW not found" });
    }
  } catch (error) {
    const message = "Error in verifying user";
    res.status(200).send({ message: message });
  }
});

// Create user route
router.post("/create", async function (req, res) {
  const db = client.db(dbName);
  const collection = db.collection("users");
  const username = req.body.username;
  const password = req.body.password;

  // Create new user object
  const user = {
    username,
    password,
    favorites: [],
  };

  try {
    const newUser = await collection.insertOne(user);
    res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(200).json({ message: error });
  }
});

// Will not have update or delete routes for users just yet

// Get (Read) user's favorite books route
router.get("/users/favorites/:username", async function (req, res) {
  console.log("received request for favorites of user: " + req.params.username);
  const db = client.db(dbName);
  const collection = db.collection("users");
  const username = req.params.username;

  try {
    const user = await collection.findOne({ username: username });
    const favorites = user.favorites;
    console.log(favorites);
    res.status(200).json({ message: favorites });
  } catch (error) {
    res.status(200).json({ message: "Error retrieving favorites" });
  }
});

router.post("/users/favorites/:username", async function (req, res) {
  // Will add a book to the user's favorites
  // Should receive book info in body
  console.log("Received request to add book to favorites");
  const db = client.db(dbName);
  const collection = db.collection("users");
  const username = req.params.username;
  const book = req.body.book;
  console.log("book object in router: ", book);

  try {
    const user = await collection.findOne({ username: username });
    const favorites = user.favorites;
    favorites.push(book);
    await collection.updateOne(
      { username: username },
      { $set: { favorites: favorites } }
    );
    res.status(200).send({ message: "Book added to favorites" });
  } catch (error) {
    res.status(200).send({ message: error });
  }
});

module.exports = router;

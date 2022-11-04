const path = require("path");

const express = require("express");

const router = require("./routes/router");

const dbRouter = require("./routes/dbRouter");

const cookieSession = require("cookie-session");

const {
  PORT = 3001
} = process.env;
const app = express(); // Middleware that parses json and looks at requests where the Content-Type header matches the type option.

app.use(express.json()); // Serve API requests from the router

app.use("/api", router); // Serve DB requests from the router

app.use("/db", dbRouter); // Serve app production bundle

app.use(express.static("dist/app")); // Handle client routing, return all requests to the app

app.get("*", (_req, res) => {
  return res.sendFile(path.join(__dirname, "app/index.html"));
});
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
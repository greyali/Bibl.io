import React, { useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Welcome from "./components/Welcome/Welcome";
import BooksDisplay from "./components/BooksDisplay";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/playfair-display";
import {
  Box,
  Fab,
  getFabUtilityClass,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Paper } from "@mui/material";
import { ClassNames } from "@emotion/react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { flushSync, unmountComponentAtNode } from "react-dom";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import { get } from "mongoose";
import FavoritesDisplay from "./components/FavoritesDisplay";
import { Button } from "bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { Tabs, Tab } from "@mui/material";

function App(Component) {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const booksArray = [];
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [mockVal, setMockVal] = useState("one");

  const updateFavorites = async (favorites) => {
    console.log("updating favorites");
    const retrievedFavorites = await fetch(`/db/users/favorites/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("retrievedFavorites: ", retrievedFavorites);
    const data = await retrievedFavorites.json();
    // Return of data is an array of objects
    console.log("data: ", data);
    setFavorites(data.message);

    handleOpen();
  };

  const handleOpen = async () => {
    setOpen(true);
  };

  const theme = createTheme({
    status: {
      error: "#000000",
    },
    input: {
      color: "#000000",
    },
  });

  const handleChange = (e) => {
    if (e.target.id === "search") {
      setSearch(e.target.value);
    }
    if (e.target.id === "username") {
      setUsername(e.target.value);
    }
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  async function searchQuery() {
    console.log("current search input is: ", { search });
    const response = await fetch(`/api/libgen/${search}`, {
      method: "GET",
    });
    const data = await response.json();
    setBooks(data.message);
  }

  async function handleLogin() {
    console.log("handleLogin() called");
    // send post request to backend to check if user exists
    const response = await fetch(`/db/login/${username}/${password}`, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data.message);
    if (data.message !== "User verified") {
      // error alert message
      // incorrect user and/or password
      console.log("incorrect user and/or password");
      alert("Incorrect username and/or password");
    }
    if (data.message === "User verified") {
      // successful login
      // send alert message
      // unrender login/signup elements
      document.getElementById("login-form").style.display = "none";
      const signedIn = document.createElement("div");
      signedIn.innerHTML = "Signed in as " + username;
      signedIn.setAttribute("style", "color: white");
      signedIn.setAttribute("id", "signed-in");
      document.getElementById("login-container").appendChild(signedIn);
      window.localStorage.setItem("username", username);
      alert("Login successful");
      console.log("User found");
    }
  }

  async function handleSignup() {
    console.log("handleSignup() called");
    // send post request to backend to create new user in db
    const response = await fetch(`db/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    window.localStorage.setItem("username", username);
    document.getElementById("login-form").style.display = "none";
    const signedIn = document.createElement("div");
    signedIn.innerHTML = "Signed in as " + username;
    signedIn.setAttribute("style", "color: white");
    signedIn.setAttribute("id", "signed-in");
    document.getElementById("login-container").appendChild(signedIn);
    alert("Signup successful");
    const data = await response.json();
    console.log("response from handleSignup(): ", data.message);
  }

  const mockChange = (e, newValue) => {
    setMockVal(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className={styles.App}>
          <div className="head-bar">
            <p id="title" style={{ font: "Montserrat", paddingBottom: "60px" }}>
              BIBL.IO
            </p>
            <Box
              id="tabs-box"
              sx={{
                position: "absolute",
                left: "17em",
                top: "17px",
                color: "white",
              }}
            >
              <Tabs
                className="tab"
                value={mockVal}
                onChange={mockChange}
                textColor="white"
                indicatorColor="white"
              >
                <Tab
                  className="child-tab"
                  value="one"
                  label="Home"
                  sx={{ backgroundColor: "#eb5e28" }}
                />
                <Tab className="child-tab" value="two" label="About" />
              </Tabs>
            </Box>
            <div
              id="login-container"
              className="login-container"
              style={{ height: "45px" }}
            >
              <div id="login-form" className="login-form">
                <TextField
                  className="login-input"
                  required
                  id="username"
                  label="Username"
                  size="small"
                  variant="standard"
                  value={username}
                  onChange={handleChange}
                  sx={{
                    color: "white",
                    backgroundColor: "1c1d23",
                    borderRadius: "4px",
                    marginRight: "8px",
                    margin: "normal",
                    textTransform: "uppercase",
                  }}
                  style={{ textTransform: "uppercase" }}
                />
                <TextField
                  className="login-input"
                  required
                  id="password"
                  label="Password"
                  size="small"
                  variant="standard"
                  value={password}
                  onChange={handleChange}
                  sx={{
                    backgroundColor: "#1c1d23",
                    borderRadius: "4px",
                    marginRight: "8px",
                    textTransform: "uppercase",
                  }}
                  style={{ textTransform: "uppercase" }}
                />
                <button
                  className="loginButton"
                  id="login-button"
                  onClick={handleLogin}
                  style={{
                    fontSize: "12px",
                    width: "80px",
                    borderRadius: "6px",
                  }}
                >
                  LOGIN
                </button>
                <button
                  className="loginButton"
                  id="signup-button"
                  onClick={handleSignup}
                  style={{
                    fontSize: "12px",
                    width: "80px",
                    borderRadius: "6px",
                  }}
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
          <div className="ribbon-container">
            <div className="search-field-container">
              <TextField
                className="search-field"
                id="search"
                label="Search"
                variant="standard"
                onChange={handleChange}
                value={search}
                sx={{
                  width: "100%",
                  textTransform: "uppercase",
                }}
              />
            </div>
            <div className="searchButtonContainer">
              <IconButton
                sx={{
                  transform: "scale(150%)",
                  color: "white",
                  position: "relative",
                  top: "1.55em",
                  left: "-3.6em",
                }}
                aria-label="search"
                onClick={searchQuery}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-favorites"
            aria-describedby="modal-favorited-books"
          >
            <Box>
              <button
                id="modal-close"
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "0px",
                  fontSize: "20px",
                  backgroundColor: "transparent",
                  color: "white",
                  border: "none",
                }}
                onClick={handleClose}
              >
                X
              </button>
              <FavoritesDisplay
                books={favorites}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </Box>
          </Modal>
          <div className="booksDisplayContainer">
            <BooksDisplay books={books} favorites={favorites} />
          </div>
          <div className="favoritesButtonContainer">
            <Fab
              variant="extended"
              onClick={updateFavorites}
              sx={{
                // backgroundColor: "rgb(216, 112, 59)",
                backgroundColor: "#eb5e28",
                position: "fixed",
                bottom: "20px",
                right: "20px",
              }}
            >
              <NavigationIcon sx={{ mr: 1 }} />
              Favorites
            </Fab>
          </div>
          <Switch>
            <Route path="/"></Route>
          </Switch>
        </div>
        <div className="footer">
          <div id="separator"></div>
          <div id="separator"></div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

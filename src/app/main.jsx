import React from "react";
import ReactDOM from "react-dom";
import "./globals.css";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/playfair-display";

ReactDOM.render(
  <React.StrictMode>
    <App className="app" />
  </React.StrictMode>,
  document.querySelector("#root")
);

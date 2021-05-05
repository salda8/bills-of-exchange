import React from "react";
import { render } from "react-dom";
import { App } from "./app";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";

render(
  <React.StrictMode>
    <App />
    <GlobalLoader />
  </React.StrictMode>,

  document.getElementById("root")
);

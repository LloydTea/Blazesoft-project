import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./scss/style.scss";
import store from "./store.jsx";
import { Provider } from "react-redux";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./scss/style.scss";
import store from "./store.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

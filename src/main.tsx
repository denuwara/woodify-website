import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Admin from "./Admin";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{location.pathname.startsWith('/admin') || /(?:invite|recovery)_token=/.test(location.hash) ? <Admin /> : <App />}</React.StrictMode>
);

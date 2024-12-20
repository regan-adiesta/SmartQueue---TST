import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot for React 18+
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

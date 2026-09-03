import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css"; // si lo usás

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Habilita los meta tags por ruta del componente Seo. */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

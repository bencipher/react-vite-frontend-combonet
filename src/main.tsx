import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import "./index.css";
import { Auth0ProviderWithNavigate } from "./contexts/auth0-provider-with-navigate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </React.StrictMode>
);



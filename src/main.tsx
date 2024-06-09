import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import "./index.css";
import { Auth0ProviderWithNavigate } from "./contexts/Auth0ProviderWithNavigate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </React.StrictMode>
);



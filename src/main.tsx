import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate.tsx";
import { BrowserRouter } from 'react-router-dom';
// import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  //   <Auth0ProviderWithNavigate>
  //     <App />
  //     {/* <RouterProvider router={router} /> */}
  //   </Auth0ProviderWithNavigate>
  // </React.StrictMode>
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);


// Error: Error: useNavigate() may be used only in the context of a <Router> component.

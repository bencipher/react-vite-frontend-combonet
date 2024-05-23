import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "../page-loader";
import React from "react";

const ProtectedRoute = ({ element, ...args }) => {
  const { isAuthenticated } = useAuth0();

  const Component = withAuthenticationRequired(element, {
    onRedirecting: () => {
      if (!isAuthenticated) {
        const currentPath = window.location.pathname + window.location.search;
        sessionStorage.setItem("returnTo", currentPath);
      }
      return (
        <div className="page-layout">
          <PageLoader />
        </div>
      );
    },
  });

  return <Component {...args} />;
};

export default ProtectedRoute;

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PageLoader } from "../page-loader";
import React from "react";

const ProtectedRoute = ({ element, ...args }) => {
  console.log("ProtectedRoute props:", { element, ...args });

  // Ensure that the element is a valid React component
  if (typeof element !== "function" && typeof element !== "object") {
    console.error("Invalid element type:", element);
  } else {
    console.log("Valid element type:", element);
  }

  const Component = withAuthenticationRequired(element, {
    onRedirecting: () => {
      console.log("Redirecting user to the login page...");
      return <div>Redirecting you to the login page...</div>;
    },
  });

  console.log("Component after withAuthenticationRequired:", Component);
  console.log("RETURN COMPONENT NOW");
  return <Component {...args} />;
};

export default ProtectedRoute;

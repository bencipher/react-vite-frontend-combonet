import React, { useEffect } from "react";
import Spinner from "../components/Spinner";
import { useAuth0 } from "@auth0/auth0-react";

const Callback = () => {
  const { isAuthenticated, getIdTokenClaims, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    const verifyNonce = async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        console.log(claims);
        const storedNonce = sessionStorage.getItem("auth_nonce");
        console.log("stored nonce is", storedNonce);
        sessionStorage.removeItem("auth_nonce");

        // if (claims?.nonce !== storedNonce) {
        //   console.error("Nonce verification failed!");
        // } else {
        // console.log("Nonce verification succeeded!", claims.nonce);
        const returnTo = sessionStorage.getItem("returnTo") || "/";

        sessionStorage.removeItem("returnTo");
        const accessToken = await getAccessTokenSilently();
        localStorage.setItem("access_token", accessToken);

        setTimeout(() => {
          window.location.replace(returnTo);
        }, 0);
        // }
      }
    };
    verifyNonce();
  }, [isAuthenticated, getIdTokenClaims, getAccessTokenSilently]);

  return (
    <div className="min-h-full">
      <Spinner loading={true} />
    </div>
  );
};

export default Callback;
function getAccessTokenSilently() {
  throw new Error("Function not implemented.");
}

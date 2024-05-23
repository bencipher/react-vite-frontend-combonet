import { Auth0Provider } from "@auth0/auth0-react";
import { randomBytes } from "./utils/auth";

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}
export const Auth0ProviderWithNavigate = ({
  children,
}: Auth0ProviderWithNavigateProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const onRedirectCallback = (appState: AppState) => {
    window.location.replace(import.meta.env.VITE_AUTH0_CALLBACK_URL);
  };

  if (!(domain && clientId && import.meta.env.VITE_AUTH0_CALLBACK_URL)) {
    return null;
  }
  const nonce = randomBytes(256);
  sessionStorage.setItem("auth_nonce", nonce);
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        state: nonce,
        // nonce: "constantstringbymefornonce",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface AuthHandlerContextProps {
  login: () => void;
  logout: () => void;
  user: any;
  token: string | null;
}

const AuthHandlerContext = createContext<AuthHandlerContextProps | undefined>(
  undefined
);

export const AuthHandlerProvider = ({ children }: { children: ReactNode }) => {
  const { loginWithRedirect, logout, user, getAccessTokenSilently } =
    useAuth0();
  const [token, setToken] = useState(null);

  const login = async () => {
    loginWithRedirect();
  };

  const logoutFxn = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (error) {
        console.error("Failed to get access token silently:", error);
      }
    };

    if (user) {
      fetchToken();
    }
  }, [user, getAccessTokenSilently]);

  return (
    <AuthHandlerContext.Provider
      value={{ login, logout: logoutFxn, user, token }}
    >
      {children}
    </AuthHandlerContext.Provider>
  );
};

export const useAuthHandler = () => {
  const context = useContext(AuthHandlerContext);
  if (!context) {
    throw new Error(
      "useAuthHandler must be used within an AuthHandlerProvider"
    );
  }
  return context;
};

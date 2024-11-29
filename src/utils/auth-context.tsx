import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  token: initialToken,
}: {
  children: ReactNode;
  token?: string;
}) => {
  const [token, setToken] = useState<string | null>(initialToken || null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Update the token from cookies after hydration
    const cookieToken = Cookies.get("authToken");
    if (cookieToken && cookieToken !== token) {
      setToken(cookieToken);
    }
    setIsLoading(false);
  }, [token]);
  const isAuthenticated = Boolean(token);

  const login = (newToken: string) => {
    Cookies.set("authToken", newToken, { expires: 7 });
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

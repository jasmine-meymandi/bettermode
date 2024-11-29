import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("authToken");
    setToken(storedToken || null);
    setIsAuthenticated(!!storedToken);
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    Cookies.set("authToken", newToken, { expires: 7 }); // Token expires in 7 days
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  return { isLoading, token, login, logout, isAuthenticated };
};

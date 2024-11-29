import { createContext, ReactNode, useContext } from "react";
import { useAuth as useAuthHook } from "./hooks";

export const useAuth = () => useContext(AuthContext);
// Define the shape of the AuthContext value (for TypeScript)
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthHook();
  return <AuthContext.Provider value={ auth }> { children } </AuthContext.Provider>;
};
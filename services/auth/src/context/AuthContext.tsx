import { createContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type TAuthContext = ReturnType<typeof useAuth>;
export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authData = useAuth();
  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

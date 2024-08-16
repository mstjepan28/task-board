import { useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, _setAuthUser] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    authUser,
    login,
    logout,
  };
};

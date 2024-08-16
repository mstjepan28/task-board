import { FirebaseContext } from "@services/firebase";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { QueryKeys } from "../enums/queryKeys";

type TCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const { credentialLogin, logout } = useContext(FirebaseContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, _setAuthUser] = useState(null);

  const loggingIn = useMutation({
    mutationKey: [QueryKeys.LOGGING_IN],
    mutationFn: async ({ email, password }: TCredentials) => {
      const response = credentialLogin(email, password);
      console.log(response);
    },
    onSuccess: () => setIsLoggedIn(true),
    onError: console.error,
  });

  const loggingOut = useMutation({
    mutationKey: [QueryKeys.LOGGING_IN],
    mutationFn: logout,
    onSuccess: () => setIsLoggedIn(false),
    onError: console.error,
  });

  return {
    isLoggedIn,
    authUser,
    login: {
      loginUser: async (credentials: TCredentials) => loggingIn.mutateAsync(credentials),
      loading: loggingIn.isPending,
    },
    logout: {
      logoutUser: async () => loggingOut.mutateAsync(undefined),
      loading: loggingIn.isPending,
    },
  };
};

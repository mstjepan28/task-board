import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { QueryKeys } from "../enums/queryKeys";
import { fakeApiRequest } from "@services/utils";

type TCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, _setAuthUser] = useState(null);

  const loggingIn = useMutation({
    mutationKey: [QueryKeys.LOGGING_IN],
    mutationFn: async (credentials: TCredentials) => {
      console.log("Logging in...", credentials);
      fakeApiRequest(true);
    },
    onSuccess: () => setIsLoggedIn(true),
    onError: console.error,
  });

  const loggingOut = useMutation({
    mutationKey: [QueryKeys.LOGGING_IN],
    mutationFn: async () => {
      console.log("Logging out...");
      fakeApiRequest(true);
    },
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

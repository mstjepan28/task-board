import { FirebaseContext } from "@services/firebase";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { QueryKeys } from "../enums/queryKeys";
import { type TUser, userSchema } from "../schemas/userSchema";

type TCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const { credentialLogin, logout } = useContext(FirebaseContext);

  const [authUser, setAuthUser] = useState<TUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loggingIn = useMutation({
    mutationKey: [QueryKeys.LOGGING_IN],
    mutationFn: async ({ email, password }: TCredentials) => {
      const { user } = await credentialLogin(email, password);

      const validatedUser = userSchema.parse({
        id: user.uid,
        name: user.displayName ?? user.email,
        email: user.email,
        profilePicture: user.photoURL,
      });

      setAuthUser(validatedUser);
      setIsLoggedIn(true);
    },
    onError: console.error,
  });

  const loggingOut = useMutation({
    mutationKey: [QueryKeys.LOGGING_IN],
    mutationFn: async () => {
      logout().then(() => setIsLoggedIn(false));
    },
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

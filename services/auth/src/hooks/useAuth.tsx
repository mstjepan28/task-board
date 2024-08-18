import { FirebaseContext } from "@services/firebase";
import { storage } from "@services/storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { QueryKeys } from "../enums/queryKeys";
import { type TUser, userSchema } from "../schemas/userSchema";

type TCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const { credentialLogin, logout, getDocumentById } = useContext(FirebaseContext);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [authUser, setAuthUser] = useState<TUser | null>(null);

  const validateAndSetUser = (authUser: unknown) => {
    const { data, success, error } = userSchema.safeParse(authUser);

    const validatedData = data ?? null;

    setAuthUser(validatedData);
    setIsLoggedIn(success);

    if (success) {
      storage.setItem("auth-user", data);
    } else {
      console.error("Error validating user: ", error.issues);
      storage.removeItem("auth-user");
    }

    return validatedData;
  };

  const loggingIn = useMutation({
    mutationKey: [QueryKeys.LOGGING_IN],
    mutationFn: async ({ email, password }: TCredentials) => {
      const { user } = await credentialLogin(email, password);
      const userInfo = await getDocumentById("users", user.uid);

      return validateAndSetUser(userInfo);
    },
    onError: (error) => console.error("Something went wrong: ", error),
  });

  const loggingOut = useMutation({
    mutationKey: [QueryKeys.LOGGING_IN],
    mutationFn: async () => {
      logout().then(() => {
        storage.removeItem("auth-user");
        setIsLoggedIn(false);
      });
    },
    onError: console.error,
  });

  useQuery({
    queryKey: [QueryKeys.VALIDATE_SESSION],
    queryFn: async () => {
      const storedUser = storage.getItem("auth-user");
      if (!storedUser) {
        setIsLoggedIn(false);
        return null;
      }

      return validateAndSetUser(storedUser);
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true,
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

import { env } from "@services/environment";
import { initializeApp } from "firebase/app";
import { createContext, useMemo, type ReactNode } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

type TFirebaseContext = {
  credentialLogin: (email: string, password: string) => ReturnType<typeof signInWithEmailAndPassword>;
  registerUser: (email: string, password: string) => ReturnType<typeof createUserWithEmailAndPassword>;
  logout: () => ReturnType<typeof signOut>;
};

export const FirebaseContext = createContext<TFirebaseContext>({} as TFirebaseContext);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const firebase: TFirebaseContext = useMemo(() => {
    const app = initializeApp(env.firebaseConfig);
    const auth = getAuth(app);

    return {
      credentialLogin: async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
      },
      registerUser: async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      },
      logout: async () => {
        return signOut(auth);
      },
    };
  }, [env.firebaseConfig]);

  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
};

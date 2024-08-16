import { env } from "@services/environment";
import { initializeApp } from "firebase/app";
import { createContext, useMemo, type ReactNode } from "react";

type TFirebaseContext = {
  firebase: ReturnType<typeof initializeApp>;
};

export const FirebaseContext = createContext<TFirebaseContext>({} as TFirebaseContext);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const firebase = useMemo(() => {
    return initializeApp(env.firebaseConfig);
  }, [env.firebaseConfig]);

  return <FirebaseContext.Provider value={{ firebase }}>{children}</FirebaseContext.Provider>;
};

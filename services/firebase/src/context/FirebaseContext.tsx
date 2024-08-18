import { env } from "@services/environment";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { createContext, useMemo, type ReactNode } from "react";
import { Collection, type TCollection } from "../enums/collection";

type TFirebaseContext = {
  registerUser: (email: string, password: string) => ReturnType<typeof createUserWithEmailAndPassword>;
  credentialLogin: (email: string, password: string) => ReturnType<typeof signInWithEmailAndPassword>;
  logout: () => ReturnType<typeof signOut>;

  getDocumentListById: (collectionKey: TCollection, idList: string[]) => Promise<unknown[]>;
  getDocumentById: (collectionKey: TCollection, id: string) => Promise<unknown>;
  createDocument: (collectionKey: TCollection, data: unknown) => Promise<void>;
};

export const FirebaseContext = createContext<TFirebaseContext>({} as TFirebaseContext);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const firebase: TFirebaseContext = useMemo(() => {
    const app = initializeApp(env.firebaseConfig);
    const auth = getAuth(app);

    const db = getFirestore(app);

    const collections = {
      [Collection.TASKS]: collection(db, Collection.TASKS),
      [Collection.USERS]: collection(db, Collection.USERS),
    } as const;

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
      getDocumentListById: async (collection, idList) => {
        const getQuery = query(collections[collection], where("id", "in", idList));
        const querySnapshot = await getDocs(getQuery);

        const result: unknown[] = [];
        querySnapshot.forEach((doc) => result.push(doc.data()));

        return result;
      },
      getDocumentById: async (collection, id) => {
        const response = await getDoc(doc(db, collection, id));
        return response.data();
      },
      createDocument: async (collectionKey, data) => {
        const collectionRef = collections[collectionKey];
        setDoc(doc(collectionRef), data);
      },
    };
  }, [env.firebaseConfig]);

  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
};

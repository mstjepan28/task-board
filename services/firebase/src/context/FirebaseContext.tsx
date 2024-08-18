import { env } from "@services/environment";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { createContext, useMemo, type ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Collection, type TCollection } from "../enums/collection";

type TFirebaseContext = {
  registerUser: (email: string, password: string) => ReturnType<typeof createUserWithEmailAndPassword>;
  credentialLogin: (email: string, password: string) => ReturnType<typeof signInWithEmailAndPassword>;
  logout: () => ReturnType<typeof signOut>;

  getDocumentListById: (collectionKey: TCollection, idList: string[]) => Promise<unknown[]>;
  getDocumentById: (collectionKey: TCollection, id: string) => Promise<unknown>;
  createDocument: (collectionKey: TCollection, data: object) => Promise<void>;
  getTasksForCurrentUser: () => Promise<unknown[]>;
};

export const FirebaseContext = createContext<TFirebaseContext>({} as TFirebaseContext);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const { auth, db } = useMemo(() => {
    const app = initializeApp(env.firebaseConfig);

    const auth = getAuth(app);
    const db = getFirestore(app);

    return { auth, db };
  }, [env.firebaseConfig]);

  const firebase: TFirebaseContext = useMemo(() => {
    const collections = {
      [Collection.TASKS]: collection(db, Collection.TASKS),
      [Collection.USERS]: collection(db, Collection.USERS),
    };

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
        const id = uuidv4();

        setDoc(doc(collectionRef, id), { id, ...data });
      },
      getTasksForCurrentUser: async () => {
        const authUser = auth.currentUser;

        if (!authUser) {
          throw new Error("User is not authenticated");
        }

        const tasksQuery = query(collections[Collection.TASKS], where("assigned_to", "array-contains", authUser.uid));
        const querySnapshot = await getDocs(tasksQuery);

        const tasks: unknown[] = [];
        querySnapshot.forEach((doc) => tasks.push(doc.data()));

        return tasks;
      },
    };
  }, [auth, db]);

  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
};

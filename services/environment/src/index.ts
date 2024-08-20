import { z } from "@services/validation";

const {
  MODE,
  DEV,
  PROD,
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_EMAIL,
  VITE_PASSWORD,
} = import.meta.env;

const envSchema = z.object({
  mode: z.coerce.boolean(),
  isDevelopment: z.coerce.boolean(),
  isAppBuilt: z.coerce.boolean(),
  firebaseConfig: z.object({
    apiKey: z.string(),
    authDomain: z.string(),
    projectId: z.string(),
    storageBucket: z.string(),
    messagingSenderId: z.string(),
    appId: z.string(),
  }),
  devCredentials: z
    .object({
      devEmail: z.string().email(),
      devPassword: z.string(),
    })
    .transform((data) => {
      return {
        devEmail: data.devEmail ?? "",
        devPassword: data.devPassword ?? "",
      };
    }),
});

export const env = envSchema.parse({
  mode: MODE,
  isDevelopment: DEV,
  isAppBuilt: PROD,
  firebaseConfig: {
    apiKey: VITE_FIREBASE_API_KEY,
    authDomain: VITE_FIREBASE_AUTH_DOMAIN,
    projectId: VITE_FIREBASE_PROJECT_ID,
    storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: VITE_FIREBASE_APP_ID,
  },
  devCredentials: {
    devEmail: VITE_EMAIL,
    devPassword: VITE_PASSWORD,
  },
});

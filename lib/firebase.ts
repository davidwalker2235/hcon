import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getAuth, Auth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

// Firebase config from environment variables (see .env.local and Vercel Environment Variables)
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} as const;

const missing = Object.entries(requiredEnvVars)
  .filter(([, v]) => v == null || v === "")
  .map(([k]) => k);

if (missing.length > 0) {
  throw new Error(
    `Missing Firebase env: ${missing.join(", ")}. Set them in .env.local (local) or Vercel Environment Variables (production).`
  );
}

const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey,
  authDomain: requiredEnvVars.authDomain,
  databaseURL: requiredEnvVars.databaseURL,
  projectId: requiredEnvVars.projectId,
  storageBucket: requiredEnvVars.storageBucket,
  messagingSenderId: requiredEnvVars.messagingSenderId,
  appId: requiredEnvVars.appId,
  measurementId: requiredEnvVars.measurementId,
};

let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0] as FirebaseApp;
}

export const auth: Auth = getAuth(app);
export const database: Database = getDatabase(app);

/**
 * Sign in with the reader email/password from env.
 * Call this from a client component (e.g. in useEffect) when you need auth,
 * not at module load time.
 */
export async function signInAsReader(): Promise<UserCredential> {
  const email = process.env.NEXT_PUBLIC_FIREBASE_READER_EMAIL;
  const password = process.env.NEXT_PUBLIC_FIREBASE_READER_PASSWORD;
  if (!email || !password) {
    throw new Error("NEXT_PUBLIC_FIREBASE_READER_EMAIL and NEXT_PUBLIC_FIREBASE_READER_PASSWORD must be set");
  }
  return signInWithEmailAndPassword(auth, email, password);
}

export default app;

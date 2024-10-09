import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_API_KEY,
  authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_APP_ID,
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
const db = getFirestore(app);

export { db };

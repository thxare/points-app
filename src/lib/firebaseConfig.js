// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDOIFbtgnwe2nIZL2YjwyXucRmsSy8a0gQ",
  authDomain: "game-app-44d81.firebaseapp.com",
  projectId: "game-app-44d81",
  storageBucket: "game-app-44d81.appspot.com",
  messagingSenderId: "884562206126",
  appId: "1:884562206126:web:2b802092b46876e7f6fc3f",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
const db = getFirestore(app);

export { db };

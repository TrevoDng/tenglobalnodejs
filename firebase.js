const dotenv = require('dotenv');
dotenv.config({ path: './example.env' });

export const firebaseConfig = {
apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

/*import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIPQCp4kWOjlHbx2l4HuzPlOl1ZBZBOm4",
  authDomain: "tenglobal-2a34b.firebaseapp.com",
  projectId: "tenglobal-2a34b",
  storageBucket: "tenglobal-2a34b.appspot.com",
  messagingSenderId: "468150163647",
  appId: "1:468150163647:web:2fe6287aa5e96e35600e0a"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

export const emails = "trevor279@live.com";
export const passwords = "1684716";
*/

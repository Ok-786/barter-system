import admin from "firebase-admin";
import { readFile } from 'fs/promises';

const firebaseConfig = JSON.parse(await readFile(new URL('./firebase_credentials.json', import.meta.url)));



admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
});

const db = admin.firestore();
export default db





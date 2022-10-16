// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';

export const phototest = async (req, res) => {
    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app)

    const file = req.file;
    const metatype = { contentType: file.mimetype, name: file.originalname };
    const imageRef = ref(storage, `vendor-images/${file.originalname}`);
    console.log(req.file)
    console.log('fsfsfsfs')
    console.log(req.file.buffer)
    await uploadBytes(imageRef, file.buffer, metatype)
}
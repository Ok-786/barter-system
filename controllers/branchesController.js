import Branches from "../models/branches.js";
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes } from "firebase/storage";

export const getAllBranchesById = async (req, res) => {
    try {
        const id = req.params.id
        const branches = [];

        console.log(id)
        const snapshot = await Branches
            .where('vendor_id', '==', id)
            .get();
        console.log('id')
        console.log(id)

        snapshot.forEach((doc) =>
            branches.push(doc.data())
        );
        console.log('branches')
        console.log(branches)
        res.json({ branches });
    } catch (err) {
        console.log(err)
    }
}

export const registerBranch = async (req, res) => {
    const data = req.body;
    console.log(data)

    console.log(req.file)

    try {
        // const count = (await Categories.get()).docs.length;

        const branch = Branches.doc(req.params.id);
        await branch.update({
            image: req.file.originalname,
            title: data.title,
            bank_accountNumber: data.accountCode,
            bank_accountTitle: data.accountTitle,
            bank_iban: data.iban,
            bank_name: data.bank,
            branch_address: data.address,
            category: data.category,
            city: data.city,
            id: branch.id,
            latitude: data.latitude,
            longitude: data.longitude,
            poc_cnic: data.cnic,
            poc_name: data.name,
            poc_number: data.number,
            status: true,
            totalPayout: branch.id,
            vendor_id: data.vendor_id,
            wallet: ''
        });
        console.log(branch.id)

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
        const imageRef = ref(storage, `/vendor-images/${file.originalname}`);
        console.log(req.file)
        console.log('fsfsfsfs')
        console.log(req.file.buffer)
        await uploadBytes(imageRef, file.buffer, metatype)

        res.json({ branch });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


export const updateBranch = async (req, res) => {
    const data = req.body;

    try {
        // const count = (await Categories.get()).docs.length;
        console.log(req.params.id)
        const branch = Branches.doc(req.params.id);
        await branch.set({
            image: req.file.originalname,
            title: data.title,
            bank_accountNumber: data.accountCode,
            bank_accountTitle: data.accountTitle,
            bank_iban: data.iban,
            bank_name: data.bank,
            branch_address: data.address,
            category: data.category,
            city: data.city,
            id: req.params.id,
            latitude: data.latitude,
            longitude: data.longitude,
            poc_cnic: data.cnic,
            poc_name: data.name,
            poc_number: data.number,
            status: true,
            totalPayout: branch.id,
            vendor_id: data.vendor_id,
            wallet: ''
        });
        console.log(branch.id)

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
        const imageRef = ref(storage, `/vendor-images/${file.originalname}`);
        console.log(req.file)
        console.log('fsfsfsfs')
        console.log(req.file.buffer)
        await uploadBytes(imageRef, file.buffer, metatype)

        res.json({ branch });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}



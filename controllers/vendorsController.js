import Vendors from "../models/chats.js";
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes } from "firebase/storage";
// import { firebase } from "../config.js";
// import db from "../config.js";
// import 'firebase/storage';
// firebase = firebase.ref()


export const registerVendor = async (req, res) => {
    const data = req.body;
    console.log(data)

    console.log(req.file)
    const choicesArray = data.category.split(',').map(String);
    console.log(choicesArray)
    try {
        const vendor = Vendors.doc();
        await vendor.set({
            image: req.file.originalname,
            description: data.description,
            featured: (data.featured === 'true') ? true : false,
            status: (data.status === 'true') ? true : false,
            title: data.title,
            category: choicesArray,
            id: vendor.id
        });
        console.log(vendor.id)

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
        const imageRef = ref(storage, `vendor-icons/${file.originalname}`);
        console.log(req.file)
        console.log('fsfsfsfs')
        console.log(req.file.buffer)
        await uploadBytes(imageRef, file.buffer, metatype)

        res.json({ vendor });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getVendorById = async (req, res) => {
    const { id } = req.params;
    var user;
    const snapshot = await Vendors.get();
    console.log(id)
    snapshot.forEach((doc) => {
        if (doc.id === id) user = doc.data()
    }
    );
    console.log(user)
    res.send(user ? user : "Vendor not found!")
}

export const getAllVendors = async (req, res) => {
    try {
        console.log((req.query.rows))
        // const docRef = Vendors.doc(req.id);
        // const prevSnapshot = await docRef.get();
        // const users = [];
        // const snapshot = await Vendors
        //     .orderBy('id')
        //     .startAfter(prevSnapshot)
        //     .limit(5)
        //     .get();
        // snapshot.forEach((doc) =>
        //     users.push(doc.data())
        // );
        // console.log(users)
        // res.json(users);
        var count = await Vendors.get();
        count = count.size;
        const users = [];
        var limit = (req.query.rows && !req.query.rows == "undefined") ? req.query.rows : 5;
        console.log(limit)
        console.log(typeof (limit))
        var snapshot;
        var id = req.params.id
        // var id = req.params.id ? console.log('req.params.id') : false
        console.log(id == 'false')
        if (id == 'false') {
            console.log('aaaaa')
            snapshot = await Vendors
                .orderBy('id')
                .limit(limit)
                .get();
        } else {
            console.log('bbbbb')
            const docRef = Vendors.doc(req.params.id);
            const prevSnapshot = await docRef.get();
            snapshot = await Vendors
                .orderBy('id')
                .startAfter(prevSnapshot)
                .limit(limit)
                .get();
        }

        snapshot.forEach((doc) =>
            users.push(doc.data())
        );
        console.log(users)
        res.json({ users, count });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


export const searchItem = async (req, res) => {
    try {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log(req.query.name)
        var count = await Vendors.get();
        count = count.size;

        const users = [];
        const snapshot1 = Vendors
            .where('title', '>=', req.query.name)
            .where('title', '<=', req.query.name + '\uf8ff')

        var snapshot = await snapshot1.get();

        console.log('dadadsnapshot')
        // console.log(snapshot)
        snapshot.forEach((doc) =>
            users.push(doc.data())
        );
        console.log(users)
        res.json({ users, count });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


export const updateVendor = async (req, res) => {
    const data = req.body;
    console.log(data);

    var id;
    const snapshot = await Vendors.get();
    snapshot.forEach((doc) => { if (doc.data().title === data.title) id = doc.id }
        // users.push(doc.data())
    );
    // console.log('user')
    // console.log(user)
    const user = Vendors.doc(id);
    const updatedUser = await user.update(data);
    console.log(updatedUser);
    res.send({ msg: "Vendor updated!" })
}

export const deleteVendor = async (req, res) => {
    const data = req.body;
    const deletedUser = await Vendors.doc(id).delete();

    res.send({ msg: deletedUser.id ? "Deleted Successfully!" : 'Vendor not deleted' })
}


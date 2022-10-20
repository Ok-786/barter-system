import Products from "../models/products.js";
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes } from "firebase/storage";
// import { firebase } from "../config.js";
// import db from "../config.js";
// import 'firebase/storage';
// firebase = firebase.ref()

// firebase.database.ServerValue.TIMESTAMP

export const registerProducts = async (req, res) => {
    const data = req.body;
    console.log('data', data)

    console.log(req.file)
    // const choicesArray = data.category.split(',').map(String);
    // console.log(choicesArray)

    // try {
    //     const gifts = Gifts.doc();
    //     await gifts.set({
    //         image: req.file.originalname,
    //         description: data.description,
    //         featured: (data.featured === 'true') ? true : false,
    //         price: data.price,
    //         title: data.title,
    //         expiry: data.expiry,
    //         category: choicesArray,
    //         id: gifts.id
    //     });
    //     console.log(gifts.id)

    //     const firebaseConfig = {
    //         apiKey: process.env.API_KEY,
    //         authDomain: process.env.AUTH_DOMAIN,
    //         projectId: process.env.PROJECT_ID,
    //         storageBucket: process.env.STORAGE_BUCKET,
    //         messagingSenderId: process.env.MESSAGING_SENDER_ID,
    //         appId: process.env.APP_ID,
    //         measurementId: process.env.MEASUREMENT_ID
    //     };
    //     // Initialize Firebase
    //     const app = initializeApp(firebaseConfig);
    //     const storage = getStorage(app)

    //     const file = req.file;
    //     const metatype = { contentType: file.mimetype, name: file.originalname };
    //     const imageRef = ref(storage, `gift-images/${file.originalname}`);
    //     console.log(req.file)
    //     console.log('fsfsfsfs')
    //     console.log(req.file.buffer)
    //     await uploadBytes(imageRef, file.buffer, metatype)

    //     res.json({ gifts });
    // } catch (err) {
    //     res.status(500).json({ message: err.message })
    // }
}

export const searchItem = async (req, res) => {
    try {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log(req.query.name)
        var count = await Gifts.get();
        count = count.size;

        const users = [];
        const snapshot1 = Gifts
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

export const getProductsById = async (req, res) => {
    const { id } = req.params;
    var user;
    const snapshot = await Gifts.get();
    console.log(id)
    snapshot.forEach((doc) => {
        if (doc.id === id) user = doc.data()
    }
    );
    console.log(user)
    res.send(user ? user : "gifts not found!")
}

export const getAllProducts = async (req, res) => {
    try {
        var count = await Products.get();
        const products = [];
        var snapshot;
        snapshot = await Products
            .orderBy('id')
            .get();


        snapshot.forEach((doc) =>
            products.push(doc.data())
        );
        console.log(products)
        res.json({ products });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

export const getCurrentUserProducts = async (req, res) => {
    try {
        // const docRef = Gifts.doc(req.id);
        // const prevSnapshot = await docRef.get();
        // const users = [];
        // const snapshot = await Gifts
        //     .orderBy('id')
        //     .startAfter(prevSnapshot)
        //     .limit(5)
        //     .get();
        // snapshot.forEach((doc) =>
        //     users.push(doc.data())
        // );
        // console.log(users)
        // res.json(users);
        var count = await Gifts.get();
        count = count.size;
        const users = [];
        var limit = (req.query.rows && !req.query.rows == "undefined") ? req.query.rows : 5;
        var snapshot;
        var id = req.params.id
        // var id = req.params.id ? console.log('req.params.id') : false
        console.log(id == 'false')
        if (id == 'false') {
            console.log('aaaaa')
            snapshot = await Gifts
                .orderBy('id')
                .limit(limit)
                .get();
        } else {
            console.log('bbbbb')
            const docRef = Gifts.doc(req.params.id);
            const prevSnapshot = await docRef.get();
            snapshot = await Gifts
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

export const updateProducts = async (req, res) => {
    const data = req.body;
    console.log(data);

    var id;
    const snapshot = await Gifts.get();
    snapshot.forEach((doc) => { if (doc.data().title === data.title) id = doc.id }
        // users.push(doc.data())
    );
    // console.log('user')
    // console.log(user)
    const user = Gifts.doc(id);
    const updatedUser = await user.update(data);
    console.log(updatedUser);
    res.send({ msg: "gifts updated!" })
}

export const deleteProducts = async (req, res) => {
    const data = req.body;
    const deletedUser = await Gifts.doc(id).delete();

    res.send({ msg: deletedUser.id ? "Deleted Successfully!" : 'gifts not deleted' })
}


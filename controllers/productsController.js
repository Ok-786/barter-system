import Products from "../models/products.js";
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes } from "firebase/storage";
import * as firebase from 'firebase/app';
// import { firebase } from "../config.js";
// import db from "../config.js";
// import 'firebase/storage';
// firebase = firebase.ref()

// firebase.database.ServerValue.TIMESTAMP


export const postNewBid = async (req, res) => {
    try {
        req.body.image = req.file.path
        console.log(req.body);

        var product = await Products
            .doc(req.params.id)
            .get()
            ;


        product = product.data()
        product.bids.push(req.body);

        var product = await Products
            .doc(req.params.id)
            .set(product)
            ;
        res.status(200).json({ bid: product });
    } catch (err) {
        res.status(200).json({ err: err });
    }
}


export const registerProducts = async (req, res) => {
    const data = req.body;
    console.log('data', data)


    try {
        const products = Products.doc();
        await products.set({
            image: req.files.file1 ? req.files.file1[0].path : '',
            image1: req.files.file2 ? req.files.file2[0].path : '',
            image2: req.files.file3 ? req.files.file3[0].path : '',
            image3: req.files.file4 ? req.files.file4[0].path : '',
            detail: data.additionalDetails,
            featured: (data.featured === 'true') ? true : false,
            type: data.type,
            title: data.title,
            worth: data.worth,
            user_id: data.user_id,
            user_email: data.user_email,
            user_name: data.user_name,
            name: data.title,
            stars: data.stars,
            id: products.id,
            bids: [],
            lat: data.lat,
            long: data.long,
            expires_at: new Date((new Date()).getDay() + 3, (new Date()).getMonth(), (new Date()).getYear())
        });

        res.json({ products });
    } catch (err) {
        console.log('err', err)
        res.status(500).json({ message: err.message })
    }
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


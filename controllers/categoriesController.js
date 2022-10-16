import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes } from "firebase/storage";
import Categories from "../models/categories.js";
// import { firebase } from "../config.js";
// import db from "../config.js";
// import 'firebase/storage';
// firebase = firebase.ref()


export const registerCategory = async (req, res) => {
    const data = req.body;
    console.log(data)

    console.log(req.file)

    try {
        // const count = (await Categories.get()).docs.length;

        const count = (await Categories.where('isParent', '==', true).get()).docs.length;
        const category = Categories.doc();
        await category.set({
            image: req.file.originalname,
            title: data.title,
            isParent: (data.isParent === 'true') ? true : false,
            status: true,
            order: count + 1,
            parentID: data.parentID ? data.parentID : '',
            id: category.id
        });
        console.log(category.id)

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
        const imageRef = ref(storage, `category-icons/${file.originalname}`);
        console.log(req.file)
        console.log('fsfsfsfs')
        console.log(req.file.buffer)
        await uploadBytes(imageRef, file.buffer, metatype)

        res.json({ category });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}




export const searchItem = async (req, res) => {
    try {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log(req.query.name)
        var count = await Categories.get();
        count = count.size;

        const users = [];
        const snapshot1 = Categories
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


export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    var user;
    const snapshot = await Category.get();
    console.log(id)
    snapshot.forEach((doc) => {
        if (doc.id === id) user = doc.data()
    }
    );
    console.log(user)
    res.send(user ? user : "Category not found!")
}

export const getParentCategories = async (req, res) => {
    try {
        const categories = [];
        const snapshot = await Categories.where('isParent', '==', true).get();
        snapshot.forEach((doc) =>
            categories.push(doc.data())
        );
        console.log(categories)
        res.json(categories);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getAllCategories = async (req, res) => {
    try {
        // const docRef = Categories.doc(req.id);
        // const prevSnapshot = await docRef.get();
        // const users = [];
        // const snapshot = await Categories
        //     .orderBy('id')
        //     .startAfter(prevSnapshot)
        //     .limit(5)
        //     .get();
        // snapshot.forEach((doc) =>
        //     users.push(doc.data())
        // );
        // console.log(users)
        // res.json(users);
        var count = await Categories.get();
        count = count.size;
        const users = [];
        var limit = (req.query.rows && !req.query.rows == "undefined") ? req.query.rows : 5;
        var snapshot;
        var id = req.params.id
        // var id = req.params.id ? console.log('req.params.id') : false
        console.log(id == 'false')
        if (id == 'false') {
            console.log('aaaaa')
            snapshot = await Categories
                .orderBy('order')
                .limit(limit)
                .get();
        } else {
            console.log('bbbbb')
            const docRef = Categories.doc(req.params.id);
            const prevSnapshot = await docRef.get();
            snapshot = await Categories
                .orderBy('order')
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

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log(id);
    const user = Category.doc(id);
    const updatedUser = await user.update(data);
    console.log(updatedUser);
    res.send({ msg: "Category updated!" })
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const deletedUser = await Category.doc(id).delete();

    res.send({ msg: deletedUser.id ? "Deleted Successfully!" : 'Category not deleted' })
}


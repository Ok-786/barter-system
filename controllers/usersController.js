import jwt from 'jsonwebtoken';
import { firebase } from '../config.js';
import User from "../models/users.js";
import Chat from '../models/chats.js';
import EnabledChats from '../models/enabledchats.js';


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    var user;
    try {
        user = await User
            .where('email', '==', `${email}`)
            .get();
        console.log('docRef')
        const id = user.docs[0].id
        user = user.docs[0].data()
        user['id'] = id
    } catch (err) {
        console.log(err)
        return res.status(500).json("Server Error1!");
    }

    if (!user) return res.status(401).json("User not found, please signup!");

    const role = user.role;

    const payload = {
        id: user.id,
        role: role
    }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1hr" });
    return res.status(200).json({ token, user });
}

export const signupAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    var user = User.doc();
    try {
        user = await user.set({
            name,
            email,
            password,
            role: 'client',
            detail: '',
            rating: 0,
            wish_list: []
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json("Server Error1!");
    }

    const role = 'client';

    const payload = {
        email,
        role: role,
        name,
        password,
        detail: '',
        rating: 0,
        wish_list: []
    }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1hr" });
    return res.status(200).json({ token, user: payload });
}

export const updateWishList = async (req, res) => {
    try {
        if (req.body.type === 'remove') {
            var user = await User
                .doc(req.body.id)
                .get()
                ;


            user = user.data()

            // console.log('err', req)
            user.wish_list = user.wish_list.filter(function (item) {
                return item !== req.body.product_id
            })
            var user = await User
                .doc(req.body.id)
                .set(user)
                ;

        } else {
            var user = await User
                .doc(req.body.id)
                .get()
                ;


            user = user.data()

            user.wish_list.push(req.body.product_id);

            var user = await User
                .doc(req.body.id)
                .set(user)
                ;
        }

        console.log(user);
    } catch (err) {
        console.log('err', err)
    }
    res.json('done')
}

export const updateReportedUser = async (req, res) => {
    try {
        if (req.body.type === 'remove') {
            var user = await User
                .where('email', '==', req.body.email)
                .get()
                ;


            // user = user.data()

            var id = ''
            var noReports = 0;

            user.forEach(doc => {
                id = doc.id
                noReports = doc.data().noReports ? doc.data().noReports : 1;
            })

            console.log(noReports)

            user.reported = false
            var user = await User
                .doc(id)
                .set({ reported: false, noReports: noReports - 1 }, { merge: true })
                ;


            console.log(user)

        } else {
            var user = await User
                .where('email', '==', req.body.email)
                .get()
                ;


            // user = user.data()
            var id = ''
            var noReports = 0;

            user.forEach(doc => {
                id = doc.id
                noReports = doc.data().noReports ? doc.data().noReports : 0;
            })

            console.log(noReports)

            user.reported = true

            var user = await User
                .doc(id)
                .set({ reported: true, noReports: noReports + 1 }, { merge: true })
                ;

            console.log(user)
        }

    } catch (err) {
        console.log('err', err)
    }
    res.json('done')
}

export const reportAction = async (req, res) => {
    try {
        if (req.body.type === 'remove') {
            var user = await User
                .where('email', '==', req.body.email)
                .get()
                ;


            // user = user.data()

            var id = ''
            var noReports = 0;

            user.forEach(doc => {
                id = doc.id
                noReports = doc.data().noReports ? doc.data().noReports : 1;
            })

            console.log(noReports)

            user.reported = false
            var user = await User
                .doc(id)
                .set({ status: true }, { merge: true })
                ;


            console.log(user)

        } else {
            var user = await User
                .where('email', '==', req.body.email)
                .get()
                ;


            // user = user.data()
            var id = ''
            var noReports = 0;

            user.forEach(doc => {
                id = doc.id
                noReports = doc.data().noReports ? doc.data().noReports : 0;
            })

            console.log(noReports)

            user.reported = true

            var user = await User
                .doc(id)
                .set({ status: false }, { merge: true })
                ;

            console.log(user)
        }

    } catch (err) {
        console.log('err', err)
    }
    res.json('done')
}

export const isReported = async (req, res) => {
    console.log('aaaaa', req.body)
    try {
        var user = await User
            .where('email', '==', req.body.email)
            .get()
            ;

        var reported = 0;

        user.forEach(doc => {
            reported = doc.data().reported ? doc.data().reported : 0;
        })

        res.json(reported)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const getAllUsers = async (req, res) => {
    console.log('asasasasa')
    try {
        var count = await User.get();
        const users = [];
        var snapshot;
        snapshot = await User
            .get();


        snapshot.forEach((doc) =>
            users.push(doc.data())
        );
        console.log(users)
        res.json({ users });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


export const sendMessage = async (req, res) => {
    const sender = req.params.id;
    const { receiver, message } = req.body;
    console.log('sender, receiver, message')
    console.log(sender, receiver, message)
    var chat = Chat.doc();
    try {
        chat = await chat.set({
            sender,
            receiver,
            message,
            createdAt: new Date()
        })
        console.log('message sent')
        return res.status(200).json({ chat });
    } catch (err) {
        console.log(err)
        return res.status(500).json("Server Error1!");
    }
}


export const setEnabledUsers = async (req, res) => {
    console.log(req.body, req.params.id)
    const sender = req.params.id;
    const { id2 } = req.body;

    var chat = EnabledChats.doc();
    try {
        chat = await chat.set({
            users: [sender, id2]
        })
        console.log('users')
        return res.status(200).json({ chat });
    } catch (err) {
        console.log(err)
        return res.status(500).json(err, "Server Error1!");
    }
}


export const getEnabledUsers = async (req, res) => {
    console.log('aaaaaaa')
    const sender = req.params.id;
    // const { receiver } = req.body;

    // var chat = EnabledChats.doc();
    try {
        const snapshot = await EnabledChats
            .where('users', 'array-contains', sender)
            .get()
        console.log('a', snapshot.docs.map(doc => doc.data()))
        const arr = snapshot.docs.map(doc => doc.data());
        return res.json(arr);
    } catch (err) {

        console.log('err', err)

        return res.json(err);
    }
}


export const getChats = async (req, res) => {

    // try {
    //     var chat = await Chat
    //         .where('sender', '==', `${sender}`)
    //         .where('receiver', '==', `${receiver}`)
    //         .get();
    //     console.log('docRef')
    //     const id = chat.docs[0].id
    //     chat = chat.docs[0].data()
    //     user['id'] = id
    // } catch (err) {
    //     console.log(err)
    //     return res.status(500).json("Server Error1!");
    // }
    try {
        const snapshot = await Chat.get()
        console.log('a', snapshot.docs.map(doc => doc.data()))
        return res.json(snapshot.docs.map(doc => doc.data()))
    } catch (err) {
        return res.json(err)

    }
}
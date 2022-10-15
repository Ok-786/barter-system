import jwt from 'jsonwebtoken';
import { firebase } from '../config.js';
import User from "../models/users.js";


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
            role: 'client'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json("Server Error1!");
    }

    const role = 'client';

    const payload = {
        email,
        role: role,
        name
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
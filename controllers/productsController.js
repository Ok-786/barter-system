import Products from "../models/products.js";
import Users from "../models/users.js";
import Feedback from "../models/feedback.js";

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
            reported: false,
            noReported: 0,
            user_email: data.user_email,
            user_name: data.user_name,
            name: data.title,
            stars: data.stars,
            id: products.id,
            bids: [],
            lat: data.lat,
            long: data.long,
            category: data.category,
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

// export const getCurrentUserProducts = async (req, res) => {
//     try {
//         // const docRef = Gifts.doc(req.id);
//         // const prevSnapshot = await docRef.get();
//         // const users = [];
//         // const snapshot = await Gifts
//         //     .orderBy('id')
//         //     .startAfter(prevSnapshot)
//         //     .limit(5)
//         //     .get();
//         // snapshot.forEach((doc) =>
//         //     users.push(doc.data())
//         // );
//         // console.log(users)
//         // res.json(users);
//         var count = await Gifts.get();
//         count = count.size;
//         const users = [];
//         var limit = (req.query.rows && !req.query.rows == "undefined") ? req.query.rows : 5;
//         var snapshot;
//         var id = req.params.id
//         // var id = req.params.id ? console.log('req.params.id') : false
//         console.log(id == 'false')
//         if (id == 'false') {
//             console.log('aaaaa')
//             snapshot = await Gifts
//                 .orderBy('id')
//                 .limit(limit)
//                 .get();
//         } else {
//             console.log('bbbbb')
//             const docRef = Gifts.doc(req.params.id);
//             const prevSnapshot = await docRef.get();
//             snapshot = await Gifts
//                 .orderBy('id')
//                 .startAfter(prevSnapshot)
//                 .limit(limit)
//                 .get();
//         }

//         snapshot.forEach((doc) =>
//             users.push(doc.data())
//         );
//         console.log(users)
//         res.json({ users, count });

//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: err.message })
//     }
// }

export const updateProducts = async (req, res) => {
    // console.log(req)
    var data = req.body;
    var id = req.params.id;
    if (req.file)
        data.image = req.file.path

    const user = Products.doc(id);
    try {
        const updatedUser = await user.update(data);
        console.log(updatedUser);
    } catch (err) {
        console.log(err)
    }
    res.send({ msg: "Product updated!" })
}

export const deleteProducts = async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Products.doc(id).delete();

    res.json({ msg: deletedProduct.id ? "Deleted Successfully!" : 'product not deleted' })
}

export const acceptBid = async (req, res) => {
    const id = req.params.id;
    const data = [];
    data.push(req.body);



    const product = Products.doc(id);
    try {
        var user = await Users
            .where('email', '==', `${req.body.email}`)
            .get();
        const user_id = user.docs[0].id;
        user = Users.doc(user_id)
        const updatedUser = await user.set({ deal: id }, { merge: true });

        const updatedProduct = await product.set({ bids: data, bidAccepted: true }, { merge: true });
        res.json(user)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}


export const postFeedback = async (req, res) => {
    const { feedback, user_id } = req.body;
    const r = req.body.rating
    const { id } = req.params;

    try {
        var product = await Users
            .doc(user_id)
            .get();
        product = product.data()


        const rat = (parseInt(r) + parseInt(product.rating)) / 2



        var user = await Products
            .where('id', '==', `${id}`)
            .get();
        const us = user.docs[0].data();
        var user3 = await Users.doc(us.user_id)
        var updatedUser = await user3.set({ stars: rat, rating: rat }, { merge: true });
        var user3 = await Users.doc(us.user_id).get();
        console.log('productsaaaaaaaaaa')
        console.log(us)
        const products = Feedback.doc();
        await products.set({
            rating: r,
            feedback,
            product_id: id,
            id: products.id,
            user_email: user3.data().email,
            email: us.bids[0].email
        })
        console.log(products)



        var user3 = await Products.doc(id)
        var updatedUser = await user3.set({ stars: rat, rating: rat }, { merge: true });



        const user2 = Users.doc(user_id);
        var updatedUser2 = await user2.set({ deal: false }, { merge: true });


        res.json(products)
    } catch (err) {
        console.log(err)
        res.json(err)
    }


}




export const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = [];
        var snapshot = await Feedback
            .get();


        snapshot.forEach((doc) =>
            feedbacks.push(doc.data())
        );
        console.log(feedbacks)
        res.json({ feedbacks });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


export const deleteFeedback = async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Feedback.doc(id).delete();
    res.json({ msg: deletedProduct.id ? "Deleted Successfully!" : 'feedback not deleted' })
}

export const editFeedback = async (req, res) => {
    var data = req.body;
    var id = req.params.id;


    console.log('user')
    console.log(data, id)
    try {
        var user = await Users

            .where('email', '==', `${data.email}`)
            .get();
        console.log('user.docs[0]')
        console.log(user.docs[0])
        const us = user.docs[0].data();
        var user3 = await Users.doc(user.docs[0].id)
        var updatedUser = await user3.set({ stars: (parseInt(data.rating) + parseInt(us.stars)) / 2, rating: (parseInt(data.rating) + parseInt(us.rating)) / 2 }, { merge: true });




        user = await Feedback.doc(id);
        updatedUser = await user.update({ feedback: data.feedback });
        console.log(updatedUser);
    } catch (err) {
        console.log(err)
    }
    res.send({ msg: "Feedback updated!" })
}
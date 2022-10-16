import Users from "../models/users.js";

export const getAllUsers = async (req, res) => {
    try {
        console.log('req.query')
        console.log(req.query)
        // const docRef = Users.doc(req.id);
        // const prevSnapshot = await docRef.get();
        // const users = [];
        // const snapshot = await Users
        //     .orderBy('id')
        //     .startAfter(prevSnapshot)
        //     .limit(5)
        //     .get();
        // snapshot.forEach((doc) =>
        //     users.push(doc.data())
        // );
        // console.log(users)
        // res.json(users);
        const noDoc = req.query.false;
        var count = await Users.get();
        count = count.size;
        const users = [];
        var limit = (req.query.rows && !req.query.rows == "undefined") ? req.query.rows : 5;
        var snapshot;
        var id = req.params.id
        // var id = req.params.id ? console.log('req.params.id') : false
        // console.log(doc == 'false')
        if (noDoc === '') {
            console.log('aaaaa')
            snapshot = await Users
                .orderBy('userName')
                .limit(limit)
                .get();
        } else {
            console.log('bbbbb')
            const docRef = await Users
                .where('userName', '==', `${req.query.userName}`)
                .get();
            // const prevSnapshot = await docRef.get();
            console.log('docRef')
            console.log(docRef.docs[0])
            var user;

            // prevSnapshot.forEach((doc) =>
            //     user = doc.data()
            // );
            // console.log('user')
            // console.log(user)

            const snapshot1 = Users
                .orderBy('userName')
                .startAfter(docRef.docs[0])

            snapshot = await snapshot1.limit(limit).get();
        }
        console.log('dadadsnapshot')
        console.log(snapshot)
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
        var count = await Users.get();
        count = count.size;

        const users = [];
        const snapshot1 = Users
            .where('name', '>=', req.query.name)
            .where('name', '<=', req.query.name + '\uf8ff')

        var snapshot = await snapshot1.get();

        console.log('dadadsnapshot')
        console.log(snapshot)
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

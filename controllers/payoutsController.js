import Payouts from "../models/enabledchats.js"

export const getPayoutsByID = async (req, res) => {
    console.log(req.params)
    const docRef = await Payouts
        .where('iban', '==', req.params.iban)
        .get();
    // const prevSnapshot = await docRef.get();
    console.log('docRef')
    console.log(docRef.docs[0])
    // var user;

    // // prevSnapshot.forEach((doc) =>
    // //     user = doc.data()
    // // );
    // // console.log('user')
    // // console.log(user)

    // const snapshot1 = Users
    //     .orderBy('userName')
    //     .startAfter(docRef.docs[0])

    // snapshot = await snapshot1.limit(limit).get();
    // }
    // console.log('dadadsnapshot')
    // console.log(snapshot)
    // snapshot.forEach((doc) =>
    //     users.push(doc.data())
    // );
}
'use strict';

const DataStore = require('nedb');

const userStore = new DataStore({ filename: '../users', autoload: true });

userStore.loadDatabase((error) => {
    if (error) console.log(error);
});

//
// const newUser = {
//     _id: 'test',
//     id: 'test',
//     type: 'D',
//     timestamp: Date.now(),
//     matched: true,
//     matchedId: '1259907210715796',
// };


// userStore.find({ id: { $ne: 'test2' }, matched: false, type: 'D' }).sort({ timestamp: 1 }).limit(1).exec((error, unmatchedUser) => {
//     if (error) {
//         return;
//     }
//     console.log(unmatchedUser);
// });

// userStore.update({ id: 'test2' }, { $set: { matched: true, matchedId: 999 } }, (error, num, user) => {
//     if (error) {
//         return;
//     }
//     // console.log(user);
//     // console.log(num);
//
//     userStore.findOne({ id: 'test2' }, (error, user) => {
//         console.log(user);
//     });
// });

'use strict';

const DataStore = require('nedb');

const userStore = new DataStore({ filename: './users', autoload: true });

userStore.loadDatabase((error) => {
    if (error) console.log(error);
});

const newUser = {
    _id: 'test',
    id: 'test',
    type: 'D',
    timestamp: Date.now(),
    matched: true,
    matchedId: '1259907210715796',
};

userStore.update({ id: 'test' }, newUser, { upsert: true }, (error, num, docs) => {
    if (error) {
        return;
    }

    userStore.findOne({ id: 'test' }, (error, user) => {
        if (error) {
            return;
        }
        console.log('GET:', user);
    });

    console.log('SAVED:', docs);
});

// exports.getUser = (id) => {
//     console.log('GET USER');
//
//     return new Promise((resolve, reject) => {
//         userStore.find({ id }, (error, user) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//             resolve(user);
//         });
//     });
// };

// exports.saveUser = (userId, smType, timestamp) => {
//     console.log('SAVE USER');
//
//     const newUser = {
//         _id: userId,
//         id: userId,
//         type: smType,
//         timestamp,
//         matched: true,
//         matchedId: '1259907210715796',
//     };
//
//     return new Promise((resolve, reject) => {
//         userStore.update({ id: userId }, newUser, { upsert: false }, (error, num, docs) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//             console.log('SAVED:', docs);
//             resolve(docs);
//         });
//     });
// };
//
// exports.getUnmatchedUser = (smType) => {
//     console.log('FIND USER:', smType);
//
//     return new Promise((resolve, reject) => {
//         userStore.find({ matched: false, type: smType }).sort({ timestamp: 1 }).limit(1).exec((error, savedUser) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//             resolve(savedUser);
//         });
//     });
// };

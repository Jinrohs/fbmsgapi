'use strict';

const DataStore = require('nedb');

const userStore = new DataStore({ filename: './users', autoload: true });

userStore.loadDatabase((error) => {
    if (error) console.log(error);
});

exports.getUser = (id) => {
    console.log('GET USER');

    return new Promise((resolve, reject) => {
        userStore.find({ id }, (error, user) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(user);
        });
    });
};

exports.seveUser = (userId, smType, timestamp) => {
    console.log('SAVE USER');

    const newUser = {
        id: userId,
        type: smType,
        timestamp,
        matched: true,
        matchedId: '1259907210715796',
    };

    return new Promise((resolve, reject) => {
        userStore.insert(newUser, (error, savedUser) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(savedUser);
        });
    });
};

exports.getUnmatchedUser = (smType) => {
    console.log('FIND USER:', smType);

    return new Promise((resolve, reject) => {
        userStore.find({ matched: false, type: smType }).sort({ timestamp: 1 }).limit(1).exec((error, savedUser) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(savedUser);
        });
    });
};

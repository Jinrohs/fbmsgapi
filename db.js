'use strict';

const DataStore = require('nedb');

const userStore = new DataStore({ filename: './users', autoload: true });

userStore.loadDatabase((error) => {
    if (error) console.log(error);
});

exports.getUser = (id) => {
    console.log('GET USER');

    return new Promise((resolve, reject) => {
        userStore.findOne({ _id: id }, (error, user) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(user);
        });
    });
};

exports.saveUser = (userId, smType, timestamp) => {
    console.log('SAVE USER');

    const newUser = {
        _id: userId,
        id: userId,
        type: smType,
        timestamp,
        matched: false,
        matchedId: null,
    };

    return new Promise((resolve, reject) => {
        userStore.update({ id: userId }, newUser, { upsert: true }, (error, num, docs) => {
            if (error) {
                reject(error);
                return;
            }
            console.log('SAVED:', docs);
            resolve(docs);
        });
    });
};

exports.getUnmatchedUser = (selfId, smType) => {
    console.log('FIND USER:', smType);

    return new Promise((resolve, reject) => {
        userStore.find({ id: { $ne: selfId }, matched: false, type: smType }).sort({ timestamp: 1 }).limit(1).exec((error, unmatchedUser) => {
            if (error) {
                reject(error);
                return;
            }
            console.log(unmatchedUser);
            resolve(unmatchedUser[0]);
        });
    });
};

exports.matchUser = (selfId, matchedId) => {
    console.log('UPDATE USER:', selfId, matchedId);

    return new Promise((resolve, reject) => {
        userStore.update({ id: selfId }, { $set: { matched: true, matchedId } }, (error) => {
            if (error) {
                reject(error);
                return;
            }
            userStore.findOne({ id: selfId }, (findError, updatedSelfUser) => {
                if (findError) {
                    reject(findError);
                    return;
                }
                resolve(updatedSelfUser);
            });
        });
    });
};

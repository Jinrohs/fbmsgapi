'use strict';

const DataStore = require('nedb');

const userStore = new DataStore({ filename: './users', autoload: true });

userStore.loadDatabase((error) => {
    if (error) console.error(error);
});

exports.getUser = (id) => {
    console.log('DB: GET USER');

    return new Promise((resolve, reject) => {
        userStore.findOne({ id }, (error, user) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(user);
        });
    });
};

exports.deleteUser = (id) => {
    console.log('DB: DELETE USER');

    return new Promise((resolve, reject) => {
        userStore.remove({ id }, {}, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

exports.saveUser = (userId, smType, timestamp) => {
    console.log('DB: SAVE USER');

    const newUser = {
        _id: userId,
        id: userId,
        type: smType,
        timestamp,
        matched: false,
        matchedId: null,
        commentUpdated: Date.now(),
    };

    return new Promise((resolve, reject) => {
        userStore.update({ id: userId }, newUser, { upsert: true }, (error) => {
            if (error) {
                reject(error);
                return;
            }
            console.log('DB: SAVED', userId);
            resolve();
        });
    });
};

exports.getUnmatchedUser = (selfId, smType) => {
    console.log('DB: FIND USER:', smType);

    return new Promise((resolve, reject) => {
        userStore.find({ id: { $ne: selfId }, matched: false, type: smType }).sort({ timestamp: 1 }).limit(1).exec((error, unmatchedUser) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(unmatchedUser[0]);
        });
    });
};

exports.updateMatchedUser = (selfId, matchedId) => {
    console.log('DB: UPDATE USER:', selfId, matchedId);

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

exports.updateCommentTimestamp = (userId) => {
    console.log('DB: UPDATE COMMENT TIMESTAMP');

    return new Promise((resolve, reject) => {
        userStore.update({ id: userId }, { $set: { commentUpdated: Date.now() } }, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(true);
        });
    });
};

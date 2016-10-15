'use strict';

const db = require('./db');
const send = require('./send');

exports.mUser = (event) => {
    const senderId = event.sender.id;

    db.saveUser(senderId, 'M', event.timestamp)
        .then(() => db.getUnmatchedUser(senderId, 'S'))
        .then((sUser) => {
            if (!sUser) {
                const text = '罵倒したいユーザーを探しています...';
                send(senderId, { text });
                return;
            }

            const text = '罵倒されたいユーザーが見つかりました';
            db.matchUser(senderId, sUser.id)
                .then(db.matchUser(sUser.id, senderId))
                .then(() => {
                    send(senderId, { text });
                    send(sUser.id, { text });
                });
        })
        .catch((error) => {
            console.log(error);
            const text = 'データ取得に失敗しました';
            send(senderId, { text });
        });
};

exports.sUser = (event) => {
    const senderId = event.sender.id;

    db.saveUser(senderId, 'S', event.timestamp)
        .then(() => db.getUnmatchedUser(senderId, 'M'))
        .then((mUser) => {
            if (!mUser) {
                const text = '罵倒されたいユーザーを探しています...';
                send(senderId, { text });
                return;
            }

            const text = '罵倒されたいユーザーが見つかりました';
            db.matchUser(senderId, mUser.id)
                .then(db.matchUser(mUser.id, senderId))
                .then(() => {
                    send(senderId, { text });
                    send(mUser.id, { text });
                });
        })
        .catch((error) => {
            console.log(error);
            const text = 'データ取得に失敗しました';
            send(senderId, { text });
        });
};

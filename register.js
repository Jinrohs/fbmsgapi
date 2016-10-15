'use strict';

const db = require('./db');
const send = require('./send');

exports.mUser = (event) => {
    const senderId = event.sender.id;

    db.saveUser(senderId, 'M', event.timestamp)
        .then(() => db.getUnmatchedUser(senderId, 'S'))
        .then((sUser) => {
            if (!sUser) {
                send(senderId, { text: '罵倒してくれるユーザーを探しています...' });
                return;
            }

            db.matchUser(senderId, sUser.id)
                .then(db.matchUser(sUser.id, senderId))
                .then(() => {
                    send(senderId, { text: '罵倒してくれるユーザーが見つかりました' });
                    send(sUser.id, { text: '罵倒されたいユーザーが見つかりました' });
                });
        })
        .catch((error) => {
            console.log(error);
            send(senderId, { text: 'データ取得に失敗しました' });
        });
};

exports.sUser = (event) => {
    const senderId = event.sender.id;

    db.saveUser(senderId, 'S', event.timestamp)
        .then(() => db.getUnmatchedUser(senderId, 'M'))
        .then((mUser) => {
            if (!mUser) {
                send(senderId, { text: '罵倒されたいユーザーを探しています...' });
                return;
            }

            db.matchUser(senderId, mUser.id)
                .then(db.matchUser(mUser.id, senderId))
                .then(() => {
                    send(senderId, { text: '罵倒されたいユーザーが見つかりました' });
                    send(mUser.id, { text: '罵倒してくれるユーザーが見つかりました' });
                });
        })
        .catch((error) => {
            console.log(error);
            send(senderId, { text: 'データ取得に失敗しました' });
        });
};

'use strict';

const db = require('./db');
const send = require('./send');

exports.mUser = (event) => {
    const senderId = event.sender.id;

    db.saveUser(senderId, 'M', event.timestamp)
        .then(() => db.getUnmatchedUser('S'))
        .then((savedUser) => {
            if (savedUser.matched) {
                const text = '罵倒されたいユーザーが見つかりました';
                send(senderId, { text });
                return;
            }
            const text = '罵倒されたいユーザーを探しています...';
            send(senderId, { text });
        })
        .catch(() => {
            const text = 'データ取得に失敗しました';
            send(senderId, { text });
        });
};

exports.sUser = (event) => {
    const senderId = event.sender.id;

    db.saveUser(senderId, 'S', event.timestamp)
        .then(() => db.getUnmatchedUser('M'))
        .then((savedUser) => {
            if (savedUser.matched) {
                const text = '罵倒したいユーザーが見つかりました';
                send(senderId, { text });
                return;
            }
            const text = '罵倒したいユーザーを探しています...';
            send(senderId, { text });
        })
        .catch(() => {
            const text = 'データ取得に失敗しました';
            send(senderId, { text });
        });
};

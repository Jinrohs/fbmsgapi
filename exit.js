/**
 * 退出する
 */

'use strict';

const db = require('./db');
const send = require('./send');
const greeting = require('./greeting');

module.exports = (senderId) => {
    db.getUser(senderId)
        .then((user) => {
            send(senderId, { text: '[SMM] 退出します' });
            send(senderId, { text: '[SMM] ご利用ありがとうございました！' });

            db.deleteUser(senderId).then(() => {
                greeting(senderId);
            });

            if (user.matchedId) {
                send(user.matchedId, { text: '[SMM] 相手が退出しました' });
                send(user.matchedId, { text: '[SMM] ご利用ありがとうございました！' });

                db.deleteUser(user.matchedId).then(() => {
                    greeting(user.matchedId);
                });
            }
        });
};

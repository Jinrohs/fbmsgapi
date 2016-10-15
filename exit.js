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
            send(senderId, { text: '退出します' });
            send(senderId, { text: 'ご利用ありがとうございました！' });
            send(senderId, { text: '--------------' });
            greeting(senderId);

            if (user.matchedId) {
                send(user.matchedId, { text: '相手が退出しました' });
                send(user.matchedId, { text: 'ご利用ありがとうございました！' });
                send(user.matchedId, { text: '--------------' });
                greeting(user.matchedId);
            }
        });
};

'use strict';

const db = require('./db');
const send = require('./send');

module.exports = (event) => {
    const senderID = event.sender.id;
    const message = event.message;

    db.getUser(senderID).then((user) => {
        console.log('CONVERSATION:', user);

        const messageText = message.text;
        if (!messageText) {
            return;
        }

        // ここに画像生成処理を書く

        send(user.matchedId, { text: messageText });
    });
};

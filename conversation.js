'use strict';

const db = require('./db');
const send = require('./send');

module.exports = (event) => {
    const senderID = event.sender.id;
    const message = event.message;

    const matchedId = db.getUser(senderID);

    const messageText = message.text;
    if (!messageText) {
        return;
    }

    // ここに画像生成処理を書く

    send(matchedId, { message: { text: messageText } });
};

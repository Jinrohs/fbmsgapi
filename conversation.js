'use strict';

const db = require('./db');
const send = require('./send');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message;

    db.getUser(senderId).then((user) => {
        console.log('CONVERSATION:', user);

        const messageText = message.text;
        if (!messageText) {
            return;
        }

        if (!user.matched) {
            const text = user.type === 'M' ? 'まだマッチしていないからもうちょっと待ってろよ...' : 'まだマッチしていないのでお待ち下さい...';
            send(senderId, { text });
            return;
        }

        // ここに画像生成処理を書く

        send(user.matchedId, { text: messageText });
    });
};

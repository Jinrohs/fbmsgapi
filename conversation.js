'use strict';

const db = require('./db');
const send = require('./send');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message;

    db.getUser(senderId).then((user) => {
        console.log('CONVERSATION:', user);

        const messageAttachments = message.attachments;
        const messageText = message.text;

        if (!messageText && messageAttachments) {
            const text = user.type === 'M' ? '画像なんか送りつけてんじゃねえぞこのブタ野郎...' : '画像は勘弁してください...すいません...';
            send(senderId, { text });
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

'use strict';

const db = require('./db');
const send = require('./send');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message;

    db.getUser(senderId)
        .then((user) => {
            console.log('CONVERSATION:', user);

            const sendAttachments = message.attachments;
            const sendText = message.text;

            // 画像等がある場合
            if (!sendText && sendAttachments) {
                const text = user.type === 'M' ? '画像なんか送りつけてんじゃねえぞこのブタ野郎...' : '画像は勘弁してください...すいません...';
                send(senderId, { text });
                sendAttachments.forEach(sendAttachment => send(user.matchedId, { attachment: sendAttachment }));
                return;
            }

            // マッチしていないのに発言した場合
            if (!user.matched) {
                const text = user.type === 'M' ? 'まだマッチしていないからもうちょっと待ってろよ...' : 'まだマッチしていないのでお待ち下さい...';
                send(senderId, { text });
                return;
            }

            // TODO: ここに画像生成処理を書く

            send(user.matchedId, { text: sendText });
            db.updateCommentTimestamp(senderId);
        });
};

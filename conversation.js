'use strict';

const db = require('./db');
const send = require('./send');
const exec = require('child_process').exec;
const crypto = require('crypto');
const effecter = require('./effecter');

const md5hex = (src) => {
    const md5hash = crypto.createHash('md5');
    md5hash.update(src, 'binary');
    return md5hash.digest('hex');
};

const getFilePath = (user) => {
    const filename = md5hex(user.id + user.matchedId + user.timestamp + Date.now());
    return `./static/${filename}.png`;
};

const getImageMessage = filePath => ({
    attachment: {
        type: 'image',
        payload: {
            url: `https://voyager.mydns.vc/fbmsgapi/${filePath}`,
        },
    },
});

const showEffect = (user) => {
    const probabillity = 1.0;
    if (Math.random() <= probabillity) {
        effecter(user.matchedId, user.type);
    }
};

module.exports = (senderId, message) => {
    db.getUser(senderId)
        .then((user) => {
            console.log('CONVERSATION:', user);

            if (!user) {
                return;
            }

            const sendAttachments = message.attachments;
            const sendText = message.text;

            // 画像等がある場合
            if (!sendText && sendAttachments) {
                const text = user.type === 'M' ? '[SMM] 画像なんか送りつけてんじゃねえぞこのブタ野郎...' : '[SMM] 画像は勘弁してください...すいません...';
                send(senderId, { text });
                sendAttachments.forEach(sendAttachment => send(user.matchedId, { attachment: sendAttachment }));
                return;
            }

            // マッチしていないのに発言した場合
            if (!user.matched) {
                const text = user.type === 'M' ? '[SMM] まだ罵倒してくれるユーザーが見つかっていません...' : '[SMM] まだ罵倒されたいブタ野郎が見つかっていませんので、お待ち下さい...';
                send(senderId, { text });
                return;
            }

            const filePath = getFilePath(user);
            const cmd = `/home/ubuntu/FBMsgrHackathon/python/image_gen.py ${sendText} ${user.type} ${filePath}`;
            console.log(cmd);
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    console.log(err + stderr);
                }
                send(user.matchedId, getImageMessage(filePath))
                    .then(db.updateCommentTimestamp(senderId))
                    .then(showEffect(user));
            });
        });
};

'use strict';

const send = require('./send');

module.exports = (event) => {
    const senderId = event.sender.id;
    const timeOfMessage = event.timestamp;
    const message = event.message;

    if (message.is_echo) {
        console.log('エコーがきました');
        return;
    }

    console.log(`メッセージ受信 ユーザ: ${senderId}, 時間${timeOfMessage}`);

    const messageText = message.text || '';
    const messageAttachments = message.attachments;

    if (!messageText && messageAttachments) {
        console.log('ATTACHMENTS:', messageAttachments);
        send(senderId, `${senderId}から画像が来ました`);
        return;
    }

    switch (messageText) {
        case 'image':
            break;
        case 'button':
            break;
        case 'generic':
            break;
        case 'receipt':
            break;
        default: {
            const text = `${messageText}~? マジかぁ超ウケルwww`;
            send(senderId, { message: { text } });
            break;
        }
    }
};

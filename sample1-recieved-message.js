'use strict';

const request = require('request');
const pageAccessToken = require('./page-access-token');

const sendTextMessage = (recipientId, messageText, callback) => {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: pageAccessToken },
        method: 'POST',
        json: {
            recipient: { id: recipientId },
            message: { text: messageText },
        },
    }, (err, response, body) => {
        if (typeof callback === 'function') {
            callback(err, response, body);
        }
    });
};

// const sendTextMessage = (recipientId, messageText) => {
//     const messageData = ;
//     callSendApi(messageData);
// };

module.exports = (event) => {
    const senderID = event.sender.id;
    const recipientID = event.recipient.id;
    const timeOfMessage = event.timestamp;
    const message = event.message;

    if (message.is_echo) {
        console.log('エコーがきました');
    }

    console.log(`メッセージ受信 ユーザ: ${senderID}, ページ ${recipientID}, 時間${timeOfMessage}`);
    // console.log(JSON.stringify(message));
    // const messageId = message.mid;
    const messageText = message.text || '';
    const messageAttachments = message.attachments;

    if (!messageText && messageAttachments) {
        console.log('ATTACHMENTS:', messageAttachments);
        sendTextMessage(`${senderID}Message with attachment received`);
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
            const newMessage = `${messageText}~? マジかぁ超ウケルwww`;
            sendTextMessage(senderID, newMessage);
            break;
        }
    }
};

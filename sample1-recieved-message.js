'use strict';

const request = require('request');
const pageAccessToken = require('./page-access-token');

const callSendApi = (messageData, callback) => {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: pageAccessToken },
        method: 'POST',
        json: messageData,
    }, (err, response, body) => {
        if (callback !== undefined) {
            callback(err, response, body);
        }
    });
};

const sendTextMessage = (recipientId, messageText) => {
    const messageData = {
        recipient: { id: recipientId },
        message: { text: messageText },
    };
    callSendApi(messageData);
};

module.exports = (event) => {
    const senderID = event.sender.id;
    const recipientID = event.recipient.id;
    const timeOfMessage = event.timestamp;
    const message = event.message;

    console.log(`メッセージ受信 ユーザ: ${senderID}, ページ ${recipientID}, 時間${timeOfMessage}`);
    console.log(JSON.stringify(message));

    // const messageId = message.mid;
    const messageText = message.text;
    const messageAttachments = message.attachments;

    if (messageText) {
        console.log(message);
        // If we receive a text message, check to see if it matches any special
        // keywords and send back the corresponding example. Otherwise, just echo
        // the text we received.
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
    } else if (messageAttachments) {
        sendTextMessage(`${senderID}Message with attachment received`);
    }
};

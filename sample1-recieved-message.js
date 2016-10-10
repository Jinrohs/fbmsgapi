const request = require('request');
const pageAccessToken = require('./page-access-token');

var callSendApi = (messageData, callback) => {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: pageAccessToken },
        method: 'POST',
        json: messageData
    }, (err, response, body) => {
        if(callback != undefined) {
            callback(err, response, body);
        }
    } );
};

var sendTextMessage = (recipientId, messageText) => {
    let messageData = {
        recipient: {id : recipientId},
        message: { text: messageText }
    };
    callSendApi(messageData);
};

module.exports = (event) => {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("メッセージ受信 ユーザ: %d, ページ %d, 時間%d",
        senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;
    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {
        console.log(message);
        // If we receive a text message, check to see if it matches any special
        // keywords and send back the corresponding example. Otherwise, just echo
        // the text we received.
        switch (messageText) {
            case 'image':
                //sendImageMessage(senderID);
                break;
            case 'button':
                //sendButtonMessage(senderID);
                break;
            case 'generic':
                //sendGenericMessage(senderID);
                break;
            case 'receipt':
                //sendReceiptMessage(senderID);
                break;
            default:
                newMessage = messageText + "~? マジかぁ超ウケルwww";
                sendTextMessage(senderID, newMessage);
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received");
    }
};
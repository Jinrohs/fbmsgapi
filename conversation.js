const db = require('./db');
const send = require('./send');

module.exports = (event) => {
    if(event.is_echo) {
        return;
    }

    const senderID = event.sender.id;
    const message = event.message;
    
    const matchedId = db.getUser(senderID).matchedUserId;

    const messageText = message.text;
    if(!messageText) {
        return;
    }

    // ここに画像生成処理を書く
    send(matchedId, {text: messageText});
};

const fs = require('fs');
const request = require('request');

const pageAccessToken = fs.readFileSync('./page_access_token', 'utf-8');

module.exports = (senderId, message, callback) => {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: pageAccessToken },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message,
        },
    }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            console.log(`SEND ERROR: ${error}`);
            console.log(`SEND RESPONCE: ${JSON.stringify(response)}`);
            console.log(`SEND BODY: ${JSON.stringify(body)}`);
        }

        if (typeof callback === 'function') {
            callback(error, response, body);
        }
    });
};

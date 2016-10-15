
const request = require('request');
const pageAccessToken = require('./page-access-token');

module.exports = (recipientId, message, callback) => {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: pageAccessToken },
        method: 'POST',
        json: {
            recipient: { id: recipientId },
            message,
        },
    }, (err, response, body) => {
        if (typeof callback === 'function') {
            callback(err, response, body);
        }
    });
};

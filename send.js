
const request = require('request');
const pageAccessToken = require('./page-access-token');

module.exports = (senderId, message, callback) => {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: pageAccessToken },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message,
        },
    }, (err, response, body) => {
        if (err) {
            console.log(`err: ${err}`);
        }

        if (response.statusCode !== 200) {
            console.log(`err: ${err}, response${JSON.stringify(response)}, body: ${JSON.stringify(body)}`);
        }

        if (typeof callback === 'function') {
            callback(err, response, body);
        }
    });
};

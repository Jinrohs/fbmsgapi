/**
 * 初回起動時にS or Mのアンケートを送る
 */

const request = require('request');
const pageAccessToken = require('./page-access-token');

const greetPayload = {
    template_type: "button",
    text: "[運営]どちらかを選んでね・",
    buttons: [
        {
            type: "postback",
            title: "罵倒したい",
            payload: "REGISTER_AS_S"
        },
        {
            "type": "postback",
            "title": "罵倒されたい",
            "payload": "REGISTER_AS_M"
        }
    ]
};

module.exports = (callback) => {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: { access_token: pageAccessToken },
        method: 'POST',
        json: {
            setting_type: "call_to_actions",
            thread_state: "new_thread",
            call_to_actions: [
                {
                    payload: greetPayload
                }
            ]
        }
    }, (err, response, body) => {
        if (callback != undefined) {
            callback(err, response, body);
        }
    });
};
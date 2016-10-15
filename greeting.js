/**
 * 初回起動時にS or Mのアンケートを送る
 */

const send = require('./send');

const message = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'button',
            text: 'あなたのタイプはどちらですか？',
            buttons: [
                {
                    type: 'postback',
                    title: '罵倒したい',
                    payload: 'REGISTER_AS_M',
                },
                {
                    type: 'postback',
                    title: '罵倒されたい',
                    payload: 'REGISTER_AS_M',
                },
            ],
        },
    },
};

const callback = (err, response, body) => {
    if (err) {
        console.log(`err: ${err}response${response}body: ${body}`);
    }
};

module.exports = (event) => {
    const recipientID = event.recipient.id;
    send(recipientID, message, callback);
};

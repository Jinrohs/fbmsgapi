/**
 * 初回起動時にS or Mのアンケートを送る
 */

'use strict';

const send = require('./send');

const greetingMessage = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'button',
            text: '[SMM] あなたのタイプはどちらですか？',
            buttons: [
                {
                    type: 'postback',
                    title: '罵倒したい',
                    payload: 'REGISTER_AS_S',
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

module.exports = (senderId) => {
    send(senderId, greetingMessage).then(send(senderId, { text: '[SMM] あなたの欲望のまま、会話を初めてみましょう！' }));
};

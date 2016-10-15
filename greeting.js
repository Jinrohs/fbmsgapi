/**
 * 初回起動時にS or Mのアンケートを送る
 */

'use strict';

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

module.exports = (event) => {
    send(event.sender.id, message);
    send(event.sender.id, { text: 'あなたの欲望のまま、会話を初めてみましょう' });
};

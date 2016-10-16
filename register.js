/**
 * S or Mの選択を登録し、マッチングする
 */

'use strict';

const db = require('./db');
const send = require('./send');
const request = require('request');
const fs = require('fs');

const pageAccessToken = fs.readFileSync('./page_access_token', 'utf-8');

const showLoading = (senderId) => new Promise((resolve, reject) => {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: pageAccessToken },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            sender_action: 'typing_on',
        },
    }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            console.log(`SEND ERROR: ${error}`);
            console.log(`SEND RESPONCE: ${JSON.stringify(response)}`);
            console.log(`SEND BODY: ${JSON.stringify(body)}`);
            reject(error);
            return;
        }

        resolve(response, body);
    });
});

exports.mUser = (senderId, timestamp) => {
    send(senderId, { text: '[SMM] かしこまりました、罵倒されたいのですね...' });

    db.saveUser(senderId, 'M', timestamp)
        .then(() => db.getUnmatchedUser(senderId, 'S'))
        .then((sUser) => {
            if (!sUser) {
                console.log('WAITING: S user...');
                send(senderId, { text: '[SMM] ユーザーを探しています...' })
                    .then(showLoading(senderId));
                return;
            }

            db.updateMatchedUser(senderId, sUser.id)
                .then(db.updateMatchedUser(sUser.id, senderId))
                .then(() => {
                    send(senderId, { text: '[SMM] 罵倒してくれるユーザーが見つかりました！' });
                    send(senderId, { text: '[SMM] まずは罵倒してくださいと挨拶してみましょう' });

                    send(sUser.id, { text: '[SMM] 罵倒されたいユーザーが見つかりました！' });
                    send(sUser.id, { text: '[SMM] 存分に罵倒してやりましょう！' });
                });
        })
        .catch((error) => {
            console.log('REGISTER ERROR:', error);
            send(senderId, { text: '[SMM] データ取得に失敗したようです、もう一度お試しください' });
        });
};

exports.sUser = (senderId, timestamp) => {
    send(senderId, { text: '[SMM] なるほど、あなたはどSなのですね...' });

    db.saveUser(senderId, 'S', timestamp)
        .then(() => db.getUnmatchedUser(senderId, 'M'))
        .then((mUser) => {
            if (!mUser) {
                console.log('WAITING: M user...');
                send(senderId, { text: '[SMM] ユーザーを探しています...' });
                return;
            }

            db.updateMatchedUser(senderId, mUser.id)
                .then(db.updateMatchedUser(mUser.id, senderId))
                .then(() => {
                    send(senderId, { text: '[SMM] 罵倒されたいユーザーが見つかりました！' });
                    send(senderId, { text: '[SMM] 存分に罵倒してやりましょう！' });

                    send(mUser.id, { text: '[SMM] 罵倒してくれるユーザーが見つかりました！' });
                    send(mUser.id, { text: '[SMM] まずは罵倒してくださいと挨拶してみましょう' });
                });
        })
        .catch((error) => {
            console.log('REGISTER ERROR:', error);
            send(senderId, { text: '[SMM] データ取得に失敗したようです、もう一度お試しください' });
        });
};

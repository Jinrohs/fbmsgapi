/**
 * S or Mの選択を登録し、マッチングする
 */

'use strict';

const db = require('./db');
const send = require('./send');

exports.mUser = (event) => {
    const senderId = event.sender.id;

    db.saveUser(senderId, 'M', event.timestamp)
        .then(() => db.getUnmatchedUser(senderId, 'S'))
        .then((sUser) => {
            if (!sUser) {
                send(senderId, { text: '罵倒してくれるユーザーを探しています...' });
                return;
            }

            db.updateMatchedUser(senderId, sUser.id)
                .then(db.updateMatchedUser(sUser.id, senderId))
                .then(() => {
                    send(senderId, { text: '罵倒してくれるユーザーが見つかりました' });
                    send(senderId, { text: '何か発言して、存分に罵倒されてみましょう！' });
                    send(sUser.id, { text: '罵倒されたいユーザーが見つかりました' });
                    send(sUser.id, { text: '存分に罵倒してやりましょう！' });
                });
        })
        .catch((error) => {
            console.log(error);
            send(senderId, { text: 'データ取得に失敗したようです、もう一度お試しください' });
        });
};

exports.sUser = (event) => {
    const senderId = event.sender.id;

    db.saveUser(senderId, 'S', event.timestamp)
        .then(() => db.getUnmatchedUser(senderId, 'M'))
        .then((mUser) => {
            if (!mUser) {
                send(senderId, { text: '罵倒されたいユーザーを探しています...' });
                return;
            }

            db.updateMatchedUser(senderId, mUser.id)
                .then(db.updateMatchedUser(mUser.id, senderId))
                .then(() => {
                    send(senderId, { text: '罵倒されたいユーザーが見つかりました' });
                    send(senderId, { text: '存分に罵倒してやりましょう！' });
                    send(mUser.id, { text: '罵倒してくれるユーザーが見つかりました' });
                    send(mUser.id, { text: '何か発言して、存分に罵倒されてみましょう！' });
                });
        })
        .catch((error) => {
            console.log(error);
            send(senderId, { text: 'データ取得に失敗したようです、もう一度お試しください' });
        });
};

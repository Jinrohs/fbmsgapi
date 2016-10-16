'use strict';

/**
 * 効果音をランダムで投稿する
 */

const send = require('./send');

const getEffectImage = filePath => ({
    attachment: {
        type: 'image',
        payload: {
            url: `https://voyager.mydns.vc/fbmsgapi/${filePath}`,
        },
    },
});

module.exports = (senderId, smType) => {

};

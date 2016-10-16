'use strict';

/**
 * 効果音をランダムで投稿する
 */

const send = require('./send');
const fs = require('fs');


const getEffectImage = filePath => ({
    attachment: {
        type: 'image',
        payload: {
            url: `https://voyager.mydns.vc/fbmsgapi/${filePath}`,
        },
    },
});

const rand = (min, max) => (
    Math.round((Math.random() * (max - min)) + min)
);

module.exports = (senderId, smType) => {
    const dir = `static/effector_${smType === 'M' ? 'm' : 's'}`;
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        const index = rand(1, files.length);
        const file = `${dir}/${files[index]}`;
        send(senderId, getEffectImage(file));
    });
};

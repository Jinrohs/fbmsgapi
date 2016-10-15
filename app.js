/**
 * メッセージ受信サンプル
 */

const _ = require('lodash');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const greeting = require('./greeting');
const register = require('./register');
const conversation = require('./conversation');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/fbmsgapi/v1/webhook', (req, res) => {
    const data = req.body;

    if (!(data && data.entry)) {
        res.status(400).end();
    }

    data.entry.forEach((pageEntry) => {
        _.forEach(pageEntry.messaging, (event) => {
            if (event.message) {
                if (event.message.is_echo) {
                    return;
                }
                console.log('==========================');
                console.log('MESSAGE:', `senderId: ${event.sender.id}, text: ${event.message.text}`);
                conversation(event);
                return;
            }

            if (event.delivery) {
                return;
            }

            if (event.postback) {
                console.log('==========================');
                if (event.postback.payload === 'NEW_THREAD') {
                    console.log('GREETING:', event);
                    greeting(event);
                    return;
                }

                if (event.postback.payload === 'REGISTER_AS_M') {
                    console.log('REGISTER:', event);
                    register.mUser(event);
                    return;
                }

                if (event.postback.payload === 'REGISTER_AS_S') {
                    console.log('REGISTER:', event);
                    register.sUser(event);
                    return;
                }
            }
        });
    });

    res.status(200).end();
});

const server = http.createServer(app);
server.listen(3000);

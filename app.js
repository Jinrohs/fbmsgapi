/**
 * メッセージ受信サンプル
 */

const _ = require('lodash');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const greeting = require('./greeting');
const register = require('./register');
const communication = require('./communication');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/fbmsgapi/v1/webhook', (req, res) => {
    console.log('==========================');
    const data = req.body;

    if (!(data && data.entry)) {
        res.status(400).end();
    }

    data.entry.forEach((pageEntry) => {
        _.forEach(pageEntry.messaging, (messagingEvent) => {
            if (messagingEvent.optins) {
                return;
            }

            if (messagingEvent.message) {
                if (messagingEvent.message.is_echo) {
                    return;
                }

                console.log('MESSAGE:', messagingEvent);
                communication(messagingEvent);
                return;
            }

            if (messagingEvent.delivery) {
                return;
            }

            if (messagingEvent.postback) {
                console.log('POSTBACK:', messagingEvent);
                if (messagingEvent.postback.payload === 'NEW_THREAD') {
                    greeting(messagingEvent);
                    return;
                }

                if (messagingEvent.postback.payload === 'REGISTER_AS_M') {
                    register.mUser(messagingEvent);
                    return;
                }

                if (messagingEvent.postback.payload === 'REGISTER_AS_S') {
                    register.sUser(messagingEvent);
                    return;
                }
            }
        });
    });

    res.status(200).end();
});

const server = http.createServer(app);
server.listen(3000);

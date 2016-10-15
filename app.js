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
const exit = require('./exit');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routeMessage = (event) => {
    if (event.message) {
        if (event.message.is_echo) {
            return;
        }

        console.log('==========================');
        console.log('MESSAGE:', `senderId: ${event.sender.id}, text: ${event.message.text}`);

        if (event.message.text === '退出') {
            console.log('EXIT');
            exit(event.sender.id);
            return;
        }

        conversation(event.sender.id, event.message);
        return;
    }

    if (event.delivery) {
        return;
    }

    if (event.postback) {
        console.log('==========================');
        if (event.postback.payload === 'NEW_THREAD') {
            console.log('GREETING:', event);
            greeting(event.sender.id);
            return;
        }

        if (event.postback.payload === 'REGISTER_AS_M') {
            console.log('REGISTER:', event);
            register.mUser(event.sender.id, event.timestamp);
            return;
        }

        if (event.postback.payload === 'REGISTER_AS_S') {
            console.log('REGISTER:', event);
            register.sUser(event.sender.id, event.timestamp);
            return;
        }
    }
};

app.post('/fbmsgapi/v1/webhook', (req, res) => {
    const data = req.body;

    if (!(data && data.entry)) {
        res.status(400).end();
    }

    data.entry.forEach((pageEntry) => {
        _.forEach(pageEntry.messaging, routeMessage);
    });

    res.status(200).end();
});

const server = http.createServer(app);
server.listen(3000);

/**
 * メッセージ受信サンプル
 */

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const receivedMessage = require('./sample1-recieved-message');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/fbmsgapi/v1/webhook', (req, res) => {
    console.log('==========================');

    const data = req.body;

    console.log(data);

    console.log('-------');


    if (data.object !== 'page') {
        console.log('not page');
        res.sendStatus(200);
    }

    data.entry.forEach((pageEntry) => {
        pageEntry.messaging.forEach((messagingEvent) => {
            console.log(messagingEvent);
            if (messagingEvent.optins) {
                // console.log('receivedAuthentication');
                // receivedAuthentication(messagingEvent);
            } else if (messagingEvent.message) {
                // console.log('recievedMessage');
                receivedMessage(messagingEvent);
            } else if (messagingEvent.delivery) {
                // console.log('receivedDeliveryConfirmation');
                // receivedDeliveryConfirmation(messagingEvent);
            } else if (messagingEvent.postback) {
                // console.log('receivedPostback');
                // receivedPostback(messagingEvent);
            } else {
                // console.log('Webhook received unknown messagingEvent: ', messagingEvent);
            }
        });
    });

    res.sendStatus(200);
});

const server = http.createServer(app);
server.listen(3000);

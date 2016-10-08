'use strict';

/**
* facebook messagenr apiの認証用
*/
const http = require('http');
const express = require('express');
const app = express();

app.get('/v1/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'e7c65e7dfc53550c566db30cb41d550b') {
	res.send(req.query['hub.challenge']);
    } else {
	res.send('Error, wrong validation token');
    }
});

const server = http.createServer(app);
server.listen(3000, () => {
    if (process && process.send) {
	process.send('server listening.');
    }
});



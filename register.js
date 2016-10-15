'use strict';

module.exports = function (event) {
    const senderId = event.sender.id;
    const timeOfMessage = event.timestamp;
    const message = event.message;
};

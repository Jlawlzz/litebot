'use strict';

const convoEngine = require('./src/engine');
const async = require('async');
const config = require('config');
const serviceRouter = require(`./services/${config.service}/router`);

module.exports = function(rawEvent) {

  if(rawEvent.message || rawEvent.postback) {

    let senderID = rawEvent.sender.id;

    async.waterfall([

      function parseMessage(callback) {
        serviceRouter.parse(rawEvent)
        .then(function(parsedMessage) {
          callback(null, parsedMessage);
        });
      },

      function courierIn(parsedMessage, callback) {
        convoEngine.in(parsedMessage, senderID)
        .then(function(digestedMessage) {
          callback(null, digestedMessage);
        });
      },

      function courierOut(digestedMessage, callback) {
        convoEngine.out(digestedMessage, senderID)
        .then(function(newMessage){
          callback(null, newMessage);
        });
      }],

      function(err, newMessage) {
        serviceRouter.send(newMessage, senderID)
      }
    );
  }
}

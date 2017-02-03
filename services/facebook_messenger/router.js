const messageTemplate = require("./templates/message");
const buttonTemplate = require("./templates/button");
const genericTemplate = require("./templates/generic");
const quickReplyTemplate = require("./templates/quickReply");

const Message = require("./webhooks/message");
const Postback = require("./webhooks/postback");

const send = require("./send");

module.exports = {

  parse(messagingEvent) {
    return new Promise(function(resolve, reject) {
      if (messagingEvent.optin) {
        console.log("Received Authentication");
        reject(new Error);
      } else if (messagingEvent.message) {
        console.log("Received Message");
        let message = new Message(messagingEvent);
        message.isValid() ? resolve(message) : reject(new Error);
      } else if (messagingEvent.delivery) {
        console.log("Received Delivery Confirmation");
        reject(new Error);
      } else if (messagingEvent.postback) {
        console.log("Received Postback");
        resolve(new Postback(messagingEvent));
      } else if (messagingEvent.read) {
        console.log("Received Message Read");
        reject(new Error);
      } else {
        console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        reject(new Error);
      }
    });
  },

  format(obj, id) {
    //  figure out what type of message the obj will be and return the formatted result
    if (obj.type === "message") {
      console.log("FORMATTING MESSAGE");
      return messageTemplate(id, obj.text);
    } else if (obj.type === "button") {
      console.log("FORMATTING BUTTON");
      return buttonTemplate(id, obj);
    } else if (obj.type === "generic") {
      console.log("FORMATTING GENERIC");
      return genericTemplate(id, obj);
    } else if (obj.type === "quickReply") {
      console.log("FORMATTING QUICKREPLY");
      return quickReplyTemplate(id, obj);
    }
  },

  send(outgoingObj, id) {
    for (let i = 0, len = outgoingObj.length; i < len; i++) {
      let obj = outgoingObj[i];
      if (i > 0 && obj !== null) {
        sleep(1000).then(function() {
          send(this.format(obj, id));
        }.bind(this));
      } else {
        send(this.format(obj, id));
      }
    }
  }
};

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

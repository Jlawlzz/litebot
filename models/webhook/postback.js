'use strict'

module.exports = class Postback {

  constructor(event) {

    this.senderID = event.sender.id;
    this.recipientID = event.recipient.id;
    this.timeOfMessage = event.timestamp;

    // types of messages
    this.postback = event.postback || 0;

    // You may get a text or attachment but not both
    this.userContent = this.postback.payload.toLowerCase();
  }

}

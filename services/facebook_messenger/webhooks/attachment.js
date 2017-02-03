";use strict";

module.exports = class Attachment {

  constructor(event) {
    this.senderID = event.sender.id;
    this.recipientID = event.recipient.id;
    this.timeOfMessage = event.timestamp;

    // types of messages
    this.attachment = event.message.attachments || false;

    // message meta data
    this.isEcho = this.message.is_echo || false;
    this.messageId = this.message.mid || false;
    this.appId = this.message.app_id || false;
    this.metadata = this.message.metadata || {};

    // You may get a text or attachment but not both
    this.userContent = this.attachment;
  }

  isValid() {
    return !this.isEcho && this.userContent;
  }
};

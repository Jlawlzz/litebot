"use strict";

module.exports = function(recipientID, payload) {
    if (payload !== null) {
      return {
        "recipient": {
          "id": recipientID
        },
        "message": {
          "text": payload.text,
          "quick_replies": createQuickReplies(payload.options)
          }
        };
      }
    };

function createQuickReplies(quickReplies) {
  let quickReplyArray;

  if (quickReplies[0].content_type === "location") {
    quickReplyArray = quickReplies;
  } else {
    quickReplyArray = [];
    quickReplies.forEach(function(quickReply) {
      quickReplyArray.push(
        {
          "content_type": "text",
          "title": quickReply.title,
          "payload": quickReply.data
        }
      );
    });
  }

  return quickReplyArray;
}

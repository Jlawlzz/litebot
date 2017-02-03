'use strict'

module.exports = function (recipientID, payload) {

    if (payload !== null) {

      return {
        recipient: {
          id: recipientID
        },
        message: {
          text: payload,
          metadata: "DEVELOPER_DEFINED_METADATA"
        }
      };

    }
  }

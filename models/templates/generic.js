'use strict';

module.exports = function (recipientID, payload) {

    if (payload !== null) {

      return {
        "recipient": {
          "id": recipientID
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": createElements(payload.options)
            }
          }
        }
      }
    }
  }

function createElements(elements) {
  let elementArray = [];
  elements.forEach(function(element) {
    elementArray.push(
      {
        "title": element.title,
        "buttons": createButtons(element.buttons)
      }
    )
  });
  return elementArray;
}

function createButtons(buttons) {
  console.log("BUTTONS", buttons)
  let buttonArray = [];
  buttons.forEach(function(button) {
    buttonArray.push(
      {
        "type": button.type,
        "title": button.text,
        "payload": button.payload
      }
    )
  });
  return buttonArray;
}

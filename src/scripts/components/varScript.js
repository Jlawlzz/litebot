"use strict";

const store = require("../../store");

function swapVar(message, fbID) {
  let messageArray = message.split(" ");
  messageArray = messageArray.map(function(word) {
    if (word.includes("${")) {
      const iOne = word.indexOf("${") + 3;
      const iTwo = word.indexOf("}") - 1;
      const punctuation = word[word.length - 1];
      const dynamicContent = word.substr(iOne, (iTwo - iOne));
      word = store.getDatapoint(dynamicContent, fbID);
      if (punctuation) { word = word + punctuation; }
    }
    return word;
  });
  return messageArray.join(" ");
}

module.exports = {

  type() {
    return "varScript";
  },

  digest(currentFrame, message, fbID) {
    return new Promise(function(resolve, reject) {
      if (currentFrame["responseKey"]) {
        store.saveDatapoint(currentFrame["responseKey"], message, fbID);
      }
      resolve();
    });
  },

  format(currentFrame, fbID) {
    if (currentFrame["text"] && currentFrame["text"].includes("${")) {
      currentFrame = Object.assign({}, currentFrame);
      currentFrame["text"] = swapVar(currentFrame["text"], fbID);
    }
    return currentFrame;
  }
};

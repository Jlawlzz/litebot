"use strict";

const state = require("./state/engine");
const scriptEngine = require("./scripts/engine");


let messagesArray = [];

module.exports = {

  set(obj, message, fbID) {
    // if multiple messages at same time
    while (obj.waitForUser === false) {
      if(obj.type !== "gate") {
        obj = scriptEngine.format(obj, fbID);
        messagesArray.push(obj);
      }
      state.next(message, fbID);
      obj = state.get(fbID);
    }

    obj = scriptEngine.format(obj, fbID);
    messagesArray.push(obj);
    let outgoingMessages = messagesArray;

    // reset
    messagesArray = [];
    return outgoingMessages;
  }

};

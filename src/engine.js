"use strict";

const Promise = require("bluebird");
const state = require("./state/engine");
const messageThread = require("./messageThread");
const scriptEngine = require("./scripts/engine");
const store = require("./store");

let currentState;

module.exports = {

  in(rawEvent, fbID) {
    return new Promise(function(resolve, reject) {
      let message = rawEvent.userContent;
      //  Grab state from previous turn
      store.setUser(fbID);
      currentState = state.get(fbID);
      //  If the currentState includes scripts, iterate through and execute them
      scriptEngine.digest(currentState, message, fbID)
      .then(function() {
        resolve(message);
      });
    });
  },

  out(message, fbID) {
    return new Promise(function(resolve, reject) {
      currentState = state.get(fbID);

      store.saveData(fbID);
      state.next(message, fbID);
      message = "VOID";
      currentState = state.get(fbID);
      const outgoingMessages = messageThread.set(currentState, message, fbID);
      resolve(outgoingMessages);
    });
  }
};

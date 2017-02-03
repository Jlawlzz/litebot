"use strict";

const Promise = require("bluebird");
const config = require("config");

const scriptLib = [];

config.scripts.forEach(function(script) {
  scriptLib.push(require(`./components/${script}`));
});

let output;

module.exports = {

  digest(currentState, message, fbID) {
    return Promise.each(scriptLib, function(script) {
      if (currentState.scripts && currentState.scripts.indexOf(script.type()) !== -1) {
        return script.digest(currentState, message, fbID);
      } else {
        return Promise.resolve();
      }
    });
  },

  format(currentState, fbID) {
    if (currentState.scripts) {
      scriptLib.forEach(function(script) {
        if (currentState.scripts && currentState.scripts.indexOf(script.type()) !== -1) {
          let newOutgoingMessage = script.format(currentState, fbID);
          newOutgoingMessage ? output = newOutgoingMessage : output = currentState;
        }
      });
      return output;
    } else {
      return currentState;
    }
  }
};

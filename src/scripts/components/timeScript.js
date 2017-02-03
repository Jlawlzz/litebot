"use strict";

const store = require("../../store");

module.exports = {

  type() {
    return "timeScript";
  },

  digest(currentFrame, message, fbID) {
    return new Promise(function(resolve, reject) {
      const time = store.users[fbID]["data"][currentFrame["responseKey"]];

      if (!testTime(time)) {
        store.addFlag(fbID, "unknown-input");
      }
      store.users[fbID]["data"][currentFrame["responseKey"]] = time;

      resolve();
    });
  },

  format(currentFrame) {
    return currentFrame;
  }
};


function testTime(time) {
  const regex = /^([0]?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)?$/i;
  return regex.test(time);
}

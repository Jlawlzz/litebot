"use strict";

const store = require('../../store');

function review() {
  let results = '';
  for (let keyVal in store.data) {
    results += `${keyVal}: ${store.data[keyVal]}\n`;
  }
  return results;
}

module.exports = {

  type(){
    return "dbScript";
  },

  digest(currentFrame, message) {
  },

  format(currentFrame, fbID) {
    currentFrame = Object.assign({}, currentFrame);
    currentFrame["text"] += review();
    return currentFrame;
  }

}

"use strict";

const store = require("../store");
const content = require("../../content");
const config = require("config");
const initialState = "STEP:1_GET_STARTED_PAYLOAD";

const flagLib = {};
const keywordLib = {};

config.flags.forEach(flag => {
  flagLib[flag] = require(`./flags/${flag}`);
});

config.keywords.forEach(keyword => {
  keywordLib[keyword] = require(`./keywords/${keyword}`);
});

let currentState = initialState;

module.exports = {

  store: store,
  content: content,

  next(message, id) {
    this.id = id;
    this.message = message;
    this.currentState = store.getState(this.id);

    this.nextMessage();
    this.handleDialogFork();
    this.handleFlags();
    this.handleKeywords();
    store.appendState(this.currentState, this.id);
  },

  nextMessage() {
    this.currentState = content[this.currentState].nextMessage;
  },

  handleDialogFork() {
    if (typeof this.currentState === "object") {
      if (this.currentState[this.message]) {
        this.currentState = this.currentState[this.message];
      } else if (this.currentState["*"]) {
        this.currentState = this.currentState["*"];
      } else {
        store.addFlag(this.id, "unknown-input");
      }
    }
  },

  handleFlags() {
    const flags = store.getFlags(this.id);
    if (flags.length > 0) {
      const flag = flags[flags.length - 1];
      const flagFunc = flagLib[flag].bind(this);
      flagFunc();
    }
  },

  handleKeywords() {
    if (keywordLib[this.message]) {
      const keywordFunc = keywordLib[this.message].bind(this);
      keywordFunc();
    }
  },

  get(fbID) {
    currentState = store.getState(fbID);

    return content[currentState];
  }

};

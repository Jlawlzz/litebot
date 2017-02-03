'use strict'

const store = require('../store');
const content = require('../../content');
const config = require('config');
const initialState = "STEP:1_GET_STARTED_PAYLOAD";
const handleUnknownInput = require("./flags/unknown-input");

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
    if (typeof this.currentState === 'object') {
      if (this.currentState[this.message]) {
        this.currentState = this.currentState[this.message];
      } else if (this.currentState['*']) {
        this.currentState = this.currentState['*'];
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
    };
  },

  handleKeywords() {
    if (keywordLib[this.message]) {
      const keywordFunc = keywordLib[this.message].bind(this);
      keywordFunc();
    }
  },

    // if (currentState === 'STEP:FINAL_INFO'){
    //   Store.archiveData(fbID);
    // }
    //
    // if (typeof message === "string"){
    //   if (message.toLowerCase() === "stop" ||
    //       message.toLowerCase() === "exit" ||
    //       message.toLowerCase() === "goodbye" ||
    //       message.toLowerCase() === "quit"){
    //         currentState = "STEP:QUIT_CONVO_PRE";
    //   }
    // }
    //
    // if (content[currentState]["referenceStore"]){
    //   message = Store.users[fbID]['data'][content[currentState]["referenceStore"]];
    // }
    //
    // currentState = content[currentState].nextMessage
    //
    // if (typeof currentState === 'object' &&
    //     (currentState[message.toLowerCase()] ||
    //     currentState[message])){
    //     currentState = (Number(message) === NaN) ? currentState[message.toLowerCase()] : currentState[message];
    //
    // } else if (typeof currentState === 'object' && currentState["*"]){
    //   currentState = currentState["*"];
    //
    // } else if (typeof currentState === 'object' &&
    //            currentState[message.toLowerCase()] === undefined) {
    //   currentState = "STEP:UNKNOWN_INPUT";
    //
    // } else if (Store.getFlags(fbID).length > 0){
    //   currentState = "STEP:UNKNOWN_INPUT";
    //   Store.flushFlags(fbID);
    //
    // } else if (currentState === "STEP:LAST_STEP"){
    //   Store.users[fbID]['state'].forEach(function(state){
    //     if (content[state]["anchor"] && content[state]["anchor"] === true){
    //       currentState = state;
    //     }
    //   });
    // }
    //
    // if (message === "retry"){
    //   let newCurrentState;
    //   Store.users[fbID]['state'].forEach(function(state){
    //     if (content[state]["anchor"] && content[state]["anchor"] === true){
    //       currentState = newCurrentState;
    //       newCurrentState = state;
    //     }
    //   });
    // }
    // Store.appendState(currentState, fbID);
  // },

  reRoute(message, fbID){

    // if (typeof message === "string"){
    //
    //   if (message === "Search Again"){
    //     currentState = "STEP:QUE_LOCATION_RETRY";
    //     Store.appendState(currentState, fbID);
    //
    //   } else if (message === "resume" && currentState !== "NAV_MENU"){
    //     let lastStateIndex = Store.users[fbID]['state'].length;
    //     currentState = Store.users['state'][lastStateIndex - 2];
    //     Store.appendState(currentState, fbID);
    //
    //   } else if (message.toLowerCase() === "restart"){
    //     currentState = Store.resetState(fbID);
    //     Store.appendState(currentState, fbID);
    //
    //   } else if (message.toLowerCase() === "new report"){
    //     currentState = Store.resetState(fbID);
    //     Store.appendState(currentState, fbID);
    //
    //   }
    //
    // }
  },

  get(fbID) {
    currentState = store.getState(fbID);

    console.log('GET STATE: ', currentState)
    return content[currentState];
  }

};

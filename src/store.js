"use strict";

class StoreInterface {

  constructor(data) {
    this.users = {};
  }

  setUser(fbID) {
    if (!this.users[fbID]){
      this.users[fbID] = { 'data':     {},
                           'flags':    [],
                           'state':    ['STEP:1_GET_STARTED_PAYLOAD'],
                           'archived': {},
                           'active':   null
                          }
    }
  }

  getActiveSurveyId(fbID) {
    return this.users[fbID]["currentSurveyID"];
  }

  saveActiveSurveyId(fbID, surveyID) {
    this.users[fbID]["currentSurveyID"] = surveyID;
  }

  getData(fbID) {
    return this.users[fbID]['data'];
  }

  getUserID(fbID) {
    return this.users[fbID]['dbID'];
  }

  getDatapoint(key, fbID) {
    return this.users[fbID]['data'][key];
  }

  saveDatapoint(key, value, fbID) {
    return this.users[fbID]['data'][key] = value;
  }

  appendState(frame, fbID) {
    let state = this.users[fbID]['state']
    state.push(frame);
  }

  getState(fbID) {
    let state = this.users[fbID]['state'];
    return state[state.length - 1];
  }

  resetState(fbID) {
    this.users[fbID]['state'] = ["STEP:INTRO"];
    return this.users[fbID]['state'][0];
  }

  saveData(fbID) {
    this.users[fbID]['active'] = this.data;
  }

  archiveData(fbID) {
    let d = new Date();
    if (!this.users[fbID]['archived']){
      this.users[fbID]['archived'] = {};
    }
    this.users[fbID]['archived'][d.getTime()] = this.users[fbID]['data'];
    this.users[fbID]['data'] = {};
  }

  addFlag(fbID, flag) {
    this.users[fbID]['flags'].push(flag)
  }

  getFlags(fbID) {
    return this.users[fbID]['flags'];
  }

  flushFlags(fbID) {
    this.users[fbID]['flags'] = [];
  }
};

const Store = new StoreInterface;

module.exports = Store;

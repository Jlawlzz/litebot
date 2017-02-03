module.exports = function() {
  if (this.currentState === "STEP:LAST_STEP") {
    this.store.users[this.id]['state'].forEach(state => {
      if (this.content[state]["anchor"] && this.content[state]["anchor"] === true){
        this.currentState = state;
      }
    });
    this.store.flushFlags(this.id);
  } else {
    this.currentState = "STEP:UNKNOWN_INPUT";

  };
}

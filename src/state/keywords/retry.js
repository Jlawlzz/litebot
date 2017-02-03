module.exports = function() {
  let newCurrentState;
  this.store.users[this.id]["state"].forEach(state => {
    if (this.content[state]["anchor"] && this.content[state]["anchor"] === true) {
      this.currentState = newCurrentState;
      newCurrentState = state;
    }
  });
};

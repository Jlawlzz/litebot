module.exports = function() {
  this.currentState = this.store.resetState(this.id);
  this.store.appendState(this.currentState, this.id);
};

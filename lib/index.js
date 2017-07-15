const Touchbar = require('./touchbar');

const touchbarIndex = {

  deactivate() {
    this.touchbar.desactivate();
  },

  activate() {
    if (this.touchbar) {
      this.touchbar.activate();
    } else {
      this.touchbar = new Touchbar();
    }
  },

  dispose() {
  },

  provideTouchBar() {
    return this.touchbar;
  }
};

module.exports = touchbarIndex;

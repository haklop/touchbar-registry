const remote = require('remote');
const {TouchBar} = remote;

class TouchbarRegistry {

  constructor() {
    this.items = [];
    this.touchBar = new TouchBar([]);
    this._setTouchBar();
  }

  desactivate() {
    if (typeof remote.getCurrentWindow().setTouchBar === 'function') {
      remote.getCurrentWindow().setTouchBar(null);
    }
  }

  activate() {
    this._setTouchBar();
  }

  dispose() {
  }

  addItem(item, priority = 100) {
    this.items.push({item, priority});
    this.items.sort((a, b) => {
      return a.priority - b.priority;
    });

    this.touchBar = new TouchBar(this.items.map(i => i.item));
    this._setTouchBar();
  }

  getItems() {
    return this.items.map(i => i.item);
  }

  setEscapeItem(item) {
    this.touchBar.escapeItem = item;
  }

  getEscapeItem() {
    return this.touchBar.escapeItem;
  }

  _setTouchBar() {
    if (typeof remote.getCurrentWindow().setTouchBar === 'function') {
      remote.getCurrentWindow().setTouchBar(this.touchBar);
    }
  }
}

module.exports = TouchbarRegistry;

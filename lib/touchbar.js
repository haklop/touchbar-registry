const remote = require('remote');
const uuid = require('uuid');
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

  addItem(item, priority = 100, id = uuid.v4()) {
    this.items = this.items.filter(i => {
      return i.id !== id;
    });

    this.items.push({item, priority, id});
    this.items.sort((a, b) => {
      return a.priority - b.priority;
    });

    this._setTouchBar();
    return id;
  }

  getItem(id) {
    let item;
    this.items.forEach(i => {
      if (i.id === id) {
        item = i.item;
      }
    });
    return item;
  }

  removeItem(id) {
    this.items = this.items.filter(i => {
      return i.id !== id;
    });

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

  refresh() {
    this._setTouchBar();
  }

  _setTouchBar() {
    if (typeof remote.getCurrentWindow().setTouchBar === 'function') {
      this.touchBar = new TouchBar(this.items.map(i => i.item));
      remote.getCurrentWindow().setTouchBar(this.touchBar);
    }
  }
}

module.exports = TouchbarRegistry;

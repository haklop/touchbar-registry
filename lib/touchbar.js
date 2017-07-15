const remote = require('remote');
const {TouchBar} = remote;

class TouchbarRegistry {

  constructor() {
    this.items = [];
    this.touchBar = new TouchBar(this.items);
    remote.getCurrentWindow().setTouchBar(this.touchBar);
  }

  desactivate() {
    remote.getCurrentWindow().setTouchBar(null);
  }

  activate() {
    remote.getCurrentWindow().setTouchBar(this.touchBar);
  }

  dispose() {
  }

  addItem(item) {
    this.items.push(item);
    this.touchBar = new TouchBar(this.items);
    remote.getCurrentWindow().setTouchBar(this.touchBar);
  }

  getItems() {
    return this.items;
  }

  setEscapeItem(item) {
    this.touchBar.escapeItem = item;
  }

  getEscapeItem() {
    return this.touchBar.escapeItem;
  }
}

module.exports = TouchbarRegistry;

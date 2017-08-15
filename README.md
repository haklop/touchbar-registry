# touchbar registry

An abstraction of the touchbar APIs provided by Electron.

## API

This package provides a service that you can use in other Atom packages. To use it, include `touchbar-registry` in the `consumedServices` section of your `package.json`:

```json
{
  "name": "my-package",
  "touchbar-registry": {
    "versions": {
      "0.1.0": "consumeTouchBar"
    }
  }
}
```

Then, in your package's main module, call methods on the service:

```javascript
deactivate() {...},
activate() {...},
consumeTouchBar(touchbarRegistry) {
  touchbarRegistry.addItem(
    new TouchBarButton({
      label: 'Hello world',
      backgroundColor: '#313440',
      click: () => console.log('Hey!')
    })
  );
}
```

The `touchbar-registry` API has four methods:

  * `addItem(item, priority)` - Add an item on the touchBar. Lower priority item are placed further to the left. Item can be any [items available on Electron](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md). Return the id of the item.
  * `setEscapeItem(item )` - Replace the escape button on the touch bar when set. Settings to null restore the default escape button. Item can be any [escapeItem](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) available on Electron.
  * `getItems()` - Retrieve all of the items on the touch bar.
  * `getItem(id)` - Retrieve the item with the given id.
  * `removeItem(id)` - Remove the item with the given id.
  * `getRightTiles()` - Retrieve the item of the escape button.
  * `refresh()` - Force the touch bar to refresh. Usefull to close a popover button :

```javascript
new TouchBarPopover({
  label: 'a popover',
  items: [
    new TouchBarButton({
      label: 'Button to display in the popover',
      click: () => {
        // do some stuff
        console.log('Hey');

        touchbarRegistry.refresh(); // this is closing the popover
      }
    })
  ]
});
```

## License

This Project is licensed under the terms of MIT License, check the license file for more info.

Inspired by https://github.com/atom/status-bar

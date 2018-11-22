export default class Combokeys {
  constructor(elem) {
    const combokeys = this;

    const handlers = [];
    const stopCallback = () => {};
    elem.addEventListener('keydown', this.eventHandler.bind(this));

    combokeys.handlers = handlers;
    combokeys.stopCallback = stopCallback;
  }

  eventHandler(e) {
    const handlerIdx = this.findHandler(e.key, e.shiftKey, e.ctrlKey, e.metaKey);
    if (~handlerIdx) {
      this.handlers[handlerIdx].callback(e);
      e.preventDefault();
    }
  }

  findHandler(key, shiftKey, ctrlKey, metaKey) {
    let match = -1;
    this.handlers.forEach((keyconfig, idx) => {
      let currentKeys = [key.toLowerCase()];
      if (shiftKey) currentKeys.push('shift');
      if (this.hasPlatformModifier(ctrlKey, metaKey)) currentKeys.push('mod');
      let keys = keyconfig.keycombo.split('+');
      if (this.matchKeys(currentKeys, keys)) {
        match = idx;
      }
    });
    return match;
  }

  hasPlatformModifier(ctrlKey, metaKey) {
    let hasCmdKey = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    return hasCmdKey ? metaKey : ctrlKey;
  }

  matchKeys(keys1, keys2) {
    return keys1.sort().join(',') === keys2.sort().join(',')
  }

  bind(keycombo, callback) {
    this.handlers.push({keycombo, callback});
  }

  detach() {
    this.elem.removeEventListener('keydown', this.eventHandler);
  }

}


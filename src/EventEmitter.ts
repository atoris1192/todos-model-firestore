
export class EventEmitter {
  private _listeners: any;
  constructor() {
    this._listeners = new Map();
  }
  // type: event, listener: function
  addEventListener(type, listener) {
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set());
    }
    const listenerSet = this._listeners.get(type);
    listenerSet.add(listener);
    console.log(listenerSet);

  }

  emit (type) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(listener => {
      listener.call(this);
    })
  }

  removeEventListener(type, listener) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(ownListener => {
      if (ownListener === liseener) {
        listenerSet.delete(listener);
      }
    })
  }

}

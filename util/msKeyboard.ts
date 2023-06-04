const keyMap = {
  down: false,
  up: false,
  right: false,
  left: false,
}

type MapKey = keyof typeof keyMap;

class MsKeyboard {

  static init() {
    MsKeyboard.addEventListeners();
  }

  static isKeyPressed(key: MapKey): Boolean {
    return keyMap[key];
  };
  // static onkeypress(k: any) { };
  // static onkeyrelease(k: any) { };
  // static isKeyPressed(k: any) { };
  // static isExitKeyPressed() { };

  private static addEventListeners() {
    // buttons
    const controlButtons = document.querySelectorAll('.controls button');

    for (const ctrlBtn of controlButtons) {
      ctrlBtn.addEventListener('mousedown', this.buttonPressEventHandler.bind(this));
      ctrlBtn.addEventListener('mouseup', this.buttonReleaseEventHandler.bind(this));
      ctrlBtn.addEventListener('mouseleave', this.buttonReleaseEventHandler.bind(this));
      ctrlBtn.addEventListener('touchstart', this.buttonPressEventHandler.bind(this));
      ctrlBtn.addEventListener('touchend', this.buttonReleaseEventHandler.bind(this));
    }

    // keyboard
    const body = document.body;

    body.addEventListener('keydown', this.keyPressEventHandler.bind(this));
    body.addEventListener('keyup', this.keyReleaseEventHandler.bind(this));

  }

  private static mapKeyboardKeyToArrow(ev: KeyboardEvent): MapKey {
    const keyboardKeys = {
      'ArrowDown': 'down',
      'ArrowUp': 'up',
      'ArrowRight': 'right',
      'ArrowLeft': 'left',
      's': 'down',
      'w': 'up',
      'd': 'right',
      'a': 'left',
    }
    return keyboardKeys[ev.key];
  }

  private static pressKey(arrow: string) {
    if (keyMap[arrow] === undefined) {
      return;
    }
    keyMap[arrow] = true;
  }

  private static releaseKey(arrow: string) {
    if (keyMap[arrow] === undefined) {
      return;
    }
    keyMap[arrow] = false;
  }

  private static keyPressEventHandler(ev: KeyboardEvent) {
    ev.preventDefault();
    const arrow = this.mapKeyboardKeyToArrow(ev)
    this.pressKey(arrow);
  }

  private static keyReleaseEventHandler(ev: KeyboardEvent) {
    ev.preventDefault();
    const arrow = this.mapKeyboardKeyToArrow(ev)
    this.releaseKey(arrow);
  }

  private static buttonPressEventHandler(ev: Event) {
    const arrow = (ev.target as HTMLButtonElement).name;
    this.pressKey(arrow);
  }

  private static buttonReleaseEventHandler(ev: Event) {
    const arrow = (ev.target as HTMLButtonElement).name;
    this.releaseKey(arrow);
  }
}

export default MsKeyboard;

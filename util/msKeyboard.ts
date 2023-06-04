
class MsKeyboard {

  static keyMap = {
    down: false,
    up: false,
    right: false,
    left: false,
  }

  static init() {
    MsKeyboard.addEventListeners();
  }

  // static onkeypress(k: any) { };
  // static onkeyrelease(k: any) { };
  // static isKeyPressed(k: any) { };
  // static isExitKeyPressed() { };

  private static addEventListeners() {
    const controlButtons = document.querySelectorAll('.controls button');

    for (const ctrlBtn of controlButtons) {
      ctrlBtn.addEventListener('mousedown', (ev) => this.btnHandler(ev));
      ctrlBtn.addEventListener('mouseup', (ev) => this.btnHandler(ev));
      ctrlBtn.addEventListener('touchstart', (ev) => this.btnHandler(ev));
      ctrlBtn.addEventListener('touchend', (ev) => this.btnHandler(ev));
    }
  }

  private static btnHandler(ev: Event) {
    const btnName = (ev.target as HTMLButtonElement).name;

    const arrow = btnName;
    const type = ev.type;

    if (this.keyMap[arrow] === undefined) {
      return;
    }

    if (type === 'mousedown' || type === 'touchstart') {
      this.keyMap[arrow] = true;
    } else if (type === 'mouseup' || type === 'touchend') {
      this.keyMap[arrow] = false;
    }
  }

  static isKeyPressed(key: keyof typeof MsKeyboard.keyMap): Boolean {
    return this.keyMap[key];
  };
}

export default MsKeyboard;

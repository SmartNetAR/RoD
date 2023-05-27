import Entity from '../entity';

class ControlsSystem {
  controlButtons: NodeListOf<HTMLElement>;
  controlRight: HTMLElement;
  controlUp: HTMLElement;
  controlDown: HTMLElement;

  constructor(private entities: Entity[], private impulse: number) {
    this.addEventListeners();
  }

  addEventListeners() {
    this.controlButtons = document.querySelectorAll('.controls button');
    this.controlRight = document.getElementById('right');
    this.controlUp = document.getElementById('up');
    this.controlDown = document.getElementById('down');

    for (const ctrlBtn of this.controlButtons) {
      ctrlBtn.addEventListener('mousedown', (ev) => this.btnHandler(ev));
      ctrlBtn.addEventListener('mouseup', (ev) => this.btnHandler(ev));
      ctrlBtn.addEventListener('touchstart', (ev) => this.btnHandler(ev));
      ctrlBtn.addEventListener('touchend', (ev) => this.btnHandler(ev));
    }
  }

  move(entity: Entity, arrow: string, type: string) {
    function resetX() {
      entity.physics.vel = {...entity.physics.vel, x: 0 };
    }
    function resetY() {
      entity.physics.vel = {...entity.physics.vel, y: 0 };
    }

    const arrows = {
      left: () => {
        resetX();
        if (type === 'mousedown' || type === 'touchstart') {
          entity.physics.vel.x -= this.impulse;
        }
      },
      right: () => {
        resetX();
        if (type === 'mousedown' || type === 'touchstart') {
          entity.physics.vel.x += this.impulse;
        }
      },
      up: () => {
        resetY();
        if (type === 'mousedown' || type === 'touchstart') {
          entity.physics.vel.y -= this.impulse;
        }
      },
      down: () => {
        resetY();
        if (type === 'mousedown' || type === 'touchstart') {
          entity.physics.vel.y += this.impulse;
        }
      },
    };

    arrows[arrow] && arrows[arrow]();
  }

  btnHandler(ev: Event) {
    const btnName = (ev.target as HTMLButtonElement).name;
    for (const entity of this.entities) {
      if (entity.controlled) this.move(entity, btnName, ev.type);
    }
  }
  update(entity: Entity) { }
}

export default ControlsSystem;

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
    const arrows = {
      left: () => {
        if (type === 'mousedown' || type === 'touchstart') {
          entity.physics.vel.x = -this.impulse;
        } else if (type === 'mouseup' || type === 'touchend') {
          entity.physics.vel.x = 0;
        }
      },
      right: () => {
        if (type === 'mousedown' || type === 'touchstart') {
          entity.physics.vel.x = this.impulse;
        } else if (type === 'mouseup' || type === 'touchend') {
          entity.physics.vel.x = 0;
        }
      },
      up: () => {
        if (type === 'mousedown' || type === 'touchstart') {
          entity.physics.vel.y = -this.impulse;
        } else if (type === 'mouseup' || type === 'touchend') {
          entity.physics.vel.y = 0;
        }
      },
      down: () => {
        if (type === 'mousedown' || type === 'touchstart') {
          entity.physics.vel.y = this.impulse;
        } else if (type === 'mouseup' || type === 'touchend') {
          entity.physics.vel.y = 0;
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
  update(entity: Entity) {}
}

export default ControlsSystem;

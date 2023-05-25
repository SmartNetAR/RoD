import Entity from '../entity';
import Vec2f from '../vec';

export interface Behaviour {
  run(en: Entity): void;
}

export class BehaviourBounce implements Behaviour {
  constructor(private maxPos: Vec2f) {}

  run(e: Entity) {
    if (e.physics) {
      const phy = e.physics;

      if (phy.pos.x >= this.maxPos.x - 25) {
        phy.vel.x *= -1;
      } else if (phy.pos.x <= 0) {
        phy.vel.x *= -1;
      }

      if (phy.pos.y >= this.maxPos.y - 20) {
        phy.vel.y *= -1;
      } else if (phy.pos.y <= 0) {
        phy.vel.y *= -1;
      }
    }
  }
}

export class BehaviourChangeVY implements Behaviour {
  counter: number;
  constructor(private initialCounter = 40) {
    this.counter = initialCounter;
  }

  run(e: Entity) {
    if (e.physics) {
      const phy = e.physics;

      if (this.counter == 0) {
        phy.vel.y = -phy.vel.y;
        this.counter = this.initialCounter;
      } else {
        --this.counter;
      }
    }
  }
}

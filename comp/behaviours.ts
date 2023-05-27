import Entity from '../entity';
import LevelManager from '../man/levelManager';
import Vec2f from '../vec';

export interface Behaviour {
  run(en: Entity, levMan: LevelManager): void;
}

export class BehaviourBounce implements Behaviour {
  constructor(private maxPos: Vec2f) {}

  run(e: Entity, levMan: LevelManager) {
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
    this.counter = this.initialCounter;
  }

  run(e: Entity, levMan: LevelManager) {
    if (e.physics) {
      const phy = e.physics;

      if (this.counter === 0) {
        phy.vel.y = -phy.vel.y;
        this.counter = this.initialCounter;
      } else {
        --this.counter;
      }
    }
  }
}

export class BehaviourShotFrequently implements Behaviour {
  counter: number;
  constructor(private initialCounter = 40) {
    this.counter = this.initialCounter;
  }

  run(e: Entity, levMan: LevelManager) {
    if (e.physics) {
      const phy = e.physics;

      if (this.counter === 0) {
        levMan.createShot(phy.pos, {x: 10, y: 0})
        this.counter = this.initialCounter;
      } else {
        --this.counter;
      }
    }
  }
}

export class BehaviourAutodistroy implements Behaviour {
  counter: number;
  alive: boolean;
  constructor(counter: number) {
    this.counter = counter;
  }

  run(e: Entity, levMan: LevelManager) {
    if (e.physics) {
      if (this.counter === 0) {
        e.alive = false;
      } else {
        --this.counter;
      }
    }
  }
}

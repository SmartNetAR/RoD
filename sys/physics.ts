import Entity from '../entity';

class PhysicsSystem {
  constructor() { }

  update(entities: Entity[]) {
    for (const entity of entities) {
      if (entity.physics) {
        entity.physics.pos.x += entity.physics.vel.x;
        entity.physics.pos.y += entity.physics.vel.y;
      }
    }
  }
}

export default PhysicsSystem;

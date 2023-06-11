import Entity from '../entity';
import EntityManager from '../man/entityManager';

class PhysicsSystem {
  constructor(private entityMan: EntityManager) { }

  private updateOneEntity(entity: Entity) {
    if (entity.physics) {
      entity.physics.pos.x += entity.physics.vel.x;
      entity.physics.pos.y += entity.physics.vel.y;
    }
  }

  update() {
    this.entityMan.forAll(this.updateOneEntity);
  }
}

export default PhysicsSystem;

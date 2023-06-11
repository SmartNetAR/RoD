import Entity from '../entity';
import EntityManager from '../man/entityManager';

class PreRenderSystem {
  constructor(private entityMan: EntityManager) { }

  updateOneEntity(entity: Entity) {
    if (entity.physics && entity.render) {
      const phy = entity.physics.pos;
      const ren = entity.render.pos;

      ren.x = Math.round(phy.x);
      ren.y = Math.round(phy.y);
    }
  }

  update() {
    this.entityMan.forAll(this.updateOneEntity.bind(this));
  }
}

export default PreRenderSystem;

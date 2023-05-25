import Entity from '../entity';

class PreRenderSystem {
  update(entities: Entity[]) {
    for (const entity of entities) {
      if (entity.physics && entity.render) {
        const phy = entity.physics.pos;
        const ren = entity.render.pos;

        ren.x = Math.round(phy.x);
        ren.y = Math.round(phy.y);
      }
    }
  }
}

export default PreRenderSystem;

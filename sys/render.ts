import Entity from '../entity';
import Display from '../display';

class RenderSystem {
  constructor(private display: Display) {}

  update(entities: Entity[]) {
    this.display.clean();
    for (const entity of entities) {
      if (entity.render) {
        this.display.draw(entity.render.rec, entity.render.pos);
      }
    }
  }
}

export default RenderSystem;

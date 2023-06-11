import EntityManager from '../man/entityManager';
import Display from '../util/display';

class RenderSystem {
  constructor(private entityMan: EntityManager, private display: Display) {}

  update() {
    this.display.clean();
    this.entityMan.forAll(entity => {
      if (entity.render) {
        this.display.draw(entity.render.rec, entity.render.pos);
      }
    });
  }
}

export default RenderSystem;

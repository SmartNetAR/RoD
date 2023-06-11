import Entity from '../entity';
import EntityManager from '../man/entityManager';
import MsKeyboard from '../util/msKeyboard';

class InputSystem {
  static msKeyboard = MsKeyboard;

  constructor(private entityMan: EntityManager, private impulse: number) { }

  updateOneEntity(entity: Entity) {
      const inp = entity.inpCmp;
      const phy = entity.physics;
      if (inp && phy) {
        phy.vel.y = 0;
        phy.vel.x = 0;
        if (InputSystem.msKeyboard.isKeyPressed("down")) {
          phy.vel.y += this.impulse;
        }
        if (InputSystem.msKeyboard.isKeyPressed("up")) {
          phy.vel.y -= this.impulse;
        }
        if (InputSystem.msKeyboard.isKeyPressed("right")) {
          phy.vel.x += this.impulse;
        }
        if (InputSystem.msKeyboard.isKeyPressed("left")) {
          phy.vel.x -= this.impulse;
        }
      }
  }

  update() {
    this.entityMan.forAll(this.updateOneEntity.bind(this));
  }
}

export default InputSystem;

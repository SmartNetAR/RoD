import Entity from '../entity';
import MsKeyboard from '../util/msKeyboard';

class InputSystem {
  static msKeyboard = MsKeyboard;

  constructor(private impulse: number) { }

  update(entities: Entity[]) {
    for (const entity of entities) {
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
  }
}

export default InputSystem;

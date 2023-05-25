import SpriteSheet from '../engine/spriteSheet';
import Sprite from '../sprite';

export enum SpriteType {
  Enemy,
  Player,
  Shot,
}

class SpriteManager {
  spriteSheet = new SpriteSheet();

  create(spType: SpriteType): Sprite {
    let sp: Sprite;

    switch (spType) {
      case SpriteType.Player:
        sp = this.spriteSheet.newSpriteByType('👾');
        break;
      case SpriteType.Enemy:
        sp = this.spriteSheet.newSpriteByType('👾');
        break;
      case SpriteType.Shot:
        sp = this.spriteSheet.newSpriteByType('🔴');
        break;
    }

    return sp;
  }
}

export default SpriteManager;

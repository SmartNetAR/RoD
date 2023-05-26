import SpriteSheet from '../util/spriteSheet';
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
    sp = this.spriteSheet.newSpriteByType(SpriteType.Player);

    // switch (spType) {
    //   case SpriteType.Player:
    //     sp = this.spriteSheet.newSpriteByType(SpriteType.Player);
    //     break;
    //   case SpriteType.Enemy:
    //     sp = this.spriteSheet.newSpriteByType('👾');
    //     break;
    //   case SpriteType.Shot:
    //     sp = this.spriteSheet.newSpriteByType('🔴');
    //     break;
    // }

    return sp;
  }
}

export default SpriteManager;

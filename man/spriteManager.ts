import Rect2D from '../util/rect2d';

export const SpriteTypeEnum = {
  Enemy_Right: Symbol("Enemy_Right"),
  Player_Right: Symbol("Player_Right"),
  Shot_Small: Symbol("Shot_Small"),
}

export type SpriteType = typeof SpriteTypeEnum[keyof typeof SpriteTypeEnum];

class SpriteManager {

  createSprite(spt: SpriteType): Rect2D {
    let rec: Rect2D;
    switch (spt) {
      case SpriteTypeEnum.Player_Right: rec = new Rect2D(0, 41, 38, 38); break;
      case SpriteTypeEnum.Enemy_Right: rec = new Rect2D(198, 41, 33, 38); break;
      case SpriteTypeEnum.Shot_Small: rec = new Rect2D(224, 20, 10, 10); break;
    }
    return rec;
  }
}

export default SpriteManager;

import Sprite, { spriteType } from '../sprite';

class SpriteSheet {
  newSpriteByType(type) {
    const sprite = new Sprite();

    // if (typeof type === "string") {
    //   sprite.type = spriteType.string;
    //   sprite.style = type;
    // } else {
    //   sprite.type = spriteType.string;
    //   sprite.style = '🛰️';
    // }

    // const spriteRect1 = new Sprite();
    // spriteRect1.type = spriteType.rect;
    // spriteRect1.style = `rgba(255, 165, 0, 0.0)`;
    return sprite;
  }
}

export default SpriteSheet;

import Sprite from '../sprite';
import Vec2f from '../vec';

class RenderComponent {
  // sprite: Sprite;
  pos = new Vec2f();
  vel = new Vec2f();

  constructor(public sprite: Sprite) {}
}

export default RenderComponent;

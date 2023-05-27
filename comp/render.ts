import Rect2D from '../rect2d';
import Vec2f from '../vec';

class RenderComponent {
  rec: Rect2D;
  pos = new Vec2f();
  vel = new Vec2f();

  constructor(rec: Rect2D) {
    this.rec = rec;
  }
}

export default RenderComponent;

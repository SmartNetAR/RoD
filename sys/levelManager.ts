import BehaviourComponent from '../comp/behaviour';
import PhysicsComponent from '../comp/physics';
import RenderComponent from '../comp/render';
import { BehaviourBounce, BehaviourChangeVY } from '../comp/behaviours';
import SpriteSheet from '../engine/spriteSheet';
import EntityManager from './entityManager';
import Vec2f from '../vec';
import SpriteManager, { SpriteType } from './spriteManager';

class LevelManager {
  private entityMan = new EntityManager();
  private spriteManager = new SpriteManager();

  constructor(private displaySize: Vec2f) {}

  getEntityMan() {
    return this.entityMan;
  }

  public initLevel1() {
    const e1 = this.entityMan.create();
    e1.physics = new PhysicsComponent({ x: 300, y: 300 }, { x: 0, y: 0 });
    e1.render = new RenderComponent(
      this.spriteManager.create(SpriteType.Player)
    );
    e1.behCmp = new BehaviourComponent();
    e1.behCmp.beheavor = new BehaviourBounce(this.displaySize);
    e1.controlled = true;

    const e2 = this.entityMan.create();
    e2.physics = new PhysicsComponent({ x: 1, y: 100 }, { x: 0.3, y: -0.3 });
    e2.render = new RenderComponent(
      this.spriteManager.create(SpriteType.Enemy)
    );
    e2.behCmp = new BehaviourComponent();
    e2.behCmp.beheavor = new BehaviourBounce(this.displaySize);

    const e3 = this.entityMan.create();
    e3.physics = new PhysicsComponent({ x: 50, y: 100 }, { x: -3, y: 3 });
    e3.render = new RenderComponent(
      this.spriteManager.create(SpriteType.Enemy)
    );
    e3.behCmp = new BehaviourComponent();
    e3.behCmp.beheavor = new BehaviourBounce(this.displaySize);

    const e4 = this.entityMan.create();
    e4.physics = new PhysicsComponent({ x: 20, y: 300 }, { x: 3, y: 3 });
    e4.render = new RenderComponent(
      this.spriteManager.create(SpriteType.Enemy)
    );
    e4.behCmp = new BehaviourComponent();
    e4.behCmp.beheavor = new BehaviourChangeVY();

    const e5 = this.entityMan.create();
    e5.physics = new PhysicsComponent({ x: 20, y: 50 }, { x: 1, y: 5 });
    e5.render = new RenderComponent(this.spriteManager.create(SpriteType.Shot));
    e5.behCmp = new BehaviourComponent();
    e5.behCmp.beheavor = new BehaviourChangeVY(50);
  }
}

export default LevelManager;

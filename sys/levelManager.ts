import BehaviourComponent from '../comp/behaviour';
import PhysicsComponent from '../comp/physics';
import RenderComponent from '../comp/render';
import { Behaviour, BehaviourAutodistroy, BehaviourBounce, BehaviourChangeVY, BehaviourShotFrequently } from '../comp/behaviours';
import EntityManager from './entityManager';
import Vec2f from '../vec';
import SpriteManager, { SpriteType } from './spriteManager';

interface EntityToCreate {
  pos: { x: number; y: number; };
  vel: { x: number; y: number; };
  spriteType: SpriteType;
  behaviour?: Behaviour;
  controlled?: boolean;
}

class LevelManager {
  private entityMan = new EntityManager();
  private spriteManager = new SpriteManager();

  constructor(private displaySize: Vec2f) { }

  getEntityMan() {
    return this.entityMan;
  }

  createShot(pos: Vec2f, vel: Vec2f) {
    this.createEntity({
      pos,
      vel,
      spriteType: SpriteType.Shot,
      behaviour: new BehaviourAutodistroy(30),
    })
  }

  public initLevel1() {
    const entitiesToCreate: EntityToCreate[] = [
      {
        pos: { x: 300, y: 300 }, vel: { x: 0, y: 0 },
        spriteType: SpriteType.Player,
        behaviour: new BehaviourBounce(this.displaySize),
        controlled: true
      },
      {
        pos: { x: 1, y: 100 }, vel: { x: 0.3, y: -0.3 },
        spriteType: SpriteType.Enemy,
        behaviour: new BehaviourBounce(this.displaySize),
      },
      {
        pos: { x: 50, y: 100 }, vel: { x: -3, y: 3 },
        spriteType: SpriteType.Enemy,
        behaviour: new BehaviourBounce(this.displaySize),
      },
      {
        pos: { x: 20, y: 300 }, vel: { x: 3, y: 3 },
        spriteType: SpriteType.Enemy,
        behaviour: new BehaviourChangeVY(),
      },
      // {
      //   pos: { x: 20, y: 50 }, vel: { x: 1, y: 5 },
      //   spriteType: SpriteType.Shot,
      //   behaviour: new BehaviourChangeVY(50),
      // }
      {
        pos: { x: 5, y: 200 }, vel: { x: 0, y: 0 },
        spriteType: SpriteType.Enemy,
        behaviour: new BehaviourShotFrequently(60),
      },
    ]

    for (const entity of entitiesToCreate) {
      this.createEntity(entity);
    }
  }

  private createEntity(entity: EntityToCreate) {
    const e = this.entityMan.create();
    e.physics = new PhysicsComponent({...entity.pos}, {...entity.vel});
    e.render = new RenderComponent(
      this.spriteManager.create(entity.spriteType)
    );
    e.behCmp = new BehaviourComponent();
    e.behCmp.beheavor = entity.behaviour;
    e.controlled = entity.controlled === true;
  }
}

export default LevelManager;

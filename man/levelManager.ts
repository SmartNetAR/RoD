import BehaviourComponent from '../comp/behaviour';
import PhysicsComponent from '../comp/physics';
import RenderComponent from '../comp/render';
import { Behaviour, BehaviourAutodistroy, BehaviourBounce, BehaviourChangeVY, BehaviourShotFrequently } from '../comp/behaviours';
import EntityManager from './entityManager';
import Vec2f from '../util/vec';
import SpriteManager, { SpriteType, SpriteTypeEnum } from './spriteManager';
import InputComponent from '../comp/input';

interface EntityToCreate {
  pos: { x: number; y: number; };
  vel: { x: number; y: number; };
  spriteType: SpriteType;
  behaviour?: Behaviour;
  controlled?: boolean;
}

class LevelManager {
  private entityMan = new EntityManager();
  private spriteMan = new SpriteManager();

  constructor(private displaySize: Vec2f) { }

  getEntityMan() {
    return this.entityMan;
  }

  createShot(pos: Vec2f, vel: Vec2f) {
    this.createEntity({
      pos,
      vel,
      spriteType: SpriteTypeEnum.Shot_Small,
      behaviour: new BehaviourAutodistroy(50),
    })
  }

  public initLevel1() {
    const entitiesToCreate: EntityToCreate[] = [
      {
        pos: { x: 300, y: 300 }, vel: { x: 0, y: 0 },
        spriteType: SpriteTypeEnum.Player_Right,
        behaviour: new BehaviourBounce(this.displaySize),
        controlled: true
      },
      {
        pos: { x: 1, y: 100 }, vel: { x: 0.3, y: -0.3 },
        spriteType: SpriteTypeEnum.Enemy_Right,
        behaviour: new BehaviourBounce(this.displaySize),
      },
      {
        pos: { x: 50, y: 100 }, vel: { x: -3, y: 3 },
        spriteType: SpriteTypeEnum.Enemy_Right,
        behaviour: new BehaviourBounce(this.displaySize),
      },
      {
        pos: { x: 400, y: 100 }, vel: { x: 0, y: 3 },
        spriteType: SpriteTypeEnum.Enemy_Right,
        behaviour: new BehaviourChangeVY(),
      },
      {
        pos: { x: 5, y: 200 }, vel: { x: 0, y: 0 },
        spriteType: SpriteTypeEnum.Enemy_Right,
        behaviour: new BehaviourShotFrequently(60),
      },
    ]

    for (const entity of entitiesToCreate) {
      this.createEntity(entity);
    }
  }

  private createEntity(entityConfig: EntityToCreate) {
    const e = this.entityMan.create();
    e.physics = new PhysicsComponent({...entityConfig.pos}, {...entityConfig.vel});
    e.render = new RenderComponent(
      this.spriteMan.createSprite(entityConfig.spriteType)
    );
    e.behCmp = new BehaviourComponent();
    e.behCmp.beheavor = entityConfig.behaviour;
    if (entityConfig.controlled)
      e.inpCmp = new InputComponent();
  }
}

export default LevelManager;

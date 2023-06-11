import Entity from '../entity';
import EntityManager from '../man/entityManager';
import LevelManager from '../man/levelManager';

class BehaviourSystem {
  constructor(private entityMan: EntityManager, private levMan: LevelManager) { }

  updateOneEntity(entity: Entity) {
    if (entity.behCmp?.beheavor) {
      entity.behCmp.beheavor.run(entity, this.levMan);
    }
  }

  update() {
    this.entityMan.forAll(this.updateOneEntity.bind(this));
  }
}

export default BehaviourSystem;

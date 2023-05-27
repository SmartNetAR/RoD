import Entity from '../entity';
import LevelManager from '../man/levelManager';

class BehaviourSystem {
  constructor(private levMan: LevelManager) {}

  update(entities: Entity[]) {
    for (const entity of entities) {
      if (entity.behCmp?.beheavor) {
        entity.behCmp.beheavor.run(entity, this.levMan);
      }
    }
  }
}

export default BehaviourSystem;

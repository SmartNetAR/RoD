import Entity from '../entity';

class BehaviourSystem {
  constructor() {}

  update(entities: Entity[]) {
    for (const entity of entities) {
      if (entity.behCmp.beheavor) {
        entity.behCmp.beheavor.run(entity);
      }
    }
  }
}

export default BehaviourSystem;

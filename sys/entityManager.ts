import Entity from '../entity';

class EntityManager {
  entities: Entity[];

  constructor() {
    this.entities = [];
  }

  create() {
    const entity = new Entity();
    this.entities.push(entity);

    return entity;
  }
}

export default EntityManager;

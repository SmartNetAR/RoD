import Entity from '../entity';

class EntityManager {
  #entities: Entity[] = [];
  #newEntities: Entity[] = [];

  create() {
    const entity = new Entity();
    this.#newEntities.push(entity);

    return entity;
  }

  get entities() {
    return this.#entities;
  }

  updated() {
    while (this.#newEntities.length > 0 ) {
      this.#entities.push(this.#newEntities.shift())
    }
  }
}

export default EntityManager;

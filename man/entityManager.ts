import Entity from '../entity';

class EntityManager {
  readonly #entities: Entity[] = [];
  readonly #newEntities: Entity[] = [];

  create() {
    const entity = new Entity();
    entity.alive = true;
    this.#newEntities.push(entity);

    return entity;
  }

  get entities() {
    return this.#entities;
  }

  updated() {
    this.incorporateNewEntities();
    this.destroyMarkedEntities();
  }

  private incorporateNewEntities() {
    while (this.#newEntities.length > 0) {
      this.#entities.push(this.#newEntities.shift());
    }
  }

  private destroyMarkedEntities() {
    for (let iPlus1 = this.#entities.length; iPlus1 > 0; iPlus1--) {
      const i = iPlus1 - 1;
      const e = this.#entities[i];
      if (!e.alive) {
        this.#entities.splice(i, 1);
      }
    }
  }
}

export default EntityManager;

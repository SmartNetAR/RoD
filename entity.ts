import BehaviourComponent from './comp/behaviour';
import PhysicsComponent from './comp/physics';
import RenderComponent from './comp/render';

class Entity {
  physics?: PhysicsComponent;
  render?: RenderComponent;
  behCmp?: BehaviourComponent;
  controlled: boolean;

  constructor() {}
}

export default Entity;

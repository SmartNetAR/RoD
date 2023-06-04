import BehaviourComponent from './comp/behaviour';
import InputComponent from './comp/input';
import PhysicsComponent from './comp/physics';
import RenderComponent from './comp/render';

class Entity {
  physics?: PhysicsComponent;
  render?: RenderComponent;
  behCmp?: BehaviourComponent;
  inpCmp?: InputComponent;
  alive: boolean;
}

export default Entity;

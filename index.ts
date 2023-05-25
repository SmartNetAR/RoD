// ROOM OF DOOM
// GameEngine ES

// Import stylesheets
import './style.css';
import Display from './display';
import Vec2f from './vec';

import PhysicsSystem from './sys/physics';
import RenderSystem from './sys/render';
import BehaviourSystem from './sys/behaviour';
import PreRenderSystem from './sys/prerender';
import EntityManager from './sys/entityManager';
import ControlsSystem from './sys/controller';
import LevelManager from './sys/levelManager';
const appDiv: HTMLElement = document.getElementById('app');

// let i = 0;
function main() {
  const game = {
    paused: false,
  };

  const pauseBtn: HTMLElement = document.getElementById('pause');
  pauseBtn.addEventListener('click', (ev) => {
    game.paused = !game.paused;
    if (!game.paused) {
      requestAnimationFrame(update);
    }
  });

  // const e1 = new Entity();
  // e1.physics = new PhysicsComponent({ x: 1, y: 20 }, { x: 3, y: 0 });
  // e1.render = new RenderComponent();

  const display = new Display('canvas', 640, 456);
  display.load();
  return;
  const displaySyze: Vec2f = { x: display.getWidth(), y: 456 };
  const preRenSys = new PreRenderSystem();
  const renSys = new RenderSystem(display);
  const phySys = new PhysicsSystem(displaySyze);
  const behSys = new BehaviourSystem();

  const levMan = new LevelManager(displaySyze);
  const entityMan = levMan.getEntityMan();
  const ctrlSys = new ControlsSystem(entityMan.entities, 4);

  const maxFPS = 60;
  const milsPerFrame = 1000 / maxFPS;
  let frames = 0;

  levMan.initLevel1();

  function update() {
    const frameStart = Date.now();
    if (!game.paused) {
      preRenSys.update(entityMan.entities);
      renSys.update(entityMan.entities);

      phySys.update(entityMan.entities);
      behSys.update(entityMan.entities);

      // if (i < 1000) {
      requestAnimationFrame(update);
      // i++;
      // } else {
      //   console.timeEnd('timeTest');
      // }
      while (Date.now() - frameStart < milsPerFrame) {}
      ++frames;
    }
  }
  requestAnimationFrame(update);
}
//console.time('timeTest');
main();

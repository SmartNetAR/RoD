// ROOM OF DOOM
// GameEngine ES

// Import stylesheets
import './style.css';
import Display from './display';
import Vec2f from './vec';

import LevelManager from './sys/levelManager';
import PhysicsSystem from './sys/physics';
import RenderSystem from './sys/render';
import BehaviourSystem from './sys/behaviour';
import PreRenderSystem from './sys/prerender';
import ControlsSystem from './sys/controller';
const appDiv: HTMLElement = document.getElementById('app');

// let i = 0;
function main() {
  const displayHeight = 456;
  const display = new Display('canvas', 640, displayHeight);
  const displayWidth = display.getWidth();
  display.load(function () {

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


    // return;
    const displaySyze: Vec2f = { x: displayWidth, y: displayHeight };
    const levMan = new LevelManager(displaySyze);

    const preRenSys = new PreRenderSystem();
    const renSys = new RenderSystem(display);
    const phySys = new PhysicsSystem(displaySyze);
    const behSys = new BehaviourSystem(levMan);

    const entityMan = levMan.getEntityMan();
    const ctrlSys = new ControlsSystem(entityMan.entities, 4);

    const maxFPS = 48;
    const milsPerFrame = 1000 / maxFPS;
    let frames = 0;

    levMan.initLevel1();

    function update() {
      const frameStart = Date.now();
      if (!game.paused) {
        entityMan.updated();
        preRenSys.update(entityMan.entities);
        renSys.update(entityMan.entities);

        phySys.update(entityMan.entities);
        behSys.update(entityMan.entities);

        requestAnimationFrame(update);
        while (Date.now() - frameStart < milsPerFrame) { }
        ++frames;
      }
    }
    requestAnimationFrame(update);

  });
}
//console.time('timeTest');
main();

// ROOM OF DOOM
// GameEngine ES

// Import stylesheets
import './style.css';
import Display from './util/display';
import Vec2f from './util/vec';

import LevelManager from './man/levelManager';
import PhysicsSystem from './sys/physics';
import RenderSystem from './sys/render';
import BehaviourSystem from './sys/behaviour';
import PreRenderSystem from './sys/prerender';
import InputSystem from './sys/input';
import MsKeyboard from './util/msKeyboard';
const appDiv: HTMLElement = document.getElementById('app');

// let i = 0;
const defaultDisplayWidth = 640;
const displayHeight = 456;
const display = new Display('canvas', defaultDisplayWidth, displayHeight);
display.load(run);

function run() {
  const displayWidth = display.getWidth();
  const game = {
    paused: false,
  };

  MsKeyboard.init();
  const pauseBtn: HTMLElement = document.getElementById('pause');
  pauseBtn.addEventListener('click', (ev) => {
    game.paused = !game.paused;
    if (!game.paused) {
      requestAnimationFrame(update);
    }
  });

  const displaySyze: Vec2f = { x: displayWidth, y: displayHeight };
  const levMan = new LevelManager(displaySyze);

  const preRenSys = new PreRenderSystem();
  const renSys = new RenderSystem(display);
  const phySys = new PhysicsSystem();
  const behSys = new BehaviourSystem(levMan);

  const entityMan = levMan.getEntityMan();
  const inpSys = new InputSystem(4);

  const maxFPS = 48;
  const milsPerFrame = 1000 / maxFPS;

  levMan.initLevel1();

  function update() {
    const frameStart = Date.now();
    if (!game.paused) {
      entityMan.updated();

      preRenSys.update(entityMan.entities);
      renSys.update(entityMan.entities);

      inpSys.update(entityMan.entities);

      phySys.update(entityMan.entities);
      behSys.update(entityMan.entities);

      requestAnimationFrame(update);
      while (Date.now() - frameStart < milsPerFrame) { }
    }
  }
  requestAnimationFrame(update);
}

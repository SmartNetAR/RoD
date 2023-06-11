
// ROOM OF DOOM
// GameEngine ES

// Import stylesheets
import Display from './util/display';
import Vec2f from './util/vec';

import LevelManager from './man/levelManager';
import PhysicsSystem from './sys/physics';
import RenderSystem from './sys/render';
import BehaviourSystem from './sys/behaviour';
import PreRenderSystem from './sys/prerender';
import InputSystem from './sys/input';
import MsKeyboard from './util/msKeyboard';

// let i = 0;
class Game {
    private display: Display;
    
    constructor(canvasId: string, private controlsClass: string) {
        const defaultDisplayWidth = 640;
        const displayHeight = 456;
        this.display = new Display(canvasId, defaultDisplayWidth, displayHeight);
    }

    start() {
        this.display.load(this.run.bind(this));
    }

    private run() {
        const displayWidth = this.display.width;
        const displayHeight = this.display.height;
        const game = {
            paused: false,
        };

        MsKeyboard.init(this.controlsClass);
        const pauseBtn: HTMLElement = document.getElementById('pause');
        pauseBtn.addEventListener('click', (ev) => {
            game.paused = !game.paused;
            if (!game.paused) {
                requestAnimationFrame(update);
            }
        });

        const displaySyze: Vec2f = { x: displayWidth, y: displayHeight };
        const levMan = new LevelManager(displaySyze);
        const entityMan = levMan.getEntityMan();

        const preRenSys = new PreRenderSystem(entityMan);
        const renSys = new RenderSystem(entityMan, this.display);
        const phySys = new PhysicsSystem(entityMan);
        const behSys = new BehaviourSystem(entityMan, levMan);

        const inpSys = new InputSystem(entityMan, 5);

        const maxFPS = 48;
        const milsPerFrame = 1000 / maxFPS;

        levMan.initLevel1();

        function update() {
            const frameStart = Date.now();
            if (!game.paused) {
                entityMan.updated();

                preRenSys.update();
                renSys.update();

                inpSys.update();

                phySys.update();
                behSys.update();

                requestAnimationFrame(update);
                while (Date.now() - frameStart < milsPerFrame) { }
            }
        }
        requestAnimationFrame(update);
    }
}

export default Game;
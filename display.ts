import Rect2D from './rect2d';
import Sprite, { spriteType } from './sprite';
import { SpriteType } from './sys/spriteManager';
import Vec2f from './vec';

class Display {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private gameSpriteSheet: HTMLImageElement;
  private callback: Function;

  constructor(idCanvasElement: string, w: number = 640, h: number = 480) {
    this.canvas = document.getElementById(idCanvasElement) as HTMLCanvasElement;
    const maxWidth = window.innerWidth - 20;
    this.canvas.width = w <= maxWidth ? w : maxWidth;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.font = '25px Arial';
  }

  load(callback: Function) {
    this.callback = callback;
    console.log('load');
    this.gameSpriteSheet = new Image();
    this.gameSpriteSheet.src =
      'https://cdn.jsdelivr.net/gh/SmartNetAR/RoD@main/assets/spritesheet_min.png';
      // '/assets/spritesheet_min.png'
    console.log(this.gameSpriteSheet.src);
    this.gameSpriteSheet.onload = this.loadImages;
  }

  drawPlayer(pos: Vec2f) {
    const rec = new Rect2D(0, 41, 38, 38)
    this.ctx.drawImage(
      this.gameSpriteSheet,
      rec.x, rec.y, rec.width, rec.height,
      pos.x,
      pos.y,
      rec.width,
      rec.height
    );
  }

  drawEnemy(pos: Vec2f) {
    const rec = new Rect2D(198, 41, 33, 38)
    this.ctx.drawImage(
      this.gameSpriteSheet,
      rec.x, rec.y, rec.width, rec.height,
      pos.x,
      pos.y,
      rec.width,
      rec.height
    );
  }

  drawShot(pos: Vec2f) {
    const rec = new Rect2D(224, 20, 10, 10)
    this.ctx.drawImage(
      this.gameSpriteSheet,
      rec.x, rec.y, rec.width, rec.height,
      pos.x,
      pos.y,
      rec.width,
      rec.height
    );
  }

  loadImages = () => {
    if (typeof this.callback === "function") {
      this.callback();
    }
  };

  getWidth() {
    return this.canvas.width;
  }

  clean() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSprite(spriteType: SpriteType, pos: Vec2f) {
    if (spriteType === SpriteType.Player) {
      // this.drawSprintSprite(pos, spriteType.style);
      this.drawPlayer(pos);
    } else {
      this.drawShot(pos);
      // this.drawRectSprite(pos, spriteType.style);
    }
  }

  drawSprintSprite(pos: Vec2f, style: string) {
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(style, pos.x - 5, pos.y + 20);
  }

  drawRectSprite(pos: Vec2f, style: string) {
    this.ctx.fillStyle = style;
    this.ctx.fillRect(pos.x, pos.y, 25, 25);
  }

  draw(sprite: Sprite, pos: Vec2f, w: number = 10, h: number = 10) {
    this.drawSprite(sprite, pos);
    // const sprite1 = new Sprite();
    // sprite1.type = spriteType.string;
    // sprite1.style = '👾';
    // const spriteRect1 = new Sprite();
    // spriteRect1.type = spriteType.rect;
    // spriteRect1.style = `rgba(255, 165, 0, 0.0)`;
    // this.drawSprite(spriteRect1, { x, y });
    // const sprite2 = new Sprite();
    // sprite2.type = spriteType.string;
    // sprite2.style = '👾';
    // this.drawSprite(sprite2, { x, y: y + 100 });
    // const spriteRect2 = new Sprite();
    // spriteRect2.type = spriteType.rect;
    // spriteRect2.style = `rgba(255, 165, 0, 0.7)`;
    // this.drawSprite(spriteRect2, { x, y: y + 100 });
  }
}

export default Display;

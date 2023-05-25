import Sprite, { spriteType } from './sprite';
import Vec2f from './vec';

class Display {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private gameSpriteSheet: HTMLImageElement;

  constructor(idCanvasElement: string, w: number = 640, h: number = 480) {
    this.canvas = document.getElementById(idCanvasElement) as HTMLCanvasElement;
    const maxWidth = window.innerWidth - 20;
    this.canvas.width = w <= maxWidth ? w : maxWidth;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.font = '25px Arial';
  }

  load() {
    console.log('load');
    this.gameSpriteSheet = new Image();
    this.gameSpriteSheet.src =
      'https://cdn.jsdelivr.net/gh/SmartNetAR/RoD@main/assets/spritesheet.png';
    console.log(this.gameSpriteSheet.src);
    this.gameSpriteSheet.onload = this.loadImages;
  }

  drawPlayer(pos: Vec2f) {
    const srcX = 5; // punto inicio imagen ancho
    const srcY = 142; // punto inicio imagen alto
    const spriteWidth = 125; // recorte ancho
    const spriteHeight = 127; // recorte alto
    this.ctx.drawImage(
      this.gameSpriteSheet,
      srcX,
      srcY,
      spriteWidth,
      spriteHeight,
      pos.x,
      pos.y,
      spriteWidth / 2,
      spriteHeight / 2
    );
  }

  drawEnemy(pos: Vec2f) {
    const srcX = 665; // punto inicio imagen ancho
    const srcY = 142; // punto inicio imagen alto
    const spriteWidth = 110; // recorte ancho
    const spriteHeight = 127; // recorte alto
    this.ctx.drawImage(
      this.gameSpriteSheet,
      srcX,
      srcY,
      spriteWidth,
      spriteHeight,
      pos.x,
      pos.y,
      spriteWidth / 2,
      spriteHeight / 2
    );
  }

  loadImages = () => {
    this.clean();
    this.drawPlayer({ x: 100, y: 200 });
    this.drawEnemy({ x: 400, y: 300 });
  };

  getWidth() {
    return this.canvas.width;
  }

  clean() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSprite(sprite: Sprite, pos: Vec2f) {
    if (sprite.type === spriteType.string) {
      this.drawSprintSprite(pos, sprite.style);
    } else {
      this.drawRectSprite(pos, sprite.style);
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

  draw2(sprite: Sprite, pos: Vec2f, w: number = 10, h: number = 10) {
    this.drawSprite(sprite, pos);
  }
}

export default Display;

import Rect2D from './rect2d';
import Vec2f from './vec';

class Display {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private gameSpriteSheet: HTMLImageElement;
  private callback: Function;

  constructor(idCanvasElement: string, w: number = 640, h: number = 480) {
    this.canvas = document.getElementById(idCanvasElement) as HTMLCanvasElement;
    if (!this.canvas) throw new Error(`Canvas with id: ${idCanvasElement} not found`);
    const maxWidth = window.innerWidth - 20;
    this.canvas.width = w <= maxWidth ? w : maxWidth;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.font = '25px Arial';
  }

  load(callback: Function) {
    this.callback = callback;
    this.gameSpriteSheet = new Image();
    this.gameSpriteSheet.src =
      'https://cdn.jsdelivr.net/gh/SmartNetAR/RoD@main/assets/spritesheet_min.png';
      // '/assets/spritesheet_min.png'
    this.gameSpriteSheet.onload = this.loadImages;
  }

  loadImages = () => {
    if (typeof this.callback === "function") {
      this.callback();
    }
  };

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  clean() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(rec: Rect2D, pos: Vec2f) {
    this.ctx.drawImage(
      this.gameSpriteSheet,
      rec.x, rec.y, rec.width, rec.height,
      pos.x,
      pos.y,
      rec.width,
      rec.height
    );
  }
}

export default Display;

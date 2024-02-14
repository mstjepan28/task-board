export class Boid {
  private x: number;
  private y: number;
  private dx: number;
  private dy: number;
  private size = 10;

  constructor(x: number, y: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  public update = (width: number, height: number) => {
    if (this.x > width - this.size / 2 || this.x - this.size / 2 < 0) {
      this.dx = -this.dx;
    }
    if (this.y > height - this.size / 2 || this.y - this.size / 2 < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  };

  public draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";

    ctx.fill();
    ctx.closePath();
  };
}

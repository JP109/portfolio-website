export class Particle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  radius: number;
  size: number;
  color: string;
  context: CanvasRenderingContext2D | null;
  centerX: number;
  centerY: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    size: number,
    color: string,
    context: CanvasRenderingContext2D | null
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.size = size;
    this.color = color;
    this.context = context;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = (Math.random() * 0.05) + 0.02; // Adjust speed as necessary
    this.centerX = x;
    this.centerY = y;
  }

  draw() {
    if (this.context) {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      this.context.fillStyle = this.color;
      this.context.fill();
    }
  }

  update() {
    this.angle += this.speed; // Increase the angle to create circular motion

    // Calculate new x and y positions based on circular motion
    this.x = this.centerX + this.radius * Math.cos(this.angle);
    this.y = this.centerY + this.radius * Math.sin(this.angle);

    // Draw the particle
    this.draw();
  }
}

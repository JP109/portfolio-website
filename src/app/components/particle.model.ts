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
  frequencyX: number;
  frequencyY: number;

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
    this.speed = 0.04; // Adjust speed as necessary
    this.centerX = x;
    this.centerY = y;
    this.frequencyX =  1; // Frequency for X axis
    this.frequencyY =  1; // Frequency for Y axis
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

    // Calculate new x and y positions based on a Lissajous curve for a figure-eight pattern
    this.y = this.centerX + this.radius * Math.sin(this.angle * this.frequencyX);
    this.x = this.centerY + this.radius * Math.sin(this.angle * this.frequencyY * 0.5); // Adjust the frequency ratio to 0.5 for the figure-eight

    // Draw the particle
    this.draw();
  }
}

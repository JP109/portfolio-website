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
  dx: number; // Added
  dy: number; // Added

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
    // this.speed = (Math.random() * 0.05) + 0.02;
    this.speed = 0.03;
    this.centerX = x;
    this.centerY = y;
    // this.frequencyX = Math.random() * 2 + 1;
    // this.frequencyY = Math.random() * 2 + 1;
    this.frequencyX =  1; // Frequency for X axis
    this.frequencyY =  1; // Frequency for Y axis
    this.dx = 0; // Initialize dx
    this.dy = 0; // Initialize dy
  }

  draw() {
    if (this.context) {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      this.context.fillStyle = this.color;
      this.context.fill();
    }
  }

  update(mouse: { x: number | null, y: number | null, radius: number }) {
    this.angle += this.speed;

    // Lissajous curve calculation
    this.x = this.centerX + this.radius * Math.sin(this.angle * this.frequencyX) + this.dx;
    this.y = this.centerY + this.radius * Math.sin(this.angle * this.frequencyY * 0.5) + this.dy;

    // Mouse interaction
    if (mouse.x && mouse.y) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius + this.size) {
        // Bounce particle away from the mouse
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - distance) / mouse.radius;
        this.dx -= Math.cos(angle) * force * 10; // Adjust multiplier for more/less bounce
        this.dy -= Math.sin(angle) * force * 10; // Adjust multiplier for more/less bounce
      } else {
        // Gradually reset velocity
        this.dx *= 0.95;
        this.dy *= 0.95;
      }
    }

    this.draw();
  }
}

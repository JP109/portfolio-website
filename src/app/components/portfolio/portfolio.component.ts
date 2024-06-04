import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  context: CanvasRenderingContext2D | null = null;
  mouse: { x: number | null, y: number | null, radius: number };
  particleArray: Particle[] = [];
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  constructor() { 
    this.mouse = {
      x: null,
      y: null,
      radius: (window.innerHeight / 80) * (window.innerWidth / 80)
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const canvasEl = this.canvas.nativeElement;
    this.context = canvasEl.getContext('2d');
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    this.initParticles();
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    const canvasEl = this.canvas.nativeElement;
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    this.mouse.radius = (window.innerHeight / 80) * (window.innerWidth / 80);
    this.initParticles();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.x;
    this.mouse.y = event.y;
  }

  initParticles() {
    this.particleArray = [];
    const particleCount = (window.innerHeight * window.innerWidth) / 9000;
    for (let i = 0; i < particleCount; i++) {
      const size = (Math.random() * 5) + 1;
      const x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
      const y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
      const directionX = (Math.random() * 5) - 2.5;
      const directionY = (Math.random() * 5) - 2.5;
      const color = '#237162';

      this.particleArray.push(new Particle(x, y, directionX, directionY, size, color, this.context, this.mouse));
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.context?.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let particle of this.particleArray) {
      particle.update();
    }
  }
}

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
  context: CanvasRenderingContext2D | null;
  mouse: { x: number | null, y: number | null, radius: number };

  constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string, context: CanvasRenderingContext2D | null, mouse: { x: number | null, y: number | null, radius: number }) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.context = context;
    this.mouse = mouse;
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
    if(this.x > window.innerWidth || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if(this.y > window.innerHeight || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Move particle
    this.x += this.directionX;
    this.y += this.directionY;

    // Draw particle
    this.draw();
  }
}

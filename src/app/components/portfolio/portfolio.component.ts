import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Particle } from '../particle.model'; // Adjust the import path as necessary

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
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const size = (Math.random() * 5) + 10;
      const x = window.innerWidth/5;
      const y = window.innerHeight;
      const radius = window.innerWidth/6 + Math.random() * 100; // Adjust the radius for the circular path
      const color = '#7F5283';

      this.particleArray.push(new Particle(x, y, radius, size, color, this.context));
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

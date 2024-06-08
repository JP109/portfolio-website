import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Particle } from '../particle.model';
import { PdfDownloadService } from 'src/app/pdfDownload.service';

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

  constructor(private pdfDownloadService: PdfDownloadService) { 
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
    // this.mouse.radius = (window.innerHeight / 80) * (window.innerWidth / 80);
    this.mouse.radius = (50) * (50);
    this.initParticles();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.x;
    this.mouse.y = event.y;
  }

  initParticles() {
    this.particleArray = [];
    const particleCount = 250;
    for (let i = 0; i < particleCount; i++) {
      const size = (Math.random() * 15);
      const y = window.innerHeight/2;
      const x = window.innerWidth/2;
      const radius = window.innerWidth/5 + Math.random() * 100; // Adjust the radius for the circular path
      let color = '#40E0D0'
      if(i%2==0){
        color = '#7F5283';
      }

      this.particleArray.push(new Particle(x, y, radius, size, color, this.context));
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.context?.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let particle of this.particleArray) {
      particle.update(this.mouse);
    }
  }

  downloadResume(){
    const url = '../../../assets/JaiPawarResume.pdf';
    this.pdfDownloadService.downloadPdf(url).subscribe(blob => {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = 'JaiPawarResume.pdf';
    a.click();
    URL.revokeObjectURL(objectUrl);
  });
  }
}

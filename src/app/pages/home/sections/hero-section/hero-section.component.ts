import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent implements AfterViewInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    const video = this.elementRef.nativeElement.querySelector('.hero-background') as HTMLVideoElement | null;

    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(() => {
        video.classList.add('is-paused-by-browser');
      });
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }
  }
}

import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-films-section',
  templateUrl: './films-section.component.html',
})
export class FilmsSectionComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const autoplayVideos = document.querySelectorAll<HTMLVideoElement>('.films video[data-autoplay-video]');
    const hoverVideos = document.querySelectorAll<HTMLVideoElement>('.films video[data-hover-video]');

    const prepareVideo = (video: HTMLVideoElement) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
    };

    const playVideo = (video: HTMLVideoElement) => {
      video.play().catch(() => {
        video.classList.add('is-paused-by-browser');
      });
    };

    autoplayVideos.forEach((video) => {
      prepareVideo(video);
      playVideo(video);

      video.addEventListener('canplay', () => playVideo(video), { once: true });
    });

    hoverVideos.forEach((video) => {
      prepareVideo(video);

      const playVideo = () => {
        video.play().catch(() => {
          video.classList.add('is-paused-by-browser');
        });
      };

      const pauseVideo = () => {
        video.pause();
      };

      video.addEventListener('mouseenter', playVideo);
      video.addEventListener('focus', playVideo);
      video.addEventListener('mouseleave', pauseVideo);
      video.addEventListener('blur', pauseVideo);
    });
  }
}

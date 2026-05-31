import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

/**
 * Background/loop autoplay videos, made data- and motion-friendly
 * (ui-ux-pro-max: "Auto-Play Video" + "Reduced Motion").
 * - Plays only while on-screen; pauses when scrolled away (saves CPU/battery/data).
 * - Under prefers-reduced-motion OR Save-Data, does NOT autoplay: shows the poster
 *   with native controls so the visitor can click to play.
 * Applies to any `<video data-autoplay-video>`.
 */
@Directive({
  selector: 'video[data-autoplay-video]',
  standalone: true,
})
export class AutoVideoDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLVideoElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    const video = this.host.nativeElement;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const saveData = !!connection?.saveData;

    if (reduceMotion || saveData) {
      // Respect the user's preference: no autoplay. Content videos become
      // click-to-play; a decorative (aria-hidden) background just shows its poster.
      video.removeAttribute('autoplay');
      video.pause();
      if (video.getAttribute('aria-hidden') !== 'true') {
        video.setAttribute('controls', '');
      }
      return;
    }

    const tryPlay = () => video.play().catch(() => video.classList.add('is-paused-by-browser'));

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) tryPlay();
          else if (!video.paused) video.pause();
        }
      },
      { threshold: 0.25 },
    );
    this.observer.observe(video);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

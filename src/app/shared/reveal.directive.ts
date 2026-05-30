import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, inject } from '@angular/core';

/**
 * Scroll-reveal directive — Angular port of the bureau's `useReveal` hook
 * (SLEIGHTCOWEB/src/useReveal.ts). Adds `.reveal`, then `.in-view` as the host
 * enters the viewport. Elements already in view are revealed synchronously so
 * content is never stuck hidden. Respects prefers-reduced-motion.
 *
 * Usage: `<article appReveal>` or, inside an @for, `<article [appReveal]="$index">`
 * to stagger siblings (70ms per step, capped at 6).
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Optional stagger index (e.g. the @for $index of the element). */
  @Input('appReveal') stagger: number | string = 0;

  private observer?: IntersectionObserver;
  private timer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const el = this.host.nativeElement;
    const index = Number(this.stagger) || 0;
    el.style.transitionDelay = `${Math.min(index, 6) * 70}ms`;
    el.classList.add('reveal');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    const revealIfVisible = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('in-view');
        this.observer?.unobserve(el);
      }
    };

    this.observer.observe(el);
    revealIfVisible();
    // Failsafe for anything the observer misses on first paint.
    this.timer = setTimeout(revealIfVisible, 600);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
    this.observer?.disconnect();
  }
}

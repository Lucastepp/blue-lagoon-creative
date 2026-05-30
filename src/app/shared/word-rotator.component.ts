import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';

/**
 * Hero headline word-rotator — the bureau's signature motion
 * (SLEIGHTCOWEB/src/App.css `.rotator-word` + `@keyframes word-in`).
 * Cycles through `words`, re-running the entry animation on each swap by
 * recreating the node (the @for track changes every tick). Respects
 * prefers-reduced-motion and falls back to the first word when there's
 * nothing to cycle.
 */
@Component({
  selector: 'app-word-rotator',
  standalone: true,
  template: `@for (word of view(); track tick()) {<span class="rotator-word">{{ word }}</span>}`,
})
export class WordRotatorComponent implements OnInit, OnDestroy {
  @Input({ required: true }) words: string[] = [];
  @Input() interval = 2400;

  private readonly tickSig = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  readonly tick = () => this.tickSig();
  readonly view = (): string[] =>
    this.words.length ? [this.words[this.tickSig() % this.words.length]] : [];

  ngOnInit(): void {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || this.words.length < 2) return;
    this.timer = setInterval(() => this.tickSig.update((value) => value + 1), this.interval);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }
}

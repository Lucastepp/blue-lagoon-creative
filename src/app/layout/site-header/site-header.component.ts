import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  /** Adds a stronger glass background + hairline once the page is scrolled. */
  @HostBinding('class.scrolled') protected scrolled = false;
  private ticking = false;

  @HostListener('window:scroll')
  protected onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.scrolled = window.scrollY > 12;
      this.ticking = false;
    });
  }
}

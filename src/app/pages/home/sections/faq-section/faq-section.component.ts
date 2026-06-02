import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { faqs } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-faq-section',
  imports: [RevealDirective],
  template: `
    <section class="faq" aria-labelledby="faq-title">
      <div class="section-heading">
        <h2 id="faq-title">Questions, answered.</h2>
        <p>What hospitality clients ask before they start.</p>
      </div>
      <div class="faq-list">
        @for (item of faqs; track item.q; let i = $index) {
          <article [appReveal]="i" [class.is-open]="openItem() === i">
            <button
              class="faq-question"
              type="button"
              [attr.aria-expanded]="openItem() === i"
              [attr.aria-controls]="'faq-answer-' + i"
              (click)="toggle(i)"
            >
              <span>{{ item.q }}</span>
            </button>
            <div class="faq-answer" [id]="'faq-answer-' + i">
              <div>
                <p>{{ item.a }}</p>
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class FaqSectionComponent {
  protected readonly faqs = faqs;
  protected readonly openItem = signal<number | null>(null);

  protected toggle(index: number): void {
    this.openItem.update((current) => (current === index ? null : index));
  }
}

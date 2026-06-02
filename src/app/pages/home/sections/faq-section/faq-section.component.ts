import { Component } from '@angular/core';
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
          <details [appReveal]="i">
            <summary>{{ item.q }}</summary>
            <div class="faq-answer">
              <div>
                <p>{{ item.a }}</p>
              </div>
            </div>
          </details>
        }
      </div>
    </section>
  `,
})
export class FaqSectionComponent {
  protected readonly faqs = faqs;
}

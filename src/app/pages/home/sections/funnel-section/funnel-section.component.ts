import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { funnel } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-funnel-section',
  imports: [RevealDirective],
  template: `
    <section class="funnel-section" aria-labelledby="funnel-title">
      <div class="section-heading">
        <h2 id="funnel-title">The hospitality funnel.</h2>
        <p>How a guest goes from first glimpse to a repeat &mdash; and what we run at each step.</p>
      </div>
      <ol class="funnel">
        @for (stage of funnel; track stage.name; let i = $index) {
          <li class="funnel-stage" [appReveal]="i">
            <span class="funnel-node">{{ pad(i + 1) }}</span>
            <div class="funnel-content">
              <h3>{{ stage.name }}</h3>
              <p class="funnel-customer">{{ stage.customer }}</p>
              <p class="funnel-move"><span>Our move</span>{{ stage.move }}</p>
            </div>
          </li>
        }
      </ol>
    </section>
  `,
})
export class FunnelSectionComponent {
  protected readonly funnel = funnel;
  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}

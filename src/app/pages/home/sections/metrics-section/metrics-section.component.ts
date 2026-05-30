import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { metrics } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-metrics-section',
  imports: [RevealDirective],
  template: `
    <section class="metrics" aria-labelledby="metrics-title">
      <div class="section-heading">
        <h2 id="metrics-title">The numbers we move.</h2>
        <p>No vanity metrics &mdash; the figures hospitality is actually judged on.</p>
      </div>
      <div class="metrics-grid">
        @for (metric of metrics; track metric.label; let i = $index) {
          <article class="metric" [appReveal]="i">
            <h3>{{ metric.label }}</h3>
            <p>{{ metric.caption }}</p>
          </article>
        }
      </div>
    </section>
  `,
})
export class MetricsSectionComponent {
  protected readonly metrics = metrics;
}

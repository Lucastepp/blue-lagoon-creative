import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { promise } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-promise-section',
  imports: [RevealDirective],
  template: `
    <section class="promise" appReveal>
      <p class="eyebrow">The promise</p>
      <p class="promise-text">{{ promise }}</p>
    </section>
  `,
})
export class PromiseSectionComponent {
  protected readonly promise = promise;
}

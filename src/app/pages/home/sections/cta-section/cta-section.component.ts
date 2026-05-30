import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { cta } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-cta-section',
  imports: [RevealDirective],
  template: `
    <section class="cta-band" appReveal>
      <img class="cta-bg" src="/assets/blue-lagoon/pool-arches-night.jpg" alt="" aria-hidden="true" />
      <div class="cta-scrim"></div>
      <div class="cta-inner">
        <p class="eyebrow">Blue Lagoon</p>
        <h2>{{ cta.title }}</h2>
        <p>{{ cta.text }}</p>
        <a class="button button-primary" href="#contact">Show us your place</a>
      </div>
    </section>
  `,
})
export class CtaSectionComponent {
  protected readonly cta = cta;
}

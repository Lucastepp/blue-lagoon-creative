import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { howItWorks } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-howitworks-section',
  imports: [RevealDirective],
  template: `
    <section class="howitworks" aria-labelledby="hiw-title">
      <div class="howitworks-media" appReveal>
        <img src="/assets/blue-lagoon/round-window-palms.jpg" alt="" loading="lazy" />
      </div>
      <div class="howitworks-inner" appReveal>
        <p class="eyebrow">How it works, in plain terms</p>
        <p class="howitworks-text" id="hiw-title">{{ howItWorks }}</p>
      </div>
    </section>
  `,
})
export class HowitworksSectionComponent {
  protected readonly howItWorks = howItWorks;
}

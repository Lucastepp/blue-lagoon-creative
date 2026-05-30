import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { clientTypes } from '../../../../data/blue-lagoon.content';

const CLIENT_IMAGES = [
  '/assets/blue-lagoon/hotel-facade.jpg',
  '/assets/blue-lagoon/family-snorkeling-beach.jpg',
  '/assets/blue-lagoon/garden-stairs.jpg',
  '/assets/blue-lagoon/white-town-rooftops.jpg',
];

@Component({
  selector: 'app-clients-section',
  imports: [RevealDirective],
  template: `
    <section class="clients" aria-labelledby="clients-title">
      <div class="section-heading">
        <h2 id="clients-title">Who we work with.</h2>
        <p>The range of hospitality businesses we run this for.</p>
      </div>
      <div class="clients-grid">
        @for (name of clientTypes; track name; let i = $index) {
          <article class="client-card" [appReveal]="i">
            <img [src]="images[i]" alt="" loading="lazy" />
            <span>{{ name }}</span>
          </article>
        }
      </div>
    </section>
  `,
})
export class ClientsSectionComponent {
  protected readonly clientTypes = clientTypes;
  protected readonly images = CLIENT_IMAGES;
}

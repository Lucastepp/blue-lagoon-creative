import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { clientGroups } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-clients-section',
  imports: [RevealDirective],
  template: `
    <section class="clients" aria-labelledby="clients-title">
      <div class="section-heading">
        <h2 id="clients-title">Who we work with.</h2>
        <p>Across hospitality, short-term rental, and the dining and wellness around them.</p>
      </div>
      <div class="clients-groups">
        @for (group of clientGroups; track group.title; let i = $index) {
          <article class="client-group" [appReveal]="i">
            <div class="client-group-media">
              <img [src]="group.image" alt="" loading="lazy" />
              <span class="client-group-title">{{ group.title }}</span>
            </div>
            <ul class="client-group-types">
              @for (type of group.types; track type) {
                <li>{{ type }}</li>
              }
            </ul>
          </article>
        }
      </div>
    </section>
  `,
})
export class ClientsSectionComponent {
  protected readonly clientGroups = clientGroups;
}

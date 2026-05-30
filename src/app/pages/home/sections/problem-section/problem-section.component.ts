import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { problem } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-problem-section',
  imports: [RevealDirective],
  template: `
    <section class="problem" aria-labelledby="problem-title">
      <div class="problem-inner" appReveal>
        <p class="eyebrow">The problem</p>
        <p class="problem-lead" id="problem-title">{{ problem.lead }}</p>
        <ul class="problem-points">
          @for (point of problem.points; track point) {
            <li>{{ point }}</li>
          }
        </ul>
      </div>
      <div class="problem-media" appReveal>
        <img src="/assets/blue-lagoon/pool-walkway-evening.jpg" alt="" loading="lazy" />
      </div>
    </section>
  `,
})
export class ProblemSectionComponent {
  protected readonly problem = problem;
}

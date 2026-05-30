import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { aiAngle, engineNarrative, engineSteps } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-ai-section',
  imports: [RevealDirective],
  template: `
    <section class="ai-section" appReveal aria-labelledby="ai-title">
      <div class="ai-inner">
        <p class="eyebrow">AI enabling your property</p>
        <h2 id="ai-title">{{ ai.headline }}</h2>
        <p class="ai-text">{{ engineNarrative }}</p>
        <ol class="engine-steps">
          @for (step of engineSteps; track step; let i = $index) {
            <li class="engine-step"><span>{{ pad(i + 1) }}</span>{{ step }}</li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class AiSectionComponent {
  protected readonly ai = aiAngle;
  protected readonly engineNarrative = engineNarrative;
  protected readonly engineSteps = engineSteps;
  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}

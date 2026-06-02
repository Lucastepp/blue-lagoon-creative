import { Injectable, signal } from '@angular/core';

interface BriefRecommendation {
  title: string;
  text: string;
  support: string[];
}

@Injectable({ providedIn: 'root' })
export class ProjectBriefDraftService {
  readonly draft = signal('');

  createFromRecommendation(recommendation: BriefRecommendation): void {
    const support = recommendation.support.length
      ? `\n\nAreas to explore:\n- ${recommendation.support.join('\n- ')}`
      : '';

    this.draft.set(
      `Hello Blue Lagoon,\n\nI'm interested in discussing my property. Based on the project finder, a useful starting point could be:\n\n${recommendation.title}\n${recommendation.text}${support}\n\nProperty details: `,
    );
  }
}

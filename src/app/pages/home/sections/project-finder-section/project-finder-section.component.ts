import { Component } from '@angular/core';

interface FinderOption {
  label: string;
  detail: string;
  value: string;
}

interface FinderStep {
  eyebrow: string;
  title: string;
  intro: string;
  options: FinderOption[];
}

@Component({
  selector: 'app-project-finder-section',
  templateUrl: './project-finder-section.component.html',
})
export class ProjectFinderSectionComponent {
  readonly steps: FinderStep[] = [
    {
      eyebrow: 'Question 01',
      title: 'Where does the guest journey feel weakest?',
      intro: 'Start with the friction you can already feel. The right deliverables become clearer from there.',
      options: [
        {
          label: 'Our property looks better in person',
          detail: 'The stay is strong, but the images and first impression do not carry it online.',
          value: 'visuals',
        },
        {
          label: 'We are visible, but bookings could be stronger',
          detail: 'The audience exists. The website, campaigns or conversion path need attention.',
          value: 'performance',
        },
        {
          label: 'Guest questions take too much staff time',
          detail: 'The team keeps answering the same questions before and after booking.',
          value: 'automation',
        },
        {
          label: 'We need a clearer digital foundation',
          detail: 'The property needs a better website, booking flow or useful guest-facing tool.',
          value: 'digital',
        },
      ],
    },
    {
      eyebrow: 'Question 02',
      title: 'What would you like to explore first?',
      intro: 'Choose the closest answer. The final scope can combine several pieces.',
      options: [
        { label: 'Photography', detail: 'A real image library for pages, campaigns and booking channels.', value: 'photography' },
        { label: 'Film', detail: 'Cinematic destination cuts, reels and hero loops.', value: 'film' },
        { label: 'Drone', detail: 'Arrival, coastline and property context seen from above.', value: 'drone' },
        { label: 'Marketing & performance', detail: 'Campaign creative, paid traffic and a clearer conversion path.', value: 'marketing' },
        { label: 'Website', detail: 'A mobile-first property site that lets the strongest visuals work.', value: 'website' },
        { label: 'Guest application', detail: 'A focused digital tool for the stay, service or internal workflow.', value: 'application' },
        { label: 'AI secretary', detail: 'A helpful first-response layer for recurring guest questions.', value: 'secretary' },
        { label: 'AI booking flow', detail: 'A guided booking conversation shaped around the property.', value: 'booking' },
        { label: 'Not sure yet', detail: 'Start from the business problem and connect the right pieces.', value: 'unsure' },
      ],
    },
    {
      eyebrow: 'Question 03',
      title: 'What kind of first move feels right?',
      intro: 'A useful first phase can be focused or broader. It does not need to solve everything at once.',
      options: [
        { label: 'One focused improvement', detail: 'Fix the clearest issue first and build from a strong result.', value: 'focused' },
        { label: 'A coordinated refresh', detail: 'Connect content, digital presence and campaigns in one direction.', value: 'refresh' },
        { label: 'A smarter guest journey', detail: 'Explore website, application and automation together.', value: 'journey' },
      ],
    },
  ];

  stepIndex = 0;
  selections: Record<number, FinderOption> = {};

  get isComplete(): boolean {
    return this.stepIndex === this.steps.length;
  }

  get activeStep(): FinderStep {
    return this.steps[Math.min(this.stepIndex, this.steps.length - 1)];
  }

  get progress(): number {
    return this.isComplete ? 100 : Math.round(((this.stepIndex + 1) / this.steps.length) * 100);
  }

  get recommendation(): { title: string; text: string; support: string[] } {
    const need = this.selections[0]?.value;
    const service = this.selections[1]?.value;
    const pace = this.selections[2]?.value;

    const recommendations: Record<string, { title: string; text: string }> = {
      photography: {
        title: 'Start with a property photography library.',
        text: 'Build a useful set of real images for the website, booking channels and campaign calendar.',
      },
      film: {
        title: 'Start with a destination film package.',
        text: 'Capture movement, atmosphere and short edits that can work across the first screen, reels and campaigns.',
      },
      drone: {
        title: 'Start with a drone-led arrival story.',
        text: 'Show the coastline, setting and scale of the property before guests begin comparing rooms and amenities.',
      },
      marketing: {
        title: 'Start with a marketing and performance review.',
        text: 'Connect campaign creative with a clearer path from attention to inquiry or booking.',
      },
      website: {
        title: 'Start with the property website.',
        text: 'Shape a mobile-first home for the strongest visuals, practical information and the booking path.',
      },
      application: {
        title: 'Explore a focused guest application.',
        text: 'Map one useful workflow first, then build a tool around the moments that genuinely need it.',
      },
      secretary: {
        title: 'Explore an AI guest secretary.',
        text: 'Identify recurring questions and design a helpful response layer that supports the team.',
      },
      booking: {
        title: 'Explore a guided AI booking flow.',
        text: 'Map how guests decide, what they ask and where a better conversation could remove friction.',
      },
      unsure: {
        title: 'Start with a short discovery session.',
        text: 'Bring the property, the current guest journey and the parts that feel stuck. The first useful scope can follow from that.',
      },
    };

    const primary = recommendations[service] ?? recommendations['unsure'];
    const support = new Set<string>();

    if (need === 'visuals') support.add('Photography, film and drone planning');
    if (need === 'performance') support.add('Website and campaign performance review');
    if (need === 'automation') support.add('AI secretary and booking-flow discovery');
    if (need === 'digital') support.add('Website or guest application roadmap');
    if (pace === 'refresh') support.add('Coordinated content and launch direction');
    if (pace === 'journey') support.add('Guest journey and automation mapping');

    return { ...primary, support: [...support] };
  }

  choose(option: FinderOption): void {
    this.selections[this.stepIndex] = option;
    this.stepIndex = Math.min(this.stepIndex + 1, this.steps.length);
  }

  back(): void {
    this.stepIndex = Math.max(this.stepIndex - 1, 0);
  }

  restart(): void {
    this.selections = {};
    this.stepIndex = 0;
  }
}

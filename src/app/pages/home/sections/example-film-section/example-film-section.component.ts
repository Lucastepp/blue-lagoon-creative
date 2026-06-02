import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';

@Component({
  selector: 'app-example-film-section',
  imports: [RevealDirective],
  template: `
    <section class="example-film" id="example-film" aria-labelledby="example-film-title" appReveal>
      <div class="section-heading">
        <div>
          <p class="eyebrow">Featured film</p>
          <h2 id="example-film-title">The atmosphere a destination film can carry.</h2>
        </div>
        <p>
          Press play &mdash; the kind of cinematic cut we build for a property&rsquo;s first screen,
          its reels and its campaigns.
        </p>
      </div>

      <div class="youtube-frame">
        <iframe
          src="https://www.youtube-nocookie.com/embed/s0XP2KaPCl0?rel=0"
          title="Destination film on YouTube"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <p class="example-film-note">
        <span>Featured</span>
        Press play for sound &mdash; fullscreen for the full effect.
        <a href="https://www.youtube.com/watch?v=s0XP2KaPCl0" target="_blank" rel="noreferrer">
          Open on YouTube &#8599;
        </a>
      </p>
    </section>
  `,
})
export class ExampleFilmSectionComponent {}

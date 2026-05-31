import { Component } from '@angular/core';
import { WordRotatorComponent } from '../../../../shared/word-rotator.component';
import { AutoVideoDirective } from '../../../../shared/auto-video.directive';
import { heroWords } from '../../../../data/blue-lagoon.content';

@Component({
  selector: 'app-hero-section',
  imports: [WordRotatorComponent, AutoVideoDirective],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  protected readonly heroWords = heroWords;
}

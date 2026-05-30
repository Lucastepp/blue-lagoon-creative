import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';

@Component({
  selector: 'app-intro-section',
  imports: [RevealDirective],
  templateUrl: './intro-section.component.html',
})
export class IntroSectionComponent {}
